import React, { useState, useMemo, useRef, useEffect } from 'react';
import Banner from '../components/Banner';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { products, searchTerm, setSearchTerm } = useProducts();
  const productsRef = useRef<HTMLDivElement>(null);

  // Limpa o termo de busca quando o usuário sai da página inicial
  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [setSearchTerm]);

  // Rola a tela para a lista de produtos quando uma busca é iniciada
  useEffect(() => {
    if (searchTerm && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchTerm]);

  const handleSeeOffersClick = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = useMemo<Product[]>(() => {
    let tempProducts = products;

    // 1. Filtra por categoria
    if (selectedCategory !== "Todos") {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // 2. Filtra pelo termo de busca
    if (searchTerm.trim() !== '') {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return tempProducts;
  }, [selectedCategory, products, searchTerm]);

  return (
    <div className="container mx-auto px-4">
      <Banner onSeeOffersClick={handleSeeOffersClick} />
      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <div ref={productsRef} className="py-8">
        {searchTerm ? (
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Buscando por "<span className="text-primary">{searchTerm}</span>"
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedCategory}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;