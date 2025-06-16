import React, { useState } from 'react';
import { FaClock, FaRegCalendarAlt } from 'react-icons/fa';
import { MdArrowLeft } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';

export default function ScheduleCard() {
    const exams = [
        {
            id: 1,
            title: '1st Quarterly',
            subject: 'Mathematics',
            date: '06 May 2024',
            time: '01:30 - 02:15 PM',
            room: '15',
            daysLeft: '19 Days More',
        },
        {
            id: 2,
            title: '2nd Quarterly',
            subject: 'Physics',
            date: '07 May 2024',
            time: '01:30 - 02:15 PM',
            room: '15',
            daysLeft: '20 Days More',
        },
        {
            id: 3,
            title: '2nd Quarterly',
            subject: 'Physics',
            date: '07 May 2024',
            time: '01:30 - 02:15 PM',
            room: '15',
            daysLeft: '20 Days More',
        },
    ];

    // ---- Calendar State Logic ---- //
    const [currentDate, setCurrentDate] = useState(new Date());

    const getCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startOfMonth = new Date(year, month, 1);
        const startDay = startOfMonth.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysArray = [];
        for (let i = 0; i < startDay; i++) {
            daysArray.push(null); // Empty cells before 1st
        }
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        return daysArray;
    };

    const handlePrevMonth = () => {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(prev);
    };

    const handleNextMonth = () => {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(next);
    };

    const monthYearStr = currentDate.toLocaleDateString('default', {
        month: 'long',
        year: 'numeric',
    });

    const today = new Date().getDate();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    return (
        <div className="bg-white rounded border border-gray-300 shadow-md h-full">
            {/* Header */}
            <div className="py-2.5 px-4 border-b border-b-gray-300">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold text-gray-700">Schedules</h3>
                    <button className="text-xs text-blue-600 hover:underline">+ Add New</button>
                </div>
            </div>

            <div className="px-4">
                {/* Calendar */}
                <div className="text-center mb-1 mt-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700 ">
                        <button
                            onClick={handlePrevMonth}
                            className="w-6 h-6 flex justify-center items-center border border-gray-200 rounded-full cursor-pointer hover:bg-black hover:text-white"
                        >
                            <MdArrowLeft className="text-sm" />
                        </button>
                        <span className="text-xs">{monthYearStr}</span>
                        <button
                            onClick={handleNextMonth}
                            className="w-6 h-6 flex justify-center items-center border border-gray-200 rounded-full cursor-pointer hover:bg-black hover:text-white"
                        >
                            <IoMdArrowDropright className="text-sm" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-[14px] text-gray-600 font-semibold mt-3">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-xs mt-4 text-gray-700">
                        {getCalendarDays().map((day, idx) => {
                            const isToday =
                                day === today &&
                                currentDate.getMonth() === thisMonth &&
                                currentDate.getFullYear() === thisYear;
                            return (
                                <div
                                    key={idx}
                                    className={`relative w-12 h-6 flex items-center justify-center rounded 
    ${isToday ? 'bg-indigo-600 text-white border' : 'hover:bg-gray-100 text-gray-700'}`}
                                >
                                    {day || ''}
                                    {isToday && (
                                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-l-[10px] border-t-white border-l-transparent"></div>
                                    )}
                                </div>

                            );
                        })}
                    </div>
                </div>

                {/* Exams */}

                <h4 className="text-sm font-semibold text-gray-800 mb-2">Exams</h4>

                <div className='w-full h-[50vh] overflow-y-auto'>
                    {exams.map((exam) => (
                        <div key={exam.id} className=" p-3 rounded border border-gray-200 mb-3">
                            <div className="flex justify-between items-center text-xs mb-2">
                                <span className="font-semibold text-gray-700">{exam.title}</span>
                                <span className="bg-red-100 text-red-700 px-2 py-[3px] rounded text-[9px] font-bold">
                                    {exam.daysLeft}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-gray-800">{exam.subject}</p>
                                    <div className="text-[10px] text-gray-600 flex items-center mt-1">
                                        <FaClock className="mr-1" />
                                        {exam.time}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                                        <FaRegCalendarAlt className="mr-1" />
                                        {exam.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
