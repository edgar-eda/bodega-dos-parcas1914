import React, { useState, useMemo, useRef, useEffect } from 'react';
import Banner from '../components/Banner';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { Info } from 'lucide-react';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showOnlyOffers, setShowOnlyOffers] = useState(false);
  const [showNoOffersMessage, setShowNoOffersMessage] = useState(false);
  const { products, searchTerm, setSearchTerm } = useProducts();
  const productsRef = useRef<HTMLDivElement>(null);

  // Limpa o termo de busca quando o usuário sai da página inicial
  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [setSearchTerm]);

  // Desativa o filtro de ofertas se uma busca for iniciada
  useEffect(() => {
    if (searchTerm) {
      setShowOnlyOffers(false);
    }
  }, [searchTerm]);

  const handleSeeOffersClick = () => {
    const productsOnOffer = products.filter(p => p.promoPrice && p.promoPrice > 0);
    
    if (productsOnOffer.length === 0) {
      setShowNoOffersMessage(true);
      setTimeout(() => {
        setShowNoOffersMessage(false);
      }, 30000); // Esconde a mensagem após 30 segundos
      return;
    }

    setShowOnlyOffers(true);
    setSelectedCategory("Todos"); // Reseta a categoria para ver todas as ofertas
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setShowOnlyOffers(false); // Desativa o filtro de ofertas ao escolher uma categoria
    setSelectedCategory(category);
  };

  const filteredProducts = useMemo<Product[]>(() => {
    let tempProducts = products;

    // 1. Filtra por ofertas primeiro, se ativado
    if (showOnlyOffers) {
      tempProducts = tempProducts.filter(p => p.promoPrice && p.promoPrice > 0);
    } 
    // 2. Depois, filtra por categoria (se o filtro de ofertas não estiver ativo)
    else if (selectedCategory !== "Todos") {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // 3. Por último, filtra pelo termo de busca
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(lowercasedSearchTerm) ||
        product.description.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    return tempProducts;
  }, [selectedCategory, products, searchTerm, showOnlyOffers]);

  const pageTitle = () => {
    if (searchTerm) {
      return <>Buscando por "<span className="text-primary">{searchTerm}</span>"</>;
    }
    if (showOnlyOffers) {
      return "Ofertas Especiais";
    }
    return selectedCategory;
  };

  return (
    <div className="container mx-auto px-4">
      <Banner onSeeOffersClick={handleSeeOffersClick} />
      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      
      {showNoOffersMessage && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 my-4 rounded-md flex items-center gap-3 shadow-sm" role="alert">
          <Info className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-bold">Nenhuma oferta encontrada!</p>
            <p className="text-sm">Fique de olho, em breve teremos novas promoções para você.</p>
          </div>
        </div>
      )}

      <div ref={productsRef} className="py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {pageTitle()}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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