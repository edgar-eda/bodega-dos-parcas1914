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
        setError('Email ou senha inválidos.');
      }
      // A navegação agora é tratada pelo listener no App.tsx
      // que redireciona com base no papel do usuário.
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-primary-dark p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-accent-cream">
            Acesse sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-primary appearance-none rounded-none relative block w-full px-3 py-2 border border-green-700 placeholder-gray-400 text-accent-cream rounded-t-md focus:outline-none focus:ring-accent-yellow focus:border-accent-yellow focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password"className="sr-only">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-primary appearance-none rounded-none relative block w-full px-3 py-2 border border-green-700 placeholder-gray-400 text-accent-cream rounded-b-md focus:outline-none focus:ring-accent-yellow focus:border-accent-yellow focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-primary bg-accent-yellow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow"
            >
              Entrar
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>
            Não tem uma conta?{' '}
            <Link to="/register" className="font-medium text-accent-yellow hover:text-yellow-500">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;