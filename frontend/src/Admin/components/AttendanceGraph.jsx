import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AttendanceGraph = () => {
  const [attendanceData, setAttendanceData] = useState({ labels: [], datasets: [] });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v8/student/attendance/get');
      const data = res.data;

      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      const today = new Date();
      const isCurrentMonth = selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

      const allDays = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(selectedYear, selectedMonth, i + 1);
        if (isCurrentMonth && date > today) return null;
        return date.toISOString().split('T')[0];
      }).filter(Boolean);

      const dailyStats = {};
      data.forEach(entry => {
        const date = new Date(entry.date);
        if (date.getMonth() !== selectedMonth || date.getFullYear() !== selectedYear) return;

        const day = date.toISOString().split('T')[0];
        if (!dailyStats[day]) dailyStats[day] = 0;

        entry.attendance.forEach(a => {
          if (a.status === 'Present') dailyStats[day]++;
        });
      });

      const labels = allDays;
      const presentData = labels.map(day => dailyStats[day] || 0);

      setAttendanceData({
        labels,
        datasets: [
          {
            label: '🎓 Present Students',
            data: presentData,
            fill: true,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
              return gradient;
            },
            borderColor: 'rgba(16, 185, 129, 1)', // Emerald
            pointBackgroundColor: 'rgba(16, 185, 129, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
            pointRadius: 4,
            pointHoverRadius: 8,
            tension: 0.4,
            borderWidth: 3,
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 shadow-2xl rounded-2xl p-8 border border-emerald-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 md:mb-0">
          📊 Monthly Attendance — <span className="text-emerald-600">{months[selectedMonth]} {selectedYear}</span>
        </h2>
        <div className="flex gap-4">
          <select
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month, idx) => (
              <option key={idx} value={idx}>{month}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Line
          data={attendanceData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: { color: '#333', font: { size: 14, weight: 'bold' } }
              },
              tooltip: {
                backgroundColor: '#111',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
                padding: 12
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#666', precision: 0 },
                grid: { color: 'rgba(0,0,0,0.05)' }
              },
              x: {
                ticks: { color: '#666', autoSkip: true, maxTicksLimit: 12 },
                grid: { color: 'rgba(0,0,0,0.03)' }
              }
            }
          }}
          height={350}
        />
      </div>
    </div>
  );
};

export default AttendanceGraph;
