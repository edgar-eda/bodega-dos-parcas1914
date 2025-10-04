import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import Modal from '../Modal';
import BannerForm from './BannerForm';
import { PlusIcon, EditIcon, TrashIcon } from '../icons';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Banner {
  id: string;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
}

const BannerList: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);

    const fetchBanners = useCallback(async () => {
        const { data, error } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error("Error fetching banners:", error);
        } else {
            setBanners(data as Banner[]);
        }
    }, []);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    const handleOpenModalForAdd = () => {
        setEditingBanner(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (banner: Banner) => {
        setEditingBanner(banner);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBanner(null);
        fetchBanners();
    };
    
    const handleOpenConfirmModal = (banner: Banner) => {
        setBannerToDelete(banner);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setBannerToDelete(null);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (bannerToDelete) {
            const { error } = await supabase.from('banners').delete().eq('id', bannerToDelete.id);
            if (error) console.error("Error deleting banner:", error);
            handleCloseConfirmModal();
            fetchBanners();
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-accent-cream">Banners Promocionais</h2>
                <button 
                    onClick={handleOpenModalForAdd}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Banner
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-primary-dark">
                    <thead className="bg-primary">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Imagem</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Link</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Status</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {banners.map(banner => (
                            <tr key={banner.id} className="border-b border-green-700 hover:bg-primary">
                                <td className="py-3 px-4">
                                    <img src={banner.image_url} alt="Banner" className="w-32 h-auto object-cover rounded-md" />
                                </td>
                                <td className="py-3 px-4 font-medium text-accent-cream truncate max-w-xs">
                                    {banner.link_url || 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                    {banner.is_active ? (
                                        <span className="flex items-center gap-2 text-emerald-400"><CheckCircle size={16} /> Ativo</span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-gray-500"><XCircle size={16} /> Inativo</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleOpenModalForEdit(banner)} className="text-blue-400 hover:text-blue-300 p-2"><EditIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleOpenConfirmModal(banner)} className="text-red-400 hover:text-red-300 p-2"><TrashIcon className="w-5 h-5" /></button>
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
                title={editingBanner ? "Editar Banner" : "Adicionar Novo Banner"}
            >
                <BannerForm bannerToEdit={editingBanner} onFormSubmit={handleCloseModal} />
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
                    <h3 className="text-lg leading-6 font-medium text-accent-cream mt-4">
                        Excluir Banner
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-400">
                            Tem certeza que deseja excluir este banner? Esta ação não pode ser desfeita.
                        </p>
                    </div>
                    <div className="items-center px-4 py-3 gap-4 flex justify-center">
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Excluir
                        </button>
                        <button
                            onClick={handleCloseConfirmModal}
                            className="px-4 py-2 bg-gray-600 text-gray-100 text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BannerList;