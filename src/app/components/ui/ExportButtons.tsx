import { useState } from 'react';
import { FileDown, FileSpreadsheet, Loader2 } from 'lucide-react';
import { User } from '@/src/lib/types';

interface ExportButtonsProps {
	users: User[];
}

export function ExportButtons({ users }: ExportButtonsProps) {
	const [isExporting, setIsExporting] = useState<'excel' | 'pdf' | null>(null);

	const handleExportToExcel = async () => {
		setIsExporting('excel');
		try {
			const XLSX = await import('xlsx');

			const dataToExport = users.map((user) => ({
				ID: user.id,
				Name: user.name,
				Phone: user.phone,
				Date: new Date(user.hireDate).toLocaleDateString(),
				Quotas: user.quotaCount,
				Numbers: user.chosenNumbers.sort((a, b) => a - b).join(', '),
				Status: user.isPaid ? 'Paid' : 'Pending',
			}));

			const worksheet = XLSX.utils.json_to_sheet(dataToExport);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
			XLSX.writeFile(workbook, 'raffle_participants.xlsx');
		} catch (error) {
			console.error('Failed to export Excel', error);
			alert('Failed to generate Excel file.');
		} finally {
			setIsExporting(null);
		}
	};

	const handleExportToPdf = async () => {
		setIsExporting('pdf');
		try {
			const jsPDF = (await import('jspdf')).default;
			const autoTable = (await import('jspdf-autotable')).default;

			const doc = new jsPDF();
			const tableData = users.map((user) => [
				user.name,
				user.phone,
				new Date(user.hireDate).toLocaleDateString(),
				user.quotaCount,
				user.chosenNumbers.sort((a, b) => a - b).join(', '),
				user.isPaid ? 'Paid' : 'Pending',
			]);
			const tableHeaders = [['Name', 'Phone', 'Date', 'Quotas', 'Numbers', 'Status']];

			autoTable(doc, {
				head: tableHeaders,
				body: tableData,
				didDrawPage: function () {
					doc.text('Participants List', 14, 15);
				},
			});

			doc.save('raffle_participants.pdf');
		} catch (error) {
			console.error('Failed to export PDF', error);
			alert('Failed to generate PDF file.');
		} finally {
			setIsExporting(null);
		}
	};

	return (
		<div className='flex gap-2 w-full md:w-auto'>
			<button
				onClick={handleExportToExcel}
				disabled={!!isExporting}
				className='flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
				aria-label='Export to Excel'>
				{isExporting === 'excel' ? (
					<Loader2 className='h-5 w-5 animate-spin' />
				) : (
					<FileSpreadsheet className='h-5 w-5' />
				)}
				Excel
			</button>
			<button
				onClick={handleExportToPdf}
				disabled={!!isExporting}
				className='flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
				aria-label='Export to PDF'>
				{isExporting === 'pdf' ? (
					<Loader2 className='h-5 w-5 animate-spin' />
				) : (
					<FileDown className='h-5 w-5' />
				)}
				PDF
			</button>
		</div>
	);
}
