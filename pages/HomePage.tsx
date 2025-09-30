import React, { useState, useMemo } from 'react';
import Banner from '../components/Banner';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { products } = useProducts();

  const filteredProducts = useMemo<Product[]>(() => {
    if (selectedCategory === "Todos") {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <div className="container mx-auto px-4">
      <Banner />
      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <div className="py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedCategory}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;