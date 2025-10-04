import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';

interface Banner {
  id?: string;
  image_url: string;
  link_url?: string | null;
  is_active: boolean;
}

interface BannerFormProps {
  bannerToEdit: Banner | null;
  onFormSubmit: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ bannerToEdit, onFormSubmit }) => {
  const [bannerData, setBannerData] = useState({
    link_url: '',
    is_active: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (bannerToEdit) {
      setBannerData({
        link_url: bannerToEdit.link_url || '',
        is_active: bannerToEdit.is_active,
      });
      setImagePreview(bannerToEdit.image_url);
      setImageFile(null);
    } else {
      setBannerData({ link_url: '', is_active: false });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [bannerToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBannerData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('banner_images')
        .upload(filePath, file);

    setIsUploading(false);
    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
    }

    const { data } = supabase.storage
        .from('banner_images')
        .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = bannerToEdit?.image_url || '';

    if (imageFile) {
        const newImageUrl = await uploadImage(imageFile);
        if (newImageUrl) {
            imageUrl = newImageUrl;
        } else {
            alert("Falha no upload da imagem. Tente novamente.");
            return;
        }
    }

    if (!imageUrl) {
        alert("A imagem do banner é obrigatória.");
        return;
    }

    const dataToSave = {
        ...bannerData,
        image_url: imageUrl,
    };

    if (bannerToEdit) {
        // Update
        const { error } = await supabase.from('banners').update(dataToSave).eq('id', bannerToEdit.id);
        if (error) console.error("Error updating banner:", error);
    } else {
        // Insert
        const { error } = await supabase.from('banners').insert([dataToSave]);
        if (error) console.error("Error adding banner:", error);
    }
    onFormSubmit();
  };

  const inputClasses = "bg-primary p-2 border border-green-700 rounded-lg w-full focus:bg-primary-dark focus:border-accent-red focus:ring-0 focus:outline-none placeholder-gray-500 text-accent-cream transition-colors duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Imagem do Banner (Recomendado: 1200x400px)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-red/10 file:text-accent-red hover:file:bg-accent-red/20"/>
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-full h-auto object-cover rounded-md" />}
      </div>
      <input type="text" name="link_url" placeholder="URL de destino (Opcional)" value={bannerData.link_url} onChange={handleChange} className={inputClasses} />
      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_active" name="is_active" checked={bannerData.is_active} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-accent-red focus:ring-accent-red bg-primary" />
        <label htmlFor="is_active" className="text-sm text-gray-300">Ativar este banner? (Apenas um pode estar ativo por vez)</label>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onFormSubmit} className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700" disabled={isUploading}>
          {isUploading ? 'Enviando...' : 'Salvar Banner'}
        </button>
      </div>
    </form>
  );
};

export default BannerForm;