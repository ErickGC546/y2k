
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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
    const { items, success_url, cancel_url } = requestData;
    
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

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("Missing Stripe secret key");
      throw new Error("Error de configuración: falta clave de Stripe");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    console.log("Creating checkout session for user:", user.email);

    // Create Stripe checkout session configured for Peru
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "pen",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // el precio debe estar en centavos de soles
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: success_url,
      cancel_url: cancel_url,
      payment_method_types: ["card"], // Solo permitir tarjetas
      locale: "es-PE", // Idioma español Perú
      payment_method_options: {
        card: {
          // Restringir a tarjetas emitidas en Perú
          allowed_countries: ["PE"]
        }
      }
    });

    console.log("Checkout session created successfully:", session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Error al crear la sesión de pago" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
