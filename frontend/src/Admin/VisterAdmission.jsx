import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import { FiDownload } from 'react-icons/fi';
import axios from 'axios';

export default function VisterAdmission() {
    const [visitors, setVisitors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20); // new state

    const allAdmission = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/admission/all_admission-enquiry`);
            setVisitors(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allAdmission();
    }, []);

    const handleExport = () => {
        const csvData = [
            ['Name', 'Email', 'Phone', 'Date', 'Description'],
            ...visitors.map(v => [
                v.name,
                v.email,
                `="${v.phone}"`, // Excel-safe phone number
                new Date(v.createdAt || v.Data).toLocaleDateString(),
                v.description
            ])
        ];

        const csvContent = 'data:text/csv;charset=utf-8,' +
            csvData.map(e => e.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'visitor_admission_list.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const totalPages = Math.ceil(visitors.length / rowsPerPage);
    const paginatedVisitors = visitors.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // reset to first page when rows per page changes
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Admission Visitor</div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Admission Visitor List</h1>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                            <select
                                onChange={handleRowsPerPageChange}
                                value={rowsPerPage}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value="10">10 / page</option>
                                <option value="20">20 / page</option>
                                <option value="50">50 / page</option>
                                <option value="100">100 / page</option>
                            </select>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                            >
                                <FiDownload className="text-lg" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Visitor Table */}
                    <div className="bg-white rounded shadow overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                                {paginatedVisitors.map((visitor, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4">{visitor.name}</td>
                                        <td className="px-6 py-4">{visitor.email}</td>
                                        <td className="px-6 py-4">{visitor.phone}</td>
                                        <td className="px-6 py-4">{new Date(visitor.createdAt || visitor.Data).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{visitor.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
