// src/pages/Components/PerformanceCard.jsx
import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaCalendarAlt } from 'react-icons/fa';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler
);

export default function PerformanceCard() {
    const labels = ['Quarter 1', 'Quarter 2', 'Half yearly', 'Model', 'Final'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Avg. Exam Score',
                data: [75, 70, 66, 70, 75],
                fill: true,
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderColor: '#4285f4',
                pointBackgroundColor: '#4285f4',
                tension: 0.4,
            },
            {
                label: 'Avg. Attendance',
                data: [85, 78, 75, 78, 86],
                fill: true,
                backgroundColor: 'rgba(0, 200, 180, 0.1)',
                borderColor: '#00C8B4',
                pointBackgroundColor: '#00C8B4',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                    color: '#4B5563',
                },
            },
        },
        scales: {
            y: {
                min: 65,
                max: 90,
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="w-full h-full bg-white rounded shadow-md p-4 border border-gray-300">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-semibold text-gray-700">Performance</h2>
                <div className="flex items-center text-gray-500 text-sm space-x-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <span>2024 - 2025</span>
                </div>
            </div>
            <div className="w-full h-[85%]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
