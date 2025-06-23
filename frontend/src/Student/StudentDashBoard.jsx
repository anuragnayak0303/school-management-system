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
import LeaveStatusCard from './Components/LeaveStatusCard';
import ExamResultCard from './Components/ExamResultCard';
import NoticeBoardCard from './Components/NoticeBoardCard';

export default function StudentDashBoard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <StudentSideBar />
      <div className="flex-grow flex flex-col ml-0 lg:ml-64">
        <MainHeader />
        <div className="p-4 max-w-7xl w-full mx-auto">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">Student Dashboard</h1>

          {/* Top Section */}
          <div className="w-full flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[68%] flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2 space-y-5">
                  <StudentProfileCard />
                  <TodaysClassCard />
                </div>
                <div className="w-full md:w-1/2">
                  <AttendanceCard />
                </div>
              </div>
              <div className="w-full gap-3 grid lg:grid-cols-4 md:grid-cols-2">
                <QuickNavigation />
              </div>
            </div>
            <div className="w-full lg:w-[32%]">
              <ScheduleCard />
            </div>
          </div>

          {/* Performance & Homework */}
          <div className="w-full mt-5 flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[55%]">
              <PerformanceCard />
            </div>
            <div className="w-full md:w-[45%]">
              <HomeWorksCard />
            </div>
          </div>

          {/* Class Facility */}
          <div className="w-full mt-5">
            <div className="w-full lg:w-[1076px]">
              <ClassFacility />
            </div>
          </div>
          {/* Bottom Section */}
          <div className="w-full mt-5 flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/3">
              <LeaveStatusCard />
            </div>
            <div className="w-full md:w-1/3">
              <ExamResultCard />
            </div>
            <div className="w-full md:w-1/3">
              <NoticeBoardCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
