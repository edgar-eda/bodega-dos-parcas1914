import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error: loginError } = await login(email, password);
      if (loginError) {
        setError(loginError.message === 'Invalid login credentials' ? 'Email ou senha inválidos.' : 'Ocorreu um erro. Tente novamente.');
      }
      // A navegação é tratada pelo listener no App.tsx
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <div className="min-h-full bg-primary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto bg-primary-dark rounded-2xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
        
        {/* Lado Esquerdo - Branding */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-primary text-center">
          <img src="/logo.png" alt="Bodega dos Parças Logo" className="h-24 w-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-accent-red tracking-tight mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-300">
            Sua bebida gelada, rápida e no precinho está a apenas um login de distância.
          </p>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="p-8 md:p-12">
          <div className="flex justify-center md:hidden mb-6">
             <img src="/logo.png" alt="Bodega dos Parças Logo" className="h-20 w-auto" />
          </div>
          <h2 className="text-center text-3xl font-bold text-accent-cream mb-2">
            Acesse sua conta
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Faça login para continuar comprando.
          </p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="text-sm font-medium text-gray-300 mb-1 block">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-primary appearance-none relative block w-full px-4 py-3 border border-green-700 placeholder-gray-500 text-accent-cream rounded-md focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-accent-red sm:text-sm"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password"className="text-sm font-medium text-gray-300 mb-1 block">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-primary appearance-none relative block w-full px-4 py-3 border border-green-700 placeholder-gray-500 text-accent-cream rounded-md focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-accent-red sm:text-sm"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-accent-red hover:underline">
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-md text-accent-cream bg-accent-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-accent-red transition-colors duration-300"
              >
                Entrar
              </button>
            </div>
          </form>
          
          <div className="text-sm text-center mt-8">
            <p className="text-gray-400">
              Não tem uma conta?{' '}
              <Link to="/register" className="font-medium text-accent-red hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;