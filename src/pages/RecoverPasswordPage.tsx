
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

const formSchema = z.object({
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
});

type FormValues = z.infer<typeof formSchema>;

const RecoverPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log('Password recovery requested:', values);
    // Simulación de envío de correo de recuperación
    toast({
      title: "Correo enviado",
      description: "Se ha enviado un enlace de recuperación a tu correo electrónico",
    });
    setTimeout(() => navigate('/iniciar-sesion'), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-estilo-dark font-montserrat">Recuperar contraseña</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <p className="text-gray-600 mb-4">
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-estilo-gold hover:bg-opacity-90 text-white font-medium"
                >
                  Enviar instrucciones
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <Link to="/iniciar-sesion" className="text-estilo-gold hover:underline">
                Volver a iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecoverPasswordPage;
