import React from 'react';

interface BannerProps {
  onSeeOffersClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ onSeeOffersClick }) => {
  return (
    <div 
      className="relative text-white rounded-lg shadow-2xl overflow-hidden my-6 bg-cover bg-center" 
      // Imagem de bebidas geladas em um cooler, mais alinhada com a proposta da Bodega.
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1553531384-411a247ccd78?q=80&w=2070&auto=format&fit=crop)' }}
    >
      {/* Grey overlay with blur effect */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
      
      <div className="relative p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[250px] md:min-h-[300px]">
        <img 
          src="/logo.png" 
          alt="Bodega dos Parças" 
          className="h-20 md:h-24 w-auto mb-4 drop-shadow-lg"
        />
        <h2 className="text-2xl md:text-4xl font-extrabold mb-2 drop-shadow-md">
          Bebida gelada a preço baixo!
        </h2>
        <p className="text-base md:text-lg mb-6 max-w-2xl drop-shadow-sm">
          Peça agora e receba em minutos na porta da sua casa.
        </p>
        <button 
          onClick={onSeeOffersClick}
          className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
        >
          Ver Ofertas
        </button>
      </div>
    </div>
  );
};

export default Banner;