import { PlusCircle } from 'lucide-react';

interface AddUserButtonProps {
	onClick: () => void;
}

export function AddUserButton({ onClick }: AddUserButtonProps) {
	return (
		<button
			onClick={onClick}
			className='w-full md:w-auto flex items-center justify-center gap-2 bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
			<PlusCircle className='h-5 w-5' />
			Adicionar Pessoa
		</button>
	);
}
