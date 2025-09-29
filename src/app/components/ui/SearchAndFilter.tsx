import { Search, ListFilter } from 'lucide-react';

interface SearchAndFilterProps {
	searchByName: string;
	setSearchByName: (value: string) => void;
	searchByNumber: string;
	setSearchByNumber: (value: string) => void;
}

export function SearchAndFilter({
	searchByName,
	setSearchByName,
	searchByNumber,
	setSearchByNumber,
}: SearchAndFilterProps) {
	return (
		<div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
			<div className='relative'>
				<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
				<input
					type='text'
					placeholder='Pesquisar por nome...'
					value={searchByName}
					onChange={(e) => setSearchByName(e.target.value)}
					className='w-full p-2 pl-10 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors'
				/>
			</div>
			<div className='relative'>
				<ListFilter className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
				<input
					type='number'
					placeholder='Pesquisar por número...'
					value={searchByNumber}
					onChange={(e) => setSearchByNumber(e.target.value)}
					className='w-full p-2 pl-10 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors'
				/>
			</div>
		</div>
	);
}
