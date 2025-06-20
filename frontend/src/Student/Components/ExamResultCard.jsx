import React from 'react';
// import { ChevronDownIcon } from '@heroicons/react/solid';

export default function ExamResultCard() {
    const data = [
        { subject: 'Mat', score: 100, color: '#CBD5E1', label: 'Mat : 100', labelStyle: 'bg-blue-100 text-blue-800' },
        { subject: 'Phy', score: 92, color: '#3B82F6', label: 'Phy: 92', labelStyle: 'bg-green-100 text-green-800' },
        { subject: 'Che', score: 90, color: '#FACC15', label: 'Che : 90', labelStyle: 'bg-yellow-100 text-yellow-800' },
        { subject: 'Eng', score: 82, color: '#F87171', label: 'Eng : 80', labelStyle: 'bg-red-100 text-red-800' },
        { subject: 'Sci', score: 90, color: '#CBD5E1', label: 'Sci : 90', labelStyle: 'bg-indigo-100 text-indigo-800' },
    ];

    const maxHeight = 180;

    return (
        <div className="w-full h-full bg-white rounded shadow-md border border-gray-300 ">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-300">
                <h2 className="text-sm font-semibold text-gray-800">Exam Result</h2>
                <div className="flex items-center text-[11px] text-gray-600 space-x-1">
                    <span>📅</span>
                    <span>1st Quarter</span>
                    {/* <ChevronDownIcon className="w-3 h-3 text-gray-400" /> */}
                </div>
            </div>

            <div className='px-4 py-4'>
                {/* Labels */}
                <div className="flex flex-wrap gap-2 mb-4 text-[11px] font-medium">
                    {data.slice(0, 4).map((item, i) => (
                        <div key={i} className={`px-2 py-1 rounded ${item.labelStyle}`}>
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Graph */}
                <div className="flex justify-between items-end mt-10 h-[200px] pt-2 px-2 border-s border-b border-gray-200">
                    {data.map((item, i) => (
                        <div key={i} className="flex flex-col  items-center w-[18%]">
                            <span className="text-[11px] font-semibold text-gray-800 mb-1">
                                {item.score}%
                            </span>
                            <div className="w-[28px] h-[180px] bg-gray-100 rounded-md flex items-end">
                                <div
                                    className="w-full rounded-t-md transition-all duration-300"
                                    style={{
                                        height: `${(item.score / 100) * maxHeight}px`,
                                        backgroundColor: item.color,
                                    }}
                                />
                            </div>
                            <span className="text-[11px] text-gray-600 mt-1">{item.subject}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
