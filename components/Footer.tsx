import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-accent-cream mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-extrabold mb-4 text-accent-red">Bodega dos Parças</h3>
            <p className="text-gray-400">Sua bebida gelada, rápida e no precinho.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
            <ul>
              <li className="mb-2"><Link to="/about" className="text-gray-400 hover:text-accent-red transition-colors">Sobre nós</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-gray-400 hover:text-accent-red transition-colors">Termos de Serviço</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-accent-red transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-gray-400 hover:text-accent-red transition-colors"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-accent-red transition-colors"><InstagramIcon className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-accent-red transition-colors"><TwitterIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bodega dos Parças. Desenvolvido por Edgar Tavares.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;