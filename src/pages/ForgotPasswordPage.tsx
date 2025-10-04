import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/src/integrations/supabase/client';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/update-password`,
    });

    setLoading(false);
    if (error) {
      setError('Não foi possível enviar o email de redefinição. Verifique o email e tente novamente.');
    } else {
      setMessage('Se uma conta com este email existir, um link para redefinir sua senha foi enviado.');
    }
  };

  return (
    <div className="min-h-full bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-primary-dark rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent-cream mb-2">
            Esqueceu sua senha?
          </h2>
          <p className="text-gray-400 mb-8">
            Sem problemas. Digite seu email e enviaremos um link para você criar uma nova.
          </p>
        </div>
        
        {message ? (
          <div className="text-center p-4 bg-emerald-900 text-emerald-200 rounded-md">
            <p>{message}</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="text-sm font-medium text-gray-300 mb-1 block">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-primary-dark appearance-none relative block w-full px-4 py-3 border border-green-700 placeholder-gray-500 text-accent-cream rounded-md focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-accent-red sm:text-sm"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-md text-accent-cream bg-accent-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-accent-red transition-colors duration-300 disabled:bg-gray-600"
              >
                {loading ? 'Enviando...' : 'Enviar Link de Redefinição'}
              </button>
            </div>
          </form>
        )}
        
        <div className="text-sm text-center mt-8">
          <p className="text-gray-400">
            Lembrou a senha?{' '}
            <Link to="/login" className="font-medium text-accent-red hover:underline">
              Voltar para o Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;