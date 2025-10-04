import React from 'react';
import { LOGO_URL } from '@/src/config'; // Usando a URL da logo do Supabase

interface StaticBannerProps {
  onSeeOffersClick: () => void;
}

const StaticBanner: React.FC<StaticBannerProps> = ({ onSeeOffersClick }) => {
  return (
    <div className="bg-primary-dark rounded-lg shadow-2xl my-6 p-8 flex flex-col items-center text-center">
      <img src={LOGO_URL} alt="Bodega dos Parças Logo" className="h-20 w-auto mb-4" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-accent-cream drop-shadow-lg">
        Bebida gelada a preço baixo!
      </h2>
      <p className="text-md md:text-lg text-gray-300 mt-2 mb-6 drop-shadow-md max-w-lg">
        Peça agora e receba em minutos na porta da sua casa.
      </p>
      <button
        onClick={onSeeOffersClick}
        className="bg-primary hover:bg-primary-dark text-accent-cream font-bold py-3 px-8 rounded-full transition-colors"
      >
        Ver Ofertas
      </button>
    </div>
  );
};

export default StaticBanner;