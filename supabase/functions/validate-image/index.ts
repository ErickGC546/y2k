import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Server-side image URL validation for enhanced security
 */
const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    
    // Allow only HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Block potentially dangerous domains
    const dangerousDomains = ['localhost', '127.0.0.1', '0.0.0.0', '10.', '192.168.', '172.'];
    if (dangerousDomains.some(domain => urlObj.hostname.includes(domain))) {
      return false;
    }
    
    // Check for common image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasValidExtension = imageExtensions.some(ext => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    );
    
    return hasValidExtension;
  } catch {
    return false;
  }
};

const sanitizeImageUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Remove potentially dangerous query parameters
    const dangerousParams = ['script', 'eval', 'javascript', 'data', 'onload', 'onerror'];
    
    dangerousParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    return urlObj.toString();
  } catch {
    return '';
  }
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    });
  }

  try {
    const { url } = await req.json();
    
    if (!url || typeof url !== 'string') {
      return new Response(
        JSON.stringify({ valid: false, error: 'URL is required' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const isValid = isValidImageUrl(url);
    const sanitizedUrl = sanitizeImageUrl(url);

    return new Response(
      JSON.stringify({ 
        valid: isValid, 
        sanitized_url: sanitizedUrl,
        original_url: url
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid request' }),
      { 
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
});