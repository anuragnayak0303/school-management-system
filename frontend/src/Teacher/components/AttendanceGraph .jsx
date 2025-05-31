import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const AttendanceGraph = ({ history = [] }) => {
    const currentMonthIndex = new Date().getMonth(); // 0 = Jan
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = allMonths.slice(0, currentMonthIndex + 1);

    // Initialize arrays for each status
    const presentData = new Array(currentMonthIndex + 1).fill(0);
    const halfDayData = new Array(currentMonthIndex + 1).fill(0);
    const absentData = new Array(currentMonthIndex + 1).fill(0);

    // Loop through history data
    history.forEach(entry => {
        const date = new Date(entry.createdAt);
        const month = date.getMonth();
        if (month <= currentMonthIndex) {
            if (entry.status === 'present') presentData[month]++;
            else if (entry.status === 'halfDay') halfDayData[month]++;
            else if (entry.status === 'absent') absentData[month]++;
        }
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Present',
                data: presentData,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'green',
            },
            {
                label: 'Half Day',
                data: halfDayData,
                borderColor: 'lightblue',
                backgroundColor: 'rgba(173, 216, 230, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'lightblue',
            },
            {
                label: 'Absent',
                data: absentData,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'red',
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                },
            },
        },
    };

    return (
        <div style={{ height: '250px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default AttendanceGraph;
