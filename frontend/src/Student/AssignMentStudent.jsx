import React from 'react';
import StudentSideBar from './StudentSideBar';
import MainHeader from '../components/MainHeader';import HomeWorksCard from './Components/HomeWorksCard';
; // adjust the path if needed

export default function AssignMentStudent() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            <StudentSideBar />
            <div className="flex-grow flex flex-col ml-0 lg:ml-64">
                <MainHeader />
                <div className="p-4 max-w-7xl w-full mx-auto">
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">📘 Assignments</h1>
                    <HomeWorksCard/>
                </div>
            </div>
        </div>
    );
}
