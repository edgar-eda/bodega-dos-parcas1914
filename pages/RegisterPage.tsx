
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
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 3) {
        setError("A senha precisa ter pelo menos 3 caracteres.");
        return;
    }
    try {
      const user = await register(name, email, password, address);
      if (user) {
        navigate('/');
      } else {
        setError('Este email já está em uso.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar se cadastrar.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Dados Pessoais</h3>
            <input name="name" type="text" required value={name} onChange={e => setName(e.target.value)}
              className="bg-white appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Nome completo" />
            <input name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="bg-white appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Email" />
            <input name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)}
              className="bg-white appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Senha" />
          </div>

          <div className="space-y-4 pt-4">
             <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Endereço de Entrega</h3>
             <input type="text" placeholder="CEP" name="cep" value={address.cep} onChange={handleAddressChange} required className="bg-white p-3 border rounded-md w-full focus:ring-2 focus:ring-primary focus:outline-none" />
             <input type="text" placeholder="Rua / Avenida" name="rua" value={address.rua} onChange={handleAddressChange} required className="bg-white p-3 border rounded-md w-full focus:ring-2 focus:ring-primary focus:outline-none" />
             <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Número" name="numero" value={address.numero} onChange={handleAddressChange} required className="bg-white p-3 border rounded-md w-full focus:ring-2 focus:ring-primary focus:outline-none" />
                <input type="text" placeholder="Bairro" name="bairro" value={address.bairro} onChange={handleAddressChange} required className="bg-white p-3 border rounded-md w-full focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
             <input type="text" placeholder="Complemento (Opcional)" name="complemento" value={address.complemento} onChange={handleAddressChange} className="bg-white p-3 border rounded-md w-full focus:ring-2 focus:ring-primary focus:outline-none" />
             <input type="text" placeholder="Ponto de Referência (Opcional)" name="referencia" value={address.referencia} onChange={handleAddressChange} className="bg-white p-3 border rounded-md w-full focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>


          {error && <p className="text-red-500 text-sm text-center pt-4">{error}</p>}

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Cadastrar
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
            <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Faça login
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;