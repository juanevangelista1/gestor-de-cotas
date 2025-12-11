export const APP_CONFIG = {
	title: 'Raffle Manager',
	description: 'Professional quota and participant management system.',
	storageKey: 'raffle_manager_data',
	currency: 'BRL',
	locale: 'pt-BR',
	companyName: 'Raffle Manager Inc.',
};

export const VALIDATION_MESSAGES = {
	nameRequired: 'Name is required.',
	nameTaken: 'This name is already in use.',
	invalidNumberFormat: 'Only numbers separated by commas or spaces are allowed.',
	quotaMismatch: (expected: number) => `You must choose exactly ${expected} number(s).`,
	duplicateNumbers: 'Duplicate numbers are not allowed.',
	numberTaken: 'One or more chosen numbers are already taken.',
};
