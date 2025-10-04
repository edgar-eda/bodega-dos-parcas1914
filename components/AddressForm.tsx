import React, { useState, useEffect } from 'react';
import { Address } from '../types';

interface AddressFormProps {
  initialAddress?: Address | null;
  onSubmit: (address: Address) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialAddress, onSubmit, onCancel }) => {
  const [address, setAddress] = useState<Address>({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    referencia: '',
  });

  useEffect(() => {
    if (initialAddress) {
      setAddress({
        cep: initialAddress.cep || '',
        rua: initialAddress.rua || '',
        numero: initialAddress.numero || '',
        complemento: initialAddress.complemento || '',
        bairro: initialAddress.bairro || '',
        referencia: initialAddress.referencia || '',
      });
    }
  }, [initialAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address);
  };

  const inputClasses = "bg-primary p-3 border border-green-700 rounded-lg w-full focus:bg-primary-dark focus:border-accent-red focus:ring-0 focus:outline-none placeholder-gray-500 text-accent-cream transition-colors duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="CEP" name="cep" value={address.cep} onChange={handleChange} required className={inputClasses} />
      <input type="text" placeholder="Rua / Avenida" name="rua" value={address.rua} onChange={handleChange} required className={inputClasses} />
      <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Número" name="numero" value={address.numero} onChange={handleChange} required className={inputClasses} />
          <input type="text" placeholder="Bairro" name="bairro" value={address.bairro} onChange={handleChange} required className={inputClasses} />
      </div>
      <input type="text" placeholder="Complemento (Opcional)" name="complemento" value={address.complemento} onChange={handleChange} className={inputClasses} />
      <input type="text" placeholder="Ponto de Referência (Opcional)" name="referencia" value={address.referencia} onChange={handleChange} className={inputClasses} />
      
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700">Salvar Endereço</button>
      </div>
    </form>
  );
};

export default AddressForm;