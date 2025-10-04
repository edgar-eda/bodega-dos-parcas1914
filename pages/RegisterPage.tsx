import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Address } from '../types';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState<Address>({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    referencia: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password.length < 6) {
        setError("A senha precisa ter pelo menos 6 caracteres.");
        return;
    }
    try {
      const { error: registerError } = await register(name, email, password, address);
      if (registerError) {
        setError(registerError.message);
      } else {
        setMessage('Cadastro realizado com sucesso! Por favor, verifique seu email para confirmar sua conta.');
        setTimeout(() => navigate('/login'), 5000);
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar se cadastrar.');
    }
  };
  
  const inputClasses = "bg-primary p-3 border border-green-700 rounded-md w-full focus:ring-2 focus:ring-accent-red focus:outline-none placeholder-gray-400 text-accent-cream";

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-primary-dark p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-accent-cream">
            Crie sua conta
          </h2>
        </div>
        {message ? (
          <div className="text-center p-4 bg-emerald-900 text-emerald-200 rounded-md">
            <p>{message}</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <h3 className="text-lg font-medium text-accent-cream border-b border-green-700 pb-2">Dados Pessoais</h3>
              <input name="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                className={inputClasses}
                placeholder="Nome completo" />
              <input name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="Email" />
              <input name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="Senha (mínimo 6 caracteres)" />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium text-accent-cream border-b border-green-700 pb-2">Endereço de Entrega</h3>
              <input type="text" placeholder="CEP" name="cep" value={address.cep} onChange={handleAddressChange} required className={inputClasses} />
              <input type="text" placeholder="Rua / Avenida" name="rua" value={address.rua} onChange={handleAddressChange} required className={inputClasses} />
              <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Número" name="numero" value={address.numero} onChange={handleAddressChange} required className={inputClasses} />
                  <input type="text" placeholder="Bairro" name="bairro" value={address.bairro} onChange={handleAddressChange} required className={inputClasses} />
              </div>
              <input type="text" placeholder="Complemento (Opcional)" name="complemento" value={address.complemento} onChange={handleAddressChange} className={inputClasses} />
              <input type="text" placeholder="Ponto de Referência (Opcional)" name="referencia" value={address.referencia} onChange={handleAddressChange} className={inputClasses} />
            </div>


            {error && <p className="text-red-400 text-sm text-center pt-4">{error}</p>}

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-accent-cream bg-accent-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red">
                Cadastrar
              </button>
            </div>
          </form>
        )}
        <div className="text-sm text-center">
            <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="font-medium text-accent-red hover:text-red-700">
                Faça login
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;