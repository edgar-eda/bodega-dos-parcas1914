import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { User } from '../../types';
import { UserX, UserCheck } from 'lucide-react';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*');

        if (error) {
            console.error("Error fetching clients:", error);
            setError("Não foi possível carregar a lista de clientes.");
            setClients([]);
        } else {
            // Mapeia os dados para o tipo User, tratando o email que vem da tabela auth.users
            const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
            if (usersError) {
                console.error("Error fetching users auth data:", usersError);
                setError("Não foi possível carregar os emails dos clientes.");
                setClients(data as User[]);
            } else {
                const usersMap = new Map(usersData.users.map(u => [u.id, u.email]));
                const combinedData = data.map(profile => ({
                    ...profile,
                    email: usersMap.get(profile.id) || 'Email não encontrado'
                }));
                setClients(combinedData as User[]);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const toggleBanStatus = async (client: User) => {
        const newBanStatus = !client.is_banned;
        const { error } = await supabase
            .from('profiles')
            .update({ is_banned: newBanStatus })
            .eq('id', client.id);

        if (error) {
            alert(`Erro ao ${newBanStatus ? 'banir' : 'desbanir'} o usuário.`);
            console.error("Error updating ban status:", error);
        } else {
            // Atualiza a lista local para refletir a mudança imediatamente
            setClients(clients.map(c => c.id === client.id ? { ...c, is_banned: newBanStatus } : c));
        }
    };

    if (loading) {
        return <p className="text-center text-gray-400">Carregando clientes...</p>;
    }

    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-accent-cream mb-4">Clientes Cadastrados</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-primary-dark">
                    <thead className="bg-primary">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Nome</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Status</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {clients.filter(c => c.role !== 'admin').map(client => (
                            <tr key={client.id} className="border-b border-green-700 hover:bg-primary">
                                <td className="py-3 px-4 font-medium text-accent-cream">{client.name}</td>
                                <td className="py-3 px-4">{client.email}</td>
                                <td className="py-3 px-4">
                                    {client.is_banned ? (
                                        <span className="px-2 py-1 text-xs font-semibold text-red-200 bg-red-800 rounded-full">Banido</span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-semibold text-emerald-200 bg-emerald-800 rounded-full">Ativo</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <button 
                                        onClick={() => toggleBanStatus(client)}
                                        className={`flex items-center gap-2 text-sm font-semibold py-1 px-3 rounded-md transition-colors ${
                                            client.is_banned 
                                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                                            : 'bg-red-600 hover:bg-red-500 text-white'
                                        }`}
                                    >
                                        {client.is_banned ? <UserCheck size={16} /> : <UserX size={16} />}
                                        {client.is_banned ? 'Desbanir' : 'Banir'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientList;