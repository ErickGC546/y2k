import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useImageValidation } from '@/hooks/useImageValidation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const ImageValidator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const { validateImageUrl, isValidating } = useImageValidation();

  const handleValidate = async () => {
    const validationResult = await validateImageUrl(url);
    setResult(validationResult);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Validador de Imágenes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Ingresa la URL de la imagen"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button 
            onClick={handleValidate} 
            disabled={!url || isValidating}
            className="w-full"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validando...
              </>
            ) : (
              'Validar Imagen'
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {result.valid ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Badge variant="default" className="bg-green-100 text-green-800">Válida</Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <Badge variant="destructive">Inválida</Badge>
                </>
              )}
            </div>
            
            {result.error && (
              <p className="text-sm text-red-600">{result.error}</p>
            )}
            
            {result.sanitized_url && result.sanitized_url !== result.original_url && (
              <div className="text-sm">
                <p className="font-medium">URL Sanitizada:</p>
                <p className="text-muted-foreground break-all">{result.sanitized_url}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageValidator;