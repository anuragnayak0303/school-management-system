import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function StudentProfileCard() {
    return (
        <div className="w-full rounded bg-[#202C4B] p-4 shadow-lg text-white relative">
            <div className="flex items-start space-x-4">
                <img
                    src="https://via.placeholder.com/60x80"
                    alt="Student"
                    className="w-16 h-20 object-cover rounded-md border border-white"
                />
                <div>
                    <span className="bg-[#EEF3FF] text-blue-700 text-xs px-2 py-0.5 rounded-md font-semibold">
                        #ST1234546
                    </span>
                    <h2 className="text-lg font-bold mt-1">Angelo Riana</h2>
                    <p className="text-sm text-gray-300 mt-0.5">
                        Class : III, C | Roll No : 36545
                    </p>
                </div>
            </div>
            <hr className="border-dashed border-t mt-4 border-white opacity-40" />
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold">1st Quarterly</p>
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded flex items-center">
                        <FaCheckCircle className="mr-1 text-white" />
                        Pass
                    </span>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-1 rounded">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
