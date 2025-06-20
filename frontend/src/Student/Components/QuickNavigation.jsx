import React from 'react'
import { TbReportMoney } from "react-icons/tb";
import { TbHexagonalPrismPlus } from "react-icons/tb";
import { FaCalendarCheck } from "react-icons/fa6";
import { LuCalendarCheck2 } from "react-icons/lu";

export default function QuickNavigation() {
    return (
        <>
            <div className='w-full lg:w-[170px] h-[12vh] bg-white rounded shadow-sm border-b-2 border-b-blue-700 flex justify-center items-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1'>
                <div className='w-6 h-6 bg-blue-700 flex justify-center items-center mr-2 rounded'>
                    <TbReportMoney className='text-white' />
                </div>
                <span className='text-sm font-semibold'>pay Fees</span>
            </div>
            <div className=' w-full lg:w-[170px] h-[12vh] bg-white rounded shadow-sm border-b-2 border-b-green-700 flex justify-center items-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1'>
                <div className='w-6 h-6 bg-green-700 flex justify-center items-center mr-2 rounded'>
                    <TbHexagonalPrismPlus className='text-white' />
                </div>
                <span className='text-sm font-semibold'>Exam Result</span>

            </div>
            <div className=' w-full lg:w-[170px] h-[12vh] bg-white rounded shadow-sm border-b-2 border-b-yellow-700 flex justify-center items-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1'>
                <div className='w-6 h-6 bg-yellow-700 flex justify-center items-center mr-2 rounded'>
                    <FaCalendarCheck className='text-white' />
                </div>
                <span className='text-sm font-semibold'>Calendar </span>
            </div>
            <div className=' w-full lg:w-[170px] h-[12vh] bg-white rounded shadow-sm border-b-2 border-b-gray-700 flex justify-center items-center transform transition-transform duration-300 ease-in-out hover:-translate-y-1'>
                <div className='w-6 h-6 bg-gray-700 flex justify-center items-center mr-2 rounded'>
                    <LuCalendarCheck2 className='text-white' />
                </div>
                <span className='text-sm font-semibold'>Attendance </span>
            </div>
        </>
    )
}
