import { PiggyBank } from 'lucide-react';

export function Header() {
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
			</div>
		</header>
	);
}
