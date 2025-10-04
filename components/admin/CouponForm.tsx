import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { Coupon } from '@/types';

interface CouponFormProps {
  couponToEdit: Coupon | null;
  onFormSubmit: () => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ couponToEdit, onFormSubmit }) => {
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (couponToEdit) {
      setCode(couponToEdit.code);
      setDiscountValue(couponToEdit.discount_value.toString());
      setExpiresAt(couponToEdit.expires_at ? couponToEdit.expires_at.split('T')[0] : '');
      setIsActive(couponToEdit.is_active);
    } else {
      setCode('');
      setDiscountValue('');
      setExpiresAt('');
      setIsActive(true);
    }
  }, [couponToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const couponData = {
      code: code.toUpperCase(),
      discount_type: 'percentage',
      discount_value: parseFloat(discountValue),
      expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
      is_active: isActive,
    };

    if (couponToEdit) {
      const { error } = await supabase.from('coupons').update(couponData).eq('id', couponToEdit.id);
      if (error) console.error("Error updating coupon:", error);
    } else {
      const { error } = await supabase.from('coupons').insert([couponData]);
      if (error) console.error("Error adding coupon:", error);
    }
    onFormSubmit();
  };

  const inputClasses = "bg-primary-dark p-2 border border-green-700 rounded-md w-full focus:ring-2 focus:ring-accent-red focus:outline-none placeholder-gray-400 text-accent-cream";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Código do Cupom (ex: BODEGA10)" value={code} onChange={(e) => setCode(e.target.value)} required className={inputClasses} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" placeholder="Desconto (%)" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required className={inputClasses} step="0.01" min="0" />
        <input type="date" placeholder="Data de Expiração" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputClasses} />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-accent-red focus:ring-accent-red bg-primary" />
        <label htmlFor="is_active" className="text-sm text-gray-300">Ativar este cupom?</label>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onFormSubmit} className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700">Salvar Cupom</button>
      </div>
    </form>
  );
};

export default CouponForm;