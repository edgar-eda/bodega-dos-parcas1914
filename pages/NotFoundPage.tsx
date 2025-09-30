
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Página não encontrada</h2>
      <p className="text-gray-600 mb-8">
        Oops! A página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors"
      >
        Voltar para o Início
      </Link>
    </div>
  );
};

export default NotFoundPage;
