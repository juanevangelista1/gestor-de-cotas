import { useState, useEffect, FormEvent } from 'react';
import { User } from '@/src/app/lib/types';

interface AddUserModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (user: Omit<User, 'id'> | User) => void;
	userToEdit: User | null;
	isNameTaken: (name: string, currentUserId: string | null) => boolean;
	isNumberTaken: (number: number, currentUserId: string | null) => boolean;
}

export function AddUserModal({
	isOpen,
	onClose,
	onSave,
	userToEdit,
	isNameTaken,
	isNumberTaken,
}: AddUserModalProps) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [quotaCount, setQuotaCount] = useState(1);
	const [isPaid, setIsPaid] = useState(false);
	const [chosenNumbersStr, setChosenNumbersStr] = useState('');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const isEditMode = !!userToEdit;

	useEffect(() => {
		if (userToEdit) {
			setName(userToEdit.name);
			setPhone(userToEdit.phone);
			setQuotaCount(userToEdit.quotaCount);
			setIsPaid(userToEdit.isPaid);
			setChosenNumbersStr(userToEdit.chosenNumbers.join(', '));
		} else {
			setName('');
			setPhone('');
			setQuotaCount(1);
			setIsPaid(false);
			setChosenNumbersStr('');
		}
		setErrors({});
	}, [userToEdit, isOpen]);

	const validate = (): boolean => {
		const newErrors: Record<string, string> = {};
		if (!name.trim()) newErrors.name = 'Nome é obrigatório.';
		if (isNameTaken(name, userToEdit?.id ?? null)) newErrors.name = 'Este nome já está em uso.';
		const numbers = chosenNumbersStr
			.split(/[\s,]+/)
			.filter(Boolean)
			.map(Number);
		if (numbers.some(isNaN)) {
			newErrors.chosenNumbers = 'Apenas números separados por vírgula ou espaço são permitidos.';
		} else if (numbers.length !== quotaCount) {
			newErrors.chosenNumbers = `Você deve escolher exatamente ${quotaCount} número(s).`;
		} else if (new Set(numbers).size !== numbers.length) {
			newErrors.chosenNumbers = 'Não pode haver números repetidos.';
		} else if (numbers.some((num) => isNumberTaken(num, userToEdit?.id ?? null))) {
			newErrors.chosenNumbers = 'Um ou mais números escolhidos já estão em uso.';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!validate()) return;
		const chosenNumbers = chosenNumbersStr
			.split(/[\s,]+/)
			.filter(Boolean)
			.map(Number);
		const userData = {
			name,
			phone,
			quotaCount,
			isPaid,
			chosenNumbers,
			hireDate: userToEdit ? userToEdit.hireDate : new Date().toISOString(),
		};
		if (isEditMode) {
			onSave({ ...userToEdit, ...userData });
		} else {
			onSave(userData);
		}
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full'>
				<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
					{isEditMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
				</h2>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Nome
						</label>
						<input
							type='text'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-transparent'
						/>
						{errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
					</div>
					<div>
						<label
							htmlFor='phone'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Telefone
						</label>
						<input
							type='tel'
							id='phone'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className='mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-transparent'
						/>
					</div>
					<div>
						<label
							htmlFor='quotaCount'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Quantidade de Cotas
						</label>
						<input
							type='number'
							id='quotaCount'
							min='1'
							value={quotaCount}
							onChange={(e) => setQuotaCount(Number(e.target.value))}
							className='mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-transparent'
						/>
					</div>
					<div>
						<label
							htmlFor='chosenNumbers'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Números Escolhidos (separados por vírgula)
						</label>
						<textarea
							id='chosenNumbers'
							value={chosenNumbersStr}
							onChange={(e) => setChosenNumbersStr(e.target.value)}
							className='mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-transparent'
							rows={3}
						/>
						{errors.chosenNumbers && <p className='text-red-500 text-xs mt-1'>{errors.chosenNumbers}</p>}
					</div>
					<div className='flex items-center'>
						<input
							type='checkbox'
							id='isPaid'
							checked={isPaid}
							onChange={(e) => setIsPaid(e.target.checked)}
							className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
						/>
						<label
							htmlFor='isPaid'
							className='ml-2 block text-sm text-gray-900 dark:text-gray-300'>
							Pago?
						</label>
					</div>
					<div className='flex justify-end gap-4 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='py-2 px-4 rounded-md font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors cursor-pointer'>
							Cancelar
						</button>
						<button
							type='submit'
							className='py-2 px-4 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer'>
							{isEditMode ? 'Salvar Alterações' : 'Adicionar'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
