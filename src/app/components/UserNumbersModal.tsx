import { User } from '../../lib/types';

interface UserNumbersModalProps {
	user: User | null;
	onClose: () => void;
}

export function UserNumbersModal({ user, onClose }: UserNumbersModalProps) {
	if (!user) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full'>
				<h2 className='text-2xl font-bold mb-4'>Números de {user.name}</h2>
				<div className='flex flex-wrap gap-2 max-h-60 overflow-y-auto p-2 bg-gray-100 dark:bg-gray-900/50 rounded'>
					{user.chosenNumbers.length > 0 ? (
						user.chosenNumbers
							.sort((a, b) => a - b)
							.map((num) => (
								<span
									key={num}
									className='bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-mono text-lg py-2 px-4 rounded-md'>
									{num.toString().padStart(2, '0')}
								</span>
							))
					) : (
						<p className='text-gray-500'>Nenhum número foi escolhido ainda.</p>
					)}
				</div>
				<button
					onClick={onClose}
					className='mt-6 w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer'>
					Fechar
				</button>
			</div>
		</div>
	);
}
