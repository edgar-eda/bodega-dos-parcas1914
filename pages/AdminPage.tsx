import React, { useState } from 'react';
import ProductList from '../components/admin/ProductList';
import Dashboard from '../components/admin/Dashboard';
import ClientList from '../components/admin/ClientList';

type AdminTab = 'dashboard' | 'products' | 'clients';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const tabButtonClasses = (tabName: AdminTab) => 
    `px-4 py-2 text-sm font-semibold rounded-md transition-colors flex-shrink-0 ${
        activeTab === tabName 
        ? 'bg-accent-yellow text-primary' 
        : 'text-gray-300 hover:bg-primary-dark'
    }`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-accent-cream mb-6">Painel do Administrador</h1>
      
      <div className="mb-6 border-b border-green-700">
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto whitespace-nowrap pb-2">
          <button 
            className={tabButtonClasses('dashboard')}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={tabButtonClasses('products')}
            onClick={() => setActiveTab('products')}
          >
            Gerenciar Produtos
          </button>
          <button 
            className={tabButtonClasses('clients')}
            onClick={() => setActiveTab('clients')}
          >
            Gerenciar Clientes
          </button>
        </div>
      </div>

      <div className="bg-primary-dark p-4 sm:p-6 rounded-lg shadow-lg">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'clients' && <ClientList />}
      </div>
    </div>
  );
};

export default AdminPage;