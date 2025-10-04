import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StaticBannerProps {
  onSeeOffersClick: () => void;
}

const StaticBanner: React.FC<StaticBannerProps> = ({ onSeeOffersClick }) => {
  return (
    <div
      className="relative bg-cover bg-center rounded-lg shadow-2xl overflow-hidden my-6 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex items-end p-6"
      style={{ backgroundImage: `url('https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6')` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg">Ofertas Especiais</h2>
        <p className="text-md md:text-lg text-gray-200 mt-2 mb-4 drop-shadow-md max-w-lg">
          Confira nossas promoções e combos exclusivos. Sua bebida gelada com o melhor preço!
        </p>
        <button
          onClick={onSeeOffersClick}
          className="bg-accent-red text-accent-cream font-bold py-2 px-5 rounded-full hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          Ver Ofertas <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StaticBanner;