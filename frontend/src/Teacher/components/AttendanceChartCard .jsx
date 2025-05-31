// AttendanceChartCard.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AttendanceChartCard = () => {
  const today = new Date();
  const currentDay = today.getDate();

  const labels = Array.from({ length: currentDay }, (_, i) => `Day ${i + 1}`);

  // Generate sample data
  const present = Array.from({ length: currentDay }, () => Math.random() > 0.2 ? 1 : 0);
  const halfDay = Array.from({ length: currentDay }, () => Math.random() > 0.85 ? 1 : 0);
  const absent = present.map((val, idx) => val === 0 && halfDay[idx] === 0 ? 1 : 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Present',
        data: present,
        backgroundColor: 'green',
        stack: 'attendance'
      },
      {
        label: 'Half Day',
        data: halfDay,
        backgroundColor: 'lightblue',
        stack: 'attendance'
      },
      {
        label: 'Absent',
        data: absent,
        backgroundColor: 'red',
        stack: 'attendance'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Attendance'
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div style={{
      background: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AttendanceChartCard;
