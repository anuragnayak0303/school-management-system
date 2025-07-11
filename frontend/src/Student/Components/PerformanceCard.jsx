import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import { AuthStudentContext } from '../../context/StudentAuth';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function PerformanceCard() {
    const [examLabels, setExamLabels] = useState([]);
    const [averageScores, setAverageScores] = useState([]);
    const { student } = useContext(AuthStudentContext)

    const fetchPerformanceData = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v11/exam/student/${student?._id}`);

            console.log(data)
            const labels = [];
            const scores = [];

            data?.data?.forEach(entry => {
                const totalObtained = entry.marks.reduce((sum, mark) => sum + mark.markObtained, 0);
                const subjectCount = entry.marks.length;
                const avg = subjectCount > 0 ? totalObtained / subjectCount : 0;

                labels.push(entry.examName);
                scores.push(Number(avg.toFixed(2)));
            });

            setExamLabels(labels);
            setAverageScores(scores);
        } catch (err) {
            console.error('Failed to load performance data:', err);
        }
    };

    useEffect(() => {
        if (student?._id) fetchPerformanceData();
    }, [student]);

    const data = {
        labels: examLabels,
        datasets: [
            {
                label: 'Average Marks',
                data: averageScores,
                fill: true,
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderColor: '#4285f4',
                pointBackgroundColor: '#4285f4',
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
                beginAtZero: true,
                ticks: { color: '#6B7280' },
                grid: { display: false },
            },
            x: {
                ticks: { color: '#6B7280' },
                grid: { display: false },
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
