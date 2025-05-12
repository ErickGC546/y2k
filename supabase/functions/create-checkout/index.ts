
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { items, success_url, cancel_url, shipping_address } = requestData;
    
    if (!items || !items.length || !success_url || !cancel_url) {
      console.error("Invalid request data:", JSON.stringify(requestData));
      throw new Error("Datos de solicitud inválidos");
    }
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabaseClient.auth.getUser(token);
    
    if (error || !data.user) {
      console.error("Authentication error:", error);
      throw new Error("Usuario no autenticado");
    }
    
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("El correo del usuario no está disponible");
    }

    // If shipping address was provided, save it to the user's addresses
    if (shipping_address && shipping_address.trim() !== "") {
      console.log("Saving shipping address:", shipping_address);
      
      // Check if the address already exists to avoid duplicates
      const { data: existingAddresses } = await supabaseClient
        .from('addresses')
        .select('id')
        .eq('user_id', user.id)
        .eq('address', shipping_address)
        .maybeSingle();
      
      if (!existingAddresses) {
        const { error: addressError } = await supabaseClient
          .from('addresses')
          .insert([{ address: shipping_address, user_id: user.id }]);
          
        if (addressError) {
          console.error("Error saving address:", addressError);
          // Continue with payment process even if address save fails
        } else {
          console.log("Address saved successfully");
        }
      } else {
        console.log("Address already exists, skipping save");
      }
    }

    // Initialize MercadoPago
    const mercadoPagoKey = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN");
    if (!mercadoPagoKey) {
      console.error("Missing MercadoPago access token");
      throw new Error("Error de configuración: falta token de MercadoPago");
    }
    
    console.log("Creating MercadoPago checkout for user:", user.email);

    // Format items for MercadoPago
    const mercadoPagoItems = items.map((item: any) => ({
      id: String(item.id),
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "PEN", // Soles peruanos
      picture_url: item.image || undefined
    }));

    // Instead of using the SDK which has compatibility issues in Deno,
    // we'll create the preference using the MercadoPago API directly
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mercadoPagoKey}`
      },
      body: JSON.stringify({
        items: mercadoPagoItems,
        back_urls: {
          success: success_url,
          failure: cancel_url,
          pending: cancel_url
        },
        auto_return: "approved",
        payer: {
          email: user.email,
        },
        payment_methods: {
          excluded_payment_types: [],
          installments: 1
        },
        statement_descriptor: "Estilo Afro",
        external_reference: user.id,
        // Include shipping address in the payment info
        shipments: shipping_address ? {
          receiver_address: {
            street_name: shipping_address
          }
        } : undefined
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MercadoPago API error:", response.status, errorText);
      throw new Error(`Error de MercadoPago: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    console.log("MercadoPago preference created successfully:", result.id);

    return new Response(
      JSON.stringify({ url: result.init_point }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating MercadoPago checkout:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Error al crear la sesión de pago" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
