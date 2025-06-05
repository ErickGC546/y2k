
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, ShoppingCart, BarChart3, Settings } from 'lucide-react';
import ProductsManagement from './ProductsManagement';
import UsersManagement from './UsersManagement';
import OrdersManagement from './OrdersManagement';
import DashboardStats from './DashboardStats';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-estilo-dark">Panel de Administración</h1>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 size={18} />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package size={18} />
            Productos
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart size={18} />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={18} />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={18} />
            Configuración
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <DashboardStats />
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <ProductsManagement />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <OrdersManagement />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UsersManagement />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Configuración del Sistema</h3>
            <p className="text-gray-600">Funcionalidades de configuración en desarrollo...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
