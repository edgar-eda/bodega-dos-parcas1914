import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Package, PackageCheck, PackageX, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { products } = useProducts();

  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const StatCard = ({ icon, title, value, colorClass }: { icon: React.ReactNode, title: string, value: string | number, colorClass: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Dashboard de Estoque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Package size={24} className="text-blue-800" />}
          title="Total de Produtos"
          value={totalProducts}
          colorClass="bg-blue-100"
        />
        <StatCard 
          icon={<DollarSign size={24} className="text-green-800" />}
          title="Valor Total em Estoque"
          value={formatCurrency(totalStockValue)}
          colorClass="bg-green-100"
        />
        <StatCard 
          icon={<PackageX size={24} className="text-red-800" />}
          title="Produtos Fora de Estoque"
          value={outOfStock}
          colorClass="bg-red-100"
        />
        <StatCard 
          icon={<PackageCheck size={24} className="text-yellow-800" />}
          title="Produtos com Estoque Baixo"
          value={lowStock}
          colorClass="bg-yellow-100"
        />
      </div>
    </div>
  );
};

export default Dashboard;