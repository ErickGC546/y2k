
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Intentamos iniciar sesión con email/password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      // Si hay un error específico de email no confirmado
      if (signInError && signInError.message.includes('Email not confirmed')) {
        // Enviamos un nuevo email de confirmación
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: values.email,
        });

        if (resendError) {
          toast({
            title: "Error al reenviar el correo de confirmación",
            description: resendError.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Correo de confirmación enviado",
            description: "Por favor revisa tu correo para confirmar tu cuenta",
          });
        }
        
        // Intentamos iniciar sesión de todos modos (esto funcionará si se desactiva la verificación de correo)
        const { error: forceSignInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (!forceSignInError) {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido a Y2K Store",
          });
          navigate('/');
          return;
        }
      } else if (signInError) {
        // Otros errores de inicio de sesión
        toast({
          title: "Error al iniciar sesión",
          description: signInError.message,
          variant: "destructive",
        });
      } else {
        // Inicio de sesión exitoso
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a Y2K Store",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="nombre@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded text-estilo-gold focus:ring-estilo-gold" />
            <label htmlFor="remember">Recuérdame</label>
          </div>
          <a href="/recuperar-password" className="text-estilo-gold hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-estilo-gold hover:bg-opacity-90 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
