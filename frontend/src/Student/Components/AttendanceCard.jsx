import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default function AttendanceCard() {
    const data = {
        labels: ['Present', 'Half Day', 'Absent'],
        datasets: [
            {
                data: [20, 1, 7], // Only 3 values
                backgroundColor: ['#22C55E', '#9CA3AF', '#EF4444'], // Only 3 colors
                borderColor: ['#ffffff'],
                borderWidth: 1,
                spacing: 2,
            },
        ],
    };

    const options = {
        cutout: '60%',
        plugins: {
            legend: {
                display: false, // Hides legend
            },
        },
    };

    const weeklyData = [
        { day: 'M', status: 'present' },
        { day: 'T', status: 'present' },
        { day: 'W', status: 'present' },
        { day: 'T', status: 'present' },
        { day: 'F', status: 'absent' },
        { day: 'S', status: 'none' },
        { day: 'S', status: 'none' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'present':
                return 'bg-green-500 text-white';
            case 'absent':
                return 'bg-red-500 text-white';
            case 'half':
                return 'bg-gray-400 text-white';
            default:
                return 'bg-gray-300 text-white';
        }
    };

    return (
        <div className="bg-white rounded shadow-md border border-gray-300  w-full">
            {/* Header */}
            <div className="flex justify-between items-center py-4 px-3.5 border-b border-b-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Attendance</h3>
                <button className="text-xs border border-gray-300 px-2 py-1 rounded-md text-gray-600 hover:bg-gray-50">
                    This Week
                </button>
            </div>

            <div className='py-5 px-3.5'>
                {/* Total Working Days */}
                <p className="text-[13px] font-semibold text-gray-600 mb-4">
                    No of total working days <span className="font-semibold text-gray-900">28 Days</span>
                </p>

                {/* Attendance Summary */}
                <div className="grid grid-cols-3 border border-gray-300 text-center mb-5 p-2">
                    <div className=' border-r border-r-gray-300'>
                        <p className="text-2xl font-bold text-green-600">20</p>
                        <p className="text-sm text-gray-600 mt-1">Present</p>
                    </div>
                    <div className=' border-r border-r-gray-300'>
                        <p className="text-2xl font-bold text-gray-500">1</p>
                        <p className="text-sm text-gray-600 mt-1">Halfday</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-500">7</p>
                        <p className="text-sm text-gray-600 mt-1">Absent</p>
                    </div>
                </div>

                {/* Doughnut Chart */}
                <div className="flex justify-center mb-6">
                    <div className="w-44 h-44">
                        <Doughnut data={data} options={options} />
                    </div>
                </div>

                {/* Last 7 Days */}
                <div className="bg-[#F9FAFB] border border-gray-200 rounded p-2 mb-3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-[11px] font-semibold text-gray-800">Last 7 Days</p>
                        <p className="text-[10px] text-gray-500">14 May 2024 - 21 May 2024</p>
                    </div>
                    <div className="flex space-x-2 mb-2">
                        {weeklyData.map((item, i) => (
                            <div
                                key={i}
                                className={`w-6 h-6 rounded text-xs font-semibold flex items-center justify-center ${getStatusClass(
                                    item.status
                                )}`}
                            >
                                {item.day}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
