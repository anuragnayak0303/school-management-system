import React, { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import axios from 'axios';
import { AuthStudentContext } from '../../context/StudentAuth';
import { format, eachDayOfInterval, isBefore, isSameDay, parseISO, isSunday, isAfter } from 'date-fns';

ChartJS.register(ArcElement, Tooltip);

export default function AttendanceCard() {
    const { student } = useContext(AuthStudentContext);
    const [attendanceData, setAttendanceData] = useState([]);
    const [summary, setSummary] = useState({ present: 0, absent: 0, total: 0 });
    const [weeklyData, setWeeklyData] = useState([]);

    const GetAttendance = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v8/student/attendance/student/${student?._id}`);
            setAttendanceData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const generateAttendanceStats = (records) => {
        if (!records.length) return;

        const parsedRecords = records.map(entry => ({
            date: format(new Date(entry.date), 'yyyy-MM-dd'),
            status: entry.status.toLowerCase()
        }));

        const dateSet = new Map();
        parsedRecords.forEach(r => {
            if (!dateSet.has(r.date)) {
                dateSet.set(r.date, r.status); // Store only one status per day (first encountered)
            }
        });

        const allDates = eachDayOfInterval({
            start: new Date(records[0].date),
            end: new Date()
        });

        let present = 0, absent = 0, total = 0;

        allDates.forEach(date => {
            const dateStr = format(date, 'yyyy-MM-dd');

            // Skip Sundays
            if (isSunday(date) || isAfter(date, new Date())) return;

            total++;

            const status = dateSet.get(dateStr);
            if (status === 'present') present++;
            else absent++; // missing or marked absent
        });

        setSummary({ present, absent, total });

        // Weekly View (last 7 non-future days)
        const last7Days = eachDayOfInterval({
            start: new Date(Date.now() - 6 * 86400000),
            end: new Date()
        });

        const last7Mapped = last7Days.map(d => {
            const dateStr = format(d, 'yyyy-MM-dd');
            const status = isSunday(d) || isAfter(d, new Date())
                ? 'none'
                : dateSet.get(dateStr) || 'absent';
            return { day: format(d, 'EEE')[0], status };
        });

        setWeeklyData(last7Mapped);
    };

    useEffect(() => {
        if (student?._id) GetAttendance();
    }, [student]);

    useEffect(() => {
        generateAttendanceStats(attendanceData);
    }, [attendanceData]);

    const doughnutData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                data: [summary.present, summary.absent],
                backgroundColor: ['#22C55E', '#EF4444'],
                borderColor: ['#fff'],
                borderWidth: 1,
                spacing: 2,
            },
        ],
    };

    const doughnutOptions = {
        cutout: '60%',
        plugins: {
            legend: {
                display: false,
            },
        },
    };

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
        <div className="bg-white rounded shadow-md border border-gray-300 w-full">
            <div className="flex justify-between items-center py-4 px-3.5 border-b border-b-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Attendance</h3>
                <button className="text-xs border border-gray-300 px-2 py-1 rounded-md text-gray-600 hover:bg-gray-50">
                    This Week
                </button>
            </div>

            <div className='py-5 px-3.5'>
                <p className="text-[13px] font-semibold text-gray-600 mb-4">
                    No of total working days <span className="font-semibold text-gray-900">{summary.total} Days</span>
                </p>

                <div className="grid grid-cols-2 border border-gray-300 text-center mb-5 p-2">
                    <div className='border-r border-r-gray-300'>
                        <p className="text-2xl font-bold text-green-600">{summary.present}</p>
                        <p className="text-sm text-gray-600 mt-1">Present</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-500">{summary.absent}</p>
                        <p className="text-sm text-gray-600 mt-1">Absent</p>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="w-44 h-44">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>

                <div className="bg-[#F9FAFB] border border-gray-200 rounded p-2 mb-3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-[11px] font-semibold text-gray-800">Last 7 Days</p>
                        <p className="text-[10px] text-gray-500">{format(new Date(Date.now() - 6 * 86400000), 'dd MMM yyyy')} - {format(new Date(), 'dd MMM yyyy')}</p>
                    </div>
                    <div className="flex space-x-2 mb-2">
                        {weeklyData.map((item, i) => (
                            <div
                                key={i}
                                className={`w-6 h-6 rounded text-xs font-semibold flex items-center justify-center ${getStatusClass(item.status)}`}
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
