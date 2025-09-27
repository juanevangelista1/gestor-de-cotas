'use client';

import { useState, useMemo } from 'react';
import { User } from '../lib/types';
import { useUsers } from './hooks/useUsers';
import useDebounce from './hooks/useDebounce';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchAndFilter } from './components/ui/SearchAndFilter';
import { AddUserButton } from './components/ui/AddUserButton';
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

	const debouncedName = useDebounce(searchByName, 300);
	const debouncedNumber = useDebounce(searchByNumber, 300);

	const filteredUsers = useMemo(() => {
		let result = users;
		if (debouncedName) {
			result = result.filter((user) => user.name.toLowerCase().includes(debouncedName.toLowerCase()));
		}
		if (debouncedNumber) {
			const searchNum = parseInt(debouncedNumber, 10);
			if (!isNaN(searchNum)) {
				result = result.filter((user) => user.chosenNumbers.includes(searchNum));
			}
		}
		return result.sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime());
	}, [users, debouncedName, debouncedNumber]);

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
			<div className='flex h-screen items-center justify-center text-gray-500'>Carregando...</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-grow container mx-auto p-4 md:p-8'>
				<Header />
				<div className='bg-white dark:bg-gray-800/50 rounded-lg shadow-md p-4 sm:p-6'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
						<SearchAndFilter
							searchByName={searchByName}
							setSearchByName={setSearchByName}
							searchByNumber={searchByNumber}
							setSearchByNumber={setSearchByNumber}
						/>
						<AddUserButton onClick={handleOpenAddModal} />
					</div>
					{filteredUsers.length > 0 ? (
						<UserList
							users={filteredUsers}
							onSelectUser={setSelectedUser}
							onEditUser={handleOpenEditModal}
						/>
					) : (
						<div className='text-center py-16'>
							<p className='text-gray-500'>Nenhum participante encontrado.</p>
							<p className='text-sm text-gray-400 mt-2'>
								Clique em &quot;Adicionar Pessoa&quot; para começar.
							</p>
						</div>
					)}
				</div>
			</main>

			<Footer />

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
