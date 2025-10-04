import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { Upload } from 'lucide-react';

const STATIC_BANNER_BG_KEY = 'static_banner_bg_url';

const Customization: React.FC = () => {
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBgImage = async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', STATIC_BANNER_BG_KEY)
        .single();
      
      if (data && data.value) {
        setBgImageUrl(data.value);
        setImagePreview(data.value);
      }
    };
    fetchBgImage();
  }, []);

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
    const fileName = `static-banner-bg-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('app_assets') // Usando um novo bucket para assets gerais
        .upload(filePath, file, { upsert: true });

    setIsUploading(false);
    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
    }

    const { data } = supabase.storage
        .from('app_assets')
        .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!imageFile) {
      setMessage('Por favor, selecione uma imagem.');
      return;
    }

    const newImageUrl = await uploadImage(imageFile);
    if (!newImageUrl) {
      setMessage('Falha no upload da imagem. Tente novamente.');
      return;
    }

    const { error } = await supabase
      .from('app_settings')
      .upsert({ key: STATIC_BANNER_BG_KEY, value: newImageUrl });

    if (error) {
      setMessage('Erro ao salvar a configuração.');
      console.error(error);
    } else {
      setMessage('Imagem de fundo atualizada com sucesso!');
      setBgImageUrl(newImageUrl);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-accent-cream mb-4">Customização da Página Inicial</h2>
      <div className="bg-primary p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-accent-cream mb-4">Banner Estático Principal</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagem de Fundo (Recomendado: 1200x400px)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="mx-auto h-40 w-auto object-contain rounded-md" />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-400 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-primary rounded-md font-medium text-accent-green hover:text-accent-green focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent-green">
                    <span>Selecione um arquivo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-accent-action text-primary font-bold py-2 px-4 rounded-md hover:brightness-110 transition-all" disabled={isUploading}>
              {isUploading ? 'Enviando...' : 'Salvar Alterações'}
            </button>
          </div>
          {message && <p className="text-sm text-center text-accent-green mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Customization;