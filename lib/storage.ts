import { User } from './types';
import initialUsers from '@/data/users.json';

const STORAGE_KEY = 'raffle_users_yasmin';

export const loadUsersFromLocalStorage = (): User[] => {
	try {
		const storedUsers = localStorage.getItem(STORAGE_KEY);
		if (storedUsers) {
			return JSON.parse(storedUsers);
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
		return initialUsers;
	} catch (error) {
		console.error('Failed to load users from local storage:', error);
		return [];
	}
};

export const saveUsersToLocalStorage = (users: User[]): void => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
	} catch (error) {
		console.error('Failed to save users to local storage:', error);
	}
};
