import { FileDown, FileSpreadsheet } from 'lucide-react';
import { User } from '@/src/lib/types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportButtonsProps {
	users: User[];
}

export function ExportButtons({ users }: ExportButtonsProps) {
	const handleExportToExcel = () => {
		const dataToExport = users.map((user) => ({
			ID: user.id,
			Nome: user.name,
			Telefone: user.phone,
			'Data de Contratação': new Date(user.hireDate).toLocaleDateString(),
			Cotas: user.quotaCount,
			'Números Escolhidos': user.chosenNumbers.sort((a, b) => a - b).join(', '),
			Status: user.isPaid ? 'Pago' : 'Pendente',
		}));

		const worksheet = XLSX.utils.json_to_sheet(dataToExport);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Participantes');
		XLSX.writeFile(workbook, 'lista_participantes.xlsx');
	};

	const handleExportToPdf = () => {
		const doc = new jsPDF();
		const tableData = users.map((user) => [
			user.name,
			user.phone,
			new Date(user.hireDate).toLocaleDateString(),
			user.quotaCount,
			user.chosenNumbers.sort((a, b) => a - b).join(', '),
			user.isPaid ? 'Pago' : 'Pendente',
		]);
		const tableHeaders = ['Nome', 'Telefone', 'Data', 'Cotas', 'Números', 'Status'];

		autoTable(doc, {
			head: [tableHeaders],
			body: tableData,
			didDrawPage: function (data) {
				doc.text('Lista de Participantes', 14, 15);
			},
		});

		doc.save('lista_participantes.pdf');
	};

	return (
		<div className='flex gap-2 w-full md:w-auto'>
			<button
				onClick={handleExportToExcel}
				className='flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
				<FileSpreadsheet className='h-5 w-5' />
				Exportar Excel
			</button>
			<button
				onClick={handleExportToPdf}
				className='flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
				<FileDown className='h-5 w-5' />
				Exportar PDF
			</button>
		</div>
	);
}
