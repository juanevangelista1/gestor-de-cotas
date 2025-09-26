import { User } from '../../../lib/types';

interface UserListProps {
	users: User[];
	onSelectUser: (user: User) => void;
	onEditUser: (user: User) => void;
}

export function UserList({ users, onSelectUser, onEditUser }: UserListProps) {
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>
				<thead className='bg-gray-50 dark:bg-gray-900/50'>
					<tr>
						<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Nome
						</th>
						<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Telefone
						</th>
						<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Data
						</th>
						<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Cotas
						</th>
						<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Status
						</th>
						<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Ações
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
					{users.map((user) => (
						<tr
							key={user.id}
							className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
							<td className='py-4 px-4 whitespace-nowrap'>
								<div
									className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer'
									onClick={() => onSelectUser(user)}>
									{user.name}
								</div>
							</td>
							<td className='py-4 px-4 whitespace-nowrap text-sm text-gray-500'>{user.phone}</td>
							<td className='py-4 px-4 whitespace-nowrap text-sm text-gray-500'>
								{new Date(user.hireDate).toLocaleDateString()}
							</td>
							<td className='py-4 px-4 whitespace-nowrap text-sm text-gray-500'>{user.quotaCount}</td>
							<td className='py-4 px-4 whitespace-nowrap'>
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										user.isPaid
											? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
											: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
									}`}>
									{user.isPaid ? 'Pago' : 'Pendente'}
								</span>
							</td>
							<td className='py-4 px-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => onEditUser(user)}
									className='text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 cursor-pointer'>
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
