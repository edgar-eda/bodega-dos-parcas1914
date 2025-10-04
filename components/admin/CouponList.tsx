import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import Modal from '../Modal';
import CouponForm from './CouponForm';
import { Coupon } from '@/types';
import { PlusIcon, EditIcon, TrashIcon } from '../icons';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

const CouponList: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

    const fetchCoupons = useCallback(async () => {
        const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error("Error fetching coupons:", error);
        } else {
            setCoupons(data as Coupon[]);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const handleOpenModalForAdd = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCoupon(null);
        fetchCoupons();
    };
    
    const handleOpenConfirmModal = (coupon: Coupon) => {
        setCouponToDelete(coupon);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setCouponToDelete(null);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (couponToDelete) {
            const { error } = await supabase.from('coupons').delete().eq('id', couponToDelete.id);
            if (error) console.error("Error deleting coupon:", error);
            handleCloseConfirmModal();
            fetchCoupons();
        }
    };

    const getStatus = (coupon: Coupon) => {
        const isExpired = coupon.expires_at && new Date(coupon.expires_at) < new Date();
        if (isExpired) {
            return <span className="flex items-center gap-2 text-yellow-400"><Clock size={16} /> Expirado</span>;
        }
        if (coupon.is_active) {
            return <span className="flex items-center gap-2 text-emerald-400"><CheckCircle size={16} /> Ativo</span>;
        }
        return <span className="flex items-center gap-2 text-gray-500"><XCircle size={16} /> Inativo</span>;
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-accent-cream">Cupons de Desconto</h2>
                <button 
                    onClick={handleOpenModalForAdd}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-accent-action text-primary font-bold py-2 px-4 rounded-md hover:brightness-110 transition-all"
                >
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Cupom
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-primary-dark">
                    <thead className="bg-primary">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Código</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Desconto</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Expira em</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Status</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {coupons.map(coupon => (
                            <tr key={coupon.id} className="border-b border-zinc-700 hover:bg-primary">
                                <td className="py-3 px-4 font-mono text-accent-action font-bold">{coupon.code}</td>
                                <td className="py-3 px-4">{coupon.discount_value}%</td>
                                <td className="py-3 px-4">{coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString('pt-BR') : 'Não expira'}</td>
                                <td className="py-3 px-4">{getStatus(coupon)}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleOpenModalForEdit(coupon)} className="text-blue-400 hover:text-blue-300 p-2"><EditIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleOpenConfirmModal(coupon)} className="text-red-400 hover:text-red-300 p-2"><TrashIcon className="w-5 h-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={editingCoupon ? "Editar Cupom" : "Adicionar Novo Cupom"}
            >
                <CouponForm couponToEdit={editingCoupon} onFormSubmit={handleCloseModal} />
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmModal}
                title="Confirmar Exclusão"
            >
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
                        <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-accent-cream mt-4">Excluir Cupom</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-400">Tem certeza que deseja excluir o cupom <strong>"{couponToDelete?.code}"</strong>? Esta ação não pode ser desfeita.</p>
                    </div>
                    <div className="items-center px-4 py-3 gap-4 flex justify-center">
                        <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700">Excluir</button>
                        <button onClick={handleCloseConfirmModal} className="px-4 py-2 bg-gray-600 text-gray-100 text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-500">Cancelar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CouponList;