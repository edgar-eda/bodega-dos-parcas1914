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

  const StatCard = ({ icon, title, value, colorClass, iconColorClass }: { icon: React.ReactNode, title: string, value: string | number, colorClass: string, iconColorClass: string }) => (
    <div className="bg-primary p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {React.cloneElement(icon as React.ReactElement, { className: iconColorClass })}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-accent-cream">{value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-accent-cream mb-6">Dashboard de Estoque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Package size={24} />}
          title="Total de Produtos"
          value={totalProducts}
          colorClass="bg-blue-900/50"
          iconColorClass="text-blue-300"
        />
        <StatCard 
          icon={<DollarSign size={24} />}
          title="Valor Total em Estoque"
          value={formatCurrency(totalStockValue)}
          colorClass="bg-emerald-900/50"
          iconColorClass="text-emerald-300"
        />
        <StatCard 
          icon={<PackageX size={24} />}
          title="Produtos Fora de Estoque"
          value={outOfStock}
          colorClass="bg-red-900/50"
          iconColorClass="text-red-300"
        />
        <StatCard 
          icon={<PackageCheck size={24} />}
          title="Produtos com Estoque Baixo"
          value={lowStock}
          colorClass="bg-yellow-900/50"
          iconColorClass="text-yellow-300"
        />
      </div>
    </div>
  );
};

export default Dashboard;