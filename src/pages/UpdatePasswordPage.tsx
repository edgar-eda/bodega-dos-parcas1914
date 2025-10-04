import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/src/integrations/supabase/client';

const UpdatePasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // The user is in the password recovery flow
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) {
      setError('Não foi possível atualizar a senha. O link pode ter expirado. Tente novamente.');
    } else {
      setMessage('Senha atualizada com sucesso! Você será redirecionado para o login.');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  const inputClasses = "bg-primary appearance-none relative block w-full px-4 py-3 border border-green-700 placeholder-gray-500 text-accent-cream rounded-lg focus:bg-primary-dark focus:border-accent-red focus:ring-0 focus:outline-none sm:text-sm transition-colors duration-200 ease-in-out";

  return (
    <div className="min-h-full bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-primary-dark rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent-cream mb-2">
            Crie uma nova senha
          </h2>
          <p className="text-gray-400 mb-8">
            Digite sua nova senha abaixo.
          </p>
        </div>
        
        {message ? (
          <div className="text-center p-4 bg-emerald-900 text-emerald-200 rounded-md">
            <p>{message}</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password"className="text-sm font-medium text-gray-300 mb-1 block">Nova Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={inputClasses}
                placeholder="Sua nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password"className="text-sm font-medium text-gray-300 mb-1 block">Confirme a Nova Senha</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className={inputClasses}
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-md text-accent-cream bg-accent-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-accent-red transition-colors duration-300 disabled:bg-gray-600"
              >
                {loading ? 'Salvando...' : 'Salvar Nova Senha'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordPage;