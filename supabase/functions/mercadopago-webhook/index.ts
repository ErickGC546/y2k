import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { createHmac } from "https://deno.land/std@0.190.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the notification body
    const body = await req.json();
    console.log("Webhook received:", JSON.stringify(body));

    // Only process payment notifications
    if (body.type !== "payment" && body.action !== "payment.created" && body.action !== "payment.updated") {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      console.error("No payment ID in webhook body");
      return new Response("No payment ID", { status: 200 });
    }

    // Verify webhook signature if secret is configured
    const webhookSecret = Deno.env.get("MERCADOPAGO_WEBHOOK_SECRET");
    if (webhookSecret) {
      const xSignature = req.headers.get("x-signature");
      const xRequestId = req.headers.get("x-request-id");

      if (xSignature && xRequestId) {
        // MercadoPago v2 signature format: ts=...,v1=...
        const parts: Record<string, string> = {};
        xSignature.split(",").forEach((part) => {
          const [key, value] = part.trim().split("=");
          if (key && value) parts[key] = value;
        });

        const ts = parts["ts"];
        const v1 = parts["v1"];

        if (ts && v1) {
          const manifest = `id:${paymentId};request-id:${xRequestId};ts:${ts};`;
          const hmac = createHmac("sha256", webhookSecret);
          hmac.update(manifest);
          const generatedHash = hmac.digest("hex");

          if (generatedHash !== v1) {
            console.error("Invalid webhook signature");
            return new Response("Invalid signature", { status: 401 });
          }
        }
      }
    }

    // Fetch payment details from MercadoPago API
    const accessToken = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN");
    if (!accessToken) {
      console.error("MERCADOPAGO_ACCESS_TOKEN not configured");
      return new Response("Server configuration error", { status: 500 });
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      console.error("Failed to fetch payment:", paymentResponse.status);
      return new Response("Failed to fetch payment", { status: 500 });
    }

    const payment = await paymentResponse.json();
    console.log("Payment status:", payment.status, "ID:", payment.id);

    // Only process approved payments
    if (payment.status !== "approved") {
      return new Response(JSON.stringify({ received: true, status: payment.status }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role key to bypass RLS for order creation
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const userId = payment.external_reference;
    if (!userId) {
      console.error("No user ID in external_reference");
      return new Response("No user reference", { status: 200 });
    }

    // Idempotency: check if order already exists for this payment
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("status", "processing")
      .eq("user_id", userId)
      .eq("total", payment.transaction_amount)
      .limit(1)
      .maybeSingle();

    if (existingOrder) {
      console.log("Order already exists for this payment, skipping");
      return new Response(JSON.stringify({ received: true, duplicate: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse items from metadata
    let items: Array<{ id: string; quantity: number; price: number }> = [];
    try {
      if (payment.metadata?.items) {
        items = JSON.parse(payment.metadata.items);
      }
    } catch (e) {
      console.error("Failed to parse items metadata:", e);
      return new Response("Invalid metadata", { status: 200 });
    }

    if (items.length === 0) {
      console.error("No items in payment metadata");
      return new Response("No items", { status: 200 });
    }

    // Create order
    const shippingAddress = payment.shipments?.receiver_address?.street_name || null;
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total: payment.transaction_amount,
        status: "processing",
        shipping_address: shippingAddress,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Failed to create order:", orderError);
      return new Response("Failed to create order", { status: 500 });
    }

    console.log("Order created:", order.id);

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Failed to create order items:", itemsError);
    }

    // Decrement stock for each item
    for (const item of items) {
      try {
        await supabase.rpc("decrement_stock", {
          p_product_id: item.id,
          p_quantity: item.quantity,
        });
      } catch (stockError) {
        console.error(`Stock decrement failed for product ${item.id}:`, stockError);
      }
    }

    console.log("Webhook processed successfully for order:", order.id);

    return new Response(
      JSON.stringify({ received: true, order_id: order.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
