'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { User } from '../lib/types';
import initialData from '../data/users.json';
import { useLocalStorage } from './useLocalStorage';

export const useUsers = () => {
	const [users, setUsers] = useLocalStorage<User[]>('raffle_users', initialData);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		setIsInitialized(true);
	}, []);

	const addUser = useCallback(
		(user: Omit<User, 'id'>) => {
			const newUser: User = { ...user, id: crypto.randomUUID() };
			setUsers((prevUsers) => [...prevUsers, newUser]);
		},
		[setUsers]
	);

	const updateUser = useCallback(
		(updatedUser: User) => {
			setUsers((prevUsers) =>
				prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
			);
		},
		[setUsers]
	);

	const isNameTaken = useCallback(
		(name: string, currentUserId: string | null = null) => {
			return users.some(
				(user) => user.name.toLowerCase() === name.toLowerCase() && user.id !== currentUserId
			);
		},
		[users]
	);

	const isNumberTaken = useCallback(
		(number: number, currentUserId: string | null = null) => {
			for (const user of users) {
				if (user.id !== currentUserId && user.chosenNumbers.includes(number)) {
					return true;
				}
			}
			return false;
		},
		[users]
	);

	return {
		users,
		addUser,
		updateUser,
		isNameTaken,
		isNumberTaken,
		isInitialized,
	};
};
