// src/pages/Components/HomeWorksCard.jsx
import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { IoPricetagOutline } from 'react-icons/io5';

const homeworks = [
  {
    subject: 'Physics',
    title: 'Write about Theory of Pendulum',
    teacher: 'Aaron',
    due: '16 Jun 2024',
    color: 'text-blue-600',
    progress: 90,
    image: 'https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-01.jpg',
  },
  {
    subject: 'Chemistry',
    title: 'Chemistry - Change of Elements',
    teacher: 'Hellana',
    due: '16 Jun 2024',
    color: 'text-green-600',
    progress: 65,
    image: 'https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-02.jpg',
  },
  {
    subject: 'Maths',
    title: 'Maths - Problems to Solve Page 21',
    teacher: 'Morgan',
    due: '21 Jun 2024',
    color: 'text-red-600',
    progress: 30,
    image: 'https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-03.jpg',
  },
  {
    subject: 'English',
    title: 'English - Vocabulary Introduction',
    teacher: 'Daniel Josua',
    due: '21 Jun 2024',
    color: 'text-sky-600',
    progress: 10,
    image: 'https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-04.jpg',
  },
];

const getStrokeColor = (percent) => {
  if (percent >= 70) return '#22c55e'; // green-500
  if (percent >= 40) return '#eab308'; // yellow-500
  return '#ef4444'; // red-500
};

export default function HomeWorksCard() {
  return (
    <div className="w-full h-full bg-white rounded shadow-md border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <h2 className="text-sm font-semibold text-gray-700">Home Works</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FaBookOpen />
          <span className="text-sm font-semibold text-gray-700">All Subject</span>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4 p-4 overflow-y-auto h-[56vh]">
        {homeworks.map((hw, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center ${
              idx !== homeworks.length - 1 ? 'border-b border-gray-300 pb-4' : ''
            }`}
          >
            {/* Left - Image */}
            <img
              src={hw.image}
              alt={hw.subject}
              className="w-12 h-12 rounded object-cover"
            />

            {/* Middle */}
            <div className="flex flex-col w-[70%] ml-3">
              <span className={`text-xs font-medium flex items-center ${hw.color}`}>
                <IoPricetagOutline className="mr-1 -rotate-180" />
                {hw.subject}
              </span>
              <span className="text-sm font-semibold text-gray-700">{hw.title}</span>
              <span className="text-xs text-gray-500">
                {hw.teacher} • Due by : {hw.due}
              </span>
            </div>

            {/* Right - SVG Circular Progress */}
            <div className="w-10 h-10 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Circle */}
                <path
                  className="text-gray-200"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress Circle */}
                <path
                  stroke={getStrokeColor(hw.progress)}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${hw.progress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                {hw.progress}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
