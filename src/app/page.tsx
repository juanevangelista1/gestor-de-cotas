'use client';

import { useState, useMemo } from 'react';
import { User } from '@/lib/types';
import { useUsers } from '@/lib/hooks/useUsers';

import { UserList } from './components/UserList';
import { UserNumbersModal } from './components/UserNumbersModal';
import { AddUserModal } from './components/AddUserModal';

export default function HomePage() {
	const { users, addUser, updateUser, isNameTaken, isNumberTaken, isInitialized } = useUsers();

	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [searchByName, setSearchByName] = useState('');
	const [searchByNumber, setSearchByNumber] = useState('');

	const filteredUsers = useMemo(() => {
		let result = users;
		if (searchByName) {
			result = result.filter((user) => user.name.toLowerCase().includes(searchByName.toLowerCase()));
		}
		if (searchByNumber) {
			const searchNum = parseInt(searchByNumber, 10);
			if (!isNaN(searchNum)) {
				result = result.filter((user) => user.chosenNumbers.includes(searchNum));
			}
		}
		return result;
	}, [users, searchByName, searchByNumber]);

	const handleSaveUser = (userData: Omit<User, 'id'> | User) => {
		if ('id' in userData) {
			updateUser(userData);
		} else {
			addUser(userData);
		}
	};

	const handleOpenEditModal = (user: User) => {
		setEditingUser(user);
		setIsAddModalOpen(true);
	};

	const handleOpenAddModal = () => {
		setEditingUser(null);
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
		setEditingUser(null);
	};

	if (!isInitialized) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<p className='text-lg animate-pulse'>Carregando dados da rifa...</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-grow container mx-auto p-4 md:p-8'>
				<header className='text-center mb-10'>
					<h1 className='text-5xl font-extrabold tracking-tight'>Rifa Yasmin</h1>
					<p className='text-lg text-gray-500 mt-2'>Gestor de Cotas e Participantes</p>
				</header>

				<div className='mb-6 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
						<input
							type='text'
							placeholder='Pesquisar por nome...'
							value={searchByName}
							onChange={(e) => setSearchByName(e.target.value)}
							className='p-2 border border-gray-300 rounded-md bg-transparent'
						/>
						<input
							type='number'
							placeholder='Pesquisar por número...'
							value={searchByNumber}
							onChange={(e) => setSearchByNumber(e.target.value)}
							className='p-2 border border-gray-300 rounded-md bg-transparent'
						/>
						<button
							onClick={handleOpenAddModal}
							className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer'>
							Adicionar Pessoa
						</button>
					</div>
				</div>

				<UserList
					users={filteredUsers}
					onSelectUser={setSelectedUser}
					onEditUser={handleOpenEditModal}
				/>
			</main>

			<footer className='text-center p-4 text-gray-500 border-t dark:border-gray-800'>
				Feito com ❤️ por Juan Evangelista
			</footer>

			<UserNumbersModal
				user={selectedUser}
				onClose={() => setSelectedUser(null)}
			/>
			<AddUserModal
				isOpen={isAddModalOpen}
				onClose={handleCloseAddModal}
				onSave={handleSaveUser}
				userToEdit={editingUser}
				isNameTaken={isNameTaken}
				isNumberTaken={isNumberTaken}
			/>
		</div>
	);
}
