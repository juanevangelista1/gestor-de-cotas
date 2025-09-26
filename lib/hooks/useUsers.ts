'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { loadUsersFromLocalStorage, saveUsersToLocalStorage } from '../storage';

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		setUsers(loadUsersFromLocalStorage());
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (isInitialized) {
			saveUsersToLocalStorage(users);
		}
	}, [users, isInitialized]);

	const addUser = useCallback((user: Omit<User, 'id'>) => {
		const newUser: User = { ...user, id: crypto.randomUUID() };
		setUsers((prevUsers) => [...prevUsers, newUser]);
	}, []);

	const updateUser = useCallback((updatedUser: User) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
		);
	}, []);

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
