
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { MercadoPagoConfig, Preference } from "https://esm.sh/mercadopago@2.0.10";

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

    // Initialize MercadoPago
    const mercadoPagoKey = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN");
    if (!mercadoPagoKey) {
      console.error("Missing MercadoPago access token");
      throw new Error("Error de configuración: falta token de MercadoPago");
    }
    
    const client = new MercadoPagoConfig({ accessToken: mercadoPagoKey });
    const preference = new Preference(client);

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

    // Create MercadoPago preference
    const preferenceData = {
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
      external_reference: user.id
    };

    const result = await preference.create({ body: preferenceData });

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
