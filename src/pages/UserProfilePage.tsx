
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserAddresses from '../components/UserAddresses';
import AddAddressDialog from '../components/AddAddressDialog';
import ProfileCard from '../components/profile/ProfileCard';
import SecuritySettings from '../components/profile/SecuritySettings';
import OrdersSection from '../components/profile/OrdersSection';

const UserProfilePage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{ full_name: string | null, email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressOpen, setAddressOpen] = useState(false);
  const [refreshAddresses, setRefreshAddresses] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/iniciar-sesion');
        return;
      }
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', session.user.id)
        .single();

      if (error) {
        toast({
          title: "No se pudo cargar tu información",
          description: error.message,
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      setProfile(profiles);
      setLoading(false);
    };

    getProfile();
  }, [navigate, toast]);

  const handleProfileUpdate = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', session.user.id)
      .single();

    if (!error) {
      setProfile(profiles);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-lg text-estilo-gold">Cargando tu información...</span>
      </div>
    );
  }
  
  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-estilo-dark font-montserrat">Mi Cuenta</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile section */}
              <ProfileCard 
                profile={profile}
                loading={loading}
                onProfileUpdate={handleProfileUpdate}
              />
              
              {/* Orders section */}
              <OrdersSection />
              
              {/* Addresses section */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="mr-2 h-5 w-5 text-estilo-gold" />
                    Direcciones guardadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UserAddresses
                    onAddAddress={() => setAddressOpen(true)}
                    refreshFlag={refreshAddresses}
                  />
                  <AddAddressDialog
                    open={addressOpen}
                    onOpenChange={(open) => setAddressOpen(open)}
                    onAdded={() => setRefreshAddresses(flag => !flag)}
                  />
                </CardContent>
              </Card>

              {/* Security settings */}
              <div className="md:col-span-3">
                <SecuritySettings loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
