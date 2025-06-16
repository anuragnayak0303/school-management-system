import React from 'react';
import StudentSideBar from './StudentSideBar';
import MainHeader from '../components/MainHeader';
import StudentProfileCard from './Components/StudentProfileCard';
import TodaysClassCard from './Components/TodaysClassCard';
import AttendanceCard from './Components/AttendanceCard';
import ScheduleCard from './Components/ScheduleCard';
import QuickNavigation from './Components/QuickNavigation';
import PerformanceCard from './Components/PerformanceCard';
import HomeWorksCard from './Components/HomeWorksCard';
import ClassFacility from './Components/ClassFacility';


export default function StudentDashBoard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSideBar />
      <div className="ml-0 md:ml-64 flex-grow flex flex-col min-h-screen">
        <MainHeader />
        <div className="p-4 max-w-7xl w-full mx-auto">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">Student Dashboard</h1>
          <div className="w-full h-auto flex space-x-5 ">
            <div className='w-[68%] flex flex-col justify-between '>
              <div className='w-full flex  justify-between'>
                <div className="w-[49%] h-full space-y-5">
                  <StudentProfileCard />
                  <TodaysClassCard />
                </div>
                <div className="w-[49%] h-full">
                  <AttendanceCard />
                </div>
              </div>
              <div className='w-full h-[12vh] flex justify-between'>
                <QuickNavigation />
              </div>
            </div>
            <div className="w-[32%] h-full rounded">
              {/* shedule */}
              <ScheduleCard />
            </div>
          </div>
          <div className='w-full h-[65vh] mt-5 flex justify-between'>
            <div className='w-[55%] h-full '>
              {/* Performance Card */}
              <PerformanceCard />
            </div>
            <div className='w-[43%] h-full'>
              {/* Home Works */}
              <HomeWorksCard />
            </div>
          </div>

          <div className='w-full h-auto mt-5'>
            {/* ClassFacility */}
            <div className='w-[1062px] h-full '>
              <ClassFacility />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
