import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';

const ClientList: React.FC = () => {
    const { users, user: currentUser, updateUserRole } = useAuth();
    
    // Filter to show only users with 'client' role and other admins, but not the current admin
    const clients = users.filter(u => u.role === 'client');
    const otherAdmins = users.filter(u => u.role === 'admin' && u.id !== currentUser?.id);
    const displayUsers = [...otherAdmins, ...clients];


    const handleRoleChange = (userToUpdate: User) => {
        const newRole = userToUpdate.role === 'client' ? 'admin' : 'client';
        const actionText = newRole === 'admin' ? 'promover' : 'rebaixar';

        if (window.confirm(`Tem certeza que deseja ${actionText} o usuário ${userToUpdate.name}?`)) {
            updateUserRole(userToUpdate.id, newRole);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Clientes e Administradores</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Endereço</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Papel</th>
                             <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {displayUsers.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 text-sm">
                                    {user.address ? `${user.address.rua}, ${user.address.numero}` : 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                      {user.role === 'admin' ? 'Admin' : 'Cliente'}
                                    </span>
                                </td>
                                 <td className="py-3 px-4">
                                    <button 
                                        onClick={() => handleRoleChange(user)}
                                        className={`text-sm font-medium py-1 px-3 rounded-md transition-colors ${
                                            user.role === 'client' 
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                        }`}
                                    >
                                        {user.role === 'client' ? 'Tornar Admin' : 'Tornar Cliente'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {displayUsers.length === 0 && <p className="text-center p-4">Nenhum outro usuário encontrado.</p>}
            </div>
        </div>
    );
};

export default ClientList;