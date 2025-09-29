import { PiggyBank } from 'lucide-react';
import { AddUserButton } from '../ui/AddUserButton'; // Importe o botão

interface HeaderProps {
	onOpenAddModal: () => void;
}

export function Header({ onOpenAddModal }: HeaderProps) {
	return (
		<header className='text-center pt-4 pb-10'>
			<div className='inline-flex items-center gap-3'>
				<PiggyBank className='w-12 h-12 text-pink-500' />
				<div>
					<h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
						Rifa Yasmin
					</h1>
					<p className='text-md sm:text-lg text-gray-500 dark:text-gray-400 mt-1'>
						Gestor de Cotas e Participantes
					</p>
				</div>
				<div className='hidden md:block absolute right-8 top-12'>
					<AddUserButton onClick={onOpenAddModal} /> {/* Renderize o botão aqui */}
				</div>
			</div>
		</header>
	);
}
