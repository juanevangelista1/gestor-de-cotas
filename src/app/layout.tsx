import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Rifa Yasmin - Gestor de Cotas',
	description: 'Gerenciamento profissional de cotas e participantes da Rifa Yasmin.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body
				className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
				{children}
			</body>
		</html>
	);
}
