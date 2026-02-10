
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Input validation helpers
function isValidUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { items, success_url, cancel_url, shipping_address } = requestData;
    
    // === Input Validation ===
    if (!items || !Array.isArray(items) || items.length === 0 || items.length > 50) {
      throw new Error("Datos de solicitud inválidos: items inválido");
    }
    if (!success_url || !cancel_url || typeof success_url !== 'string' || typeof cancel_url !== 'string') {
      throw new Error("Datos de solicitud inválidos: URLs requeridas");
    }
    if (!isValidUrl(success_url) || !isValidUrl(cancel_url)) {
      throw new Error("Datos de solicitud inválidos: formato de URL inválido");
    }

    // Validate each item
    for (const item of items) {
      if (!item.id || !isValidUUID(String(item.id))) {
        throw new Error("ID de producto inválido");
      }
      if (typeof item.name !== 'string' || item.name.length === 0 || item.name.length > 200) {
        throw new Error("Nombre de producto inválido");
      }
      if (typeof item.price !== 'number' || item.price <= 0 || item.price > 1000000) {
        throw new Error("Precio de producto inválido");
      }
      if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 100) {
        throw new Error("Cantidad de producto inválida");
      }
    }

    // Validate shipping address length
    if (shipping_address && (typeof shipping_address !== 'string' || shipping_address.length > 500)) {
      throw new Error("Dirección de envío inválida");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Usuario no autenticado");
    }
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabaseClient.auth.getUser(token);
    
    if (error || !data.user) {
      throw new Error("Usuario no autenticado");
    }
    
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("El correo del usuario no está disponible");
    }

    // === Validate prices against database to prevent price manipulation ===
    for (const item of items) {
      const { data: product, error: productError } = await supabaseClient
        .from('products')
        .select('price, is_active')
        .eq('id', item.id)
        .single();

      if (productError || !product) {
        throw new Error(`Producto no encontrado: ${item.name}`);
      }
      if (!product.is_active) {
        throw new Error(`Producto no disponible: ${item.name}`);
      }
      if (Number(product.price) !== Number(item.price)) {
        throw new Error(`Precio incorrecto para: ${item.name}`);
      }
    }

    if (shipping_address && shipping_address.trim() !== "") {
      const { data: existingAddresses } = await supabaseClient
        .from('addresses')
        .select('id')
        .eq('user_id', user.id)
        .eq('address', shipping_address)
        .maybeSingle();
      
      if (!existingAddresses) {
        await supabaseClient
          .from('addresses')
          .insert([{ address: shipping_address, user_id: user.id }]);
      }
    }

    const mercadoPagoKey = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN");
    if (!mercadoPagoKey) {
      throw new Error("Error de configuración del servidor");
    }

    const mercadoPagoItems = items.map((item: any) => ({
      id: String(item.id),
      title: String(item.name).substring(0, 200),
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "PEN",
      picture_url: item.image && isValidUrl(String(item.image)) ? item.image : undefined
    }));

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
        metadata: {
          items: JSON.stringify(items.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))),
          user_id: user.id
        },
        shipments: shipping_address ? {
          receiver_address: {
            street_name: shipping_address.substring(0, 500)
          }
        } : undefined
      })
    });

    if (!response.ok) {
      throw new Error("Error al crear la preferencia de pago");
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ url: result.init_point }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Error al crear la sesión de pago" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
