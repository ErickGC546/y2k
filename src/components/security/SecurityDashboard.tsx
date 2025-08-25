import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import ImageValidator from './ImageValidator';

const SecurityDashboard: React.FC = () => {
  const securityChecks = [
    {
      title: 'Autenticación Segura',
      status: 'Configurado',
      icon: <Lock className="h-5 w-5" />,
      variant: 'default' as const,
      description: 'Rate limiting y validación implementados'
    },
    {
      title: 'RLS Activado',
      status: 'Activo',
      icon: <Shield className="h-5 w-5" />,
      variant: 'default' as const,
      description: 'Todas las tablas tienen políticas RLS'
    },
    {
      title: 'Validación de URLs',
      status: 'Implementado',
      icon: <Eye className="h-5 w-5" />,
      variant: 'default' as const,
      description: 'Validación de imágenes y sanitización'
    },
    {
      title: 'Funciones de Base de Datos',
      status: 'Seguras',
      icon: <Shield className="h-5 w-5" />,
      variant: 'default' as const,
      description: 'SECURITY DEFINER con search_path fijo'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold">Panel de Seguridad</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityChecks.map((check, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center space-x-2">
                  {check.icon}
                  <span>{check.title}</span>
                </CardTitle>
                <Badge variant="default" className="bg-green-100 text-green-800">{check.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{check.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Herramientas de Validación</h3>
        <ImageValidator />
      </div>

      {/* Security recommendations */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Recomendaciones Adicionales</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Habilitar protección contra contraseñas filtradas en Supabase Auth</li>
            <li>• Configurar URL de sitio y redirección en Supabase Auth</li>
            <li>• Revisar periódicamente los logs de autenticación</li>
            <li>• Implementar monitoreo de intentos de login fallidos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;