import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface ImageValidationResult {
  valid: boolean;
  sanitized_url?: string;
  error?: string;
}

export const useImageValidation = () => {
  const [isValidating, setIsValidating] = useState(false);

  const validateImageUrl = async (url: string): Promise<ImageValidationResult> => {
    if (!url) {
      return { valid: false, error: 'URL is required' };
    }

    setIsValidating(true);

    try {
      const { data, error } = await supabase.functions.invoke('validate-image', {
        body: { url }
      });

      if (error) {
        return { valid: false, error: error.message };
      }

      return data;
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Validation failed' 
      };
    } finally {
      setIsValidating(false);
    }
  };

  return { validateImageUrl, isValidating };
};