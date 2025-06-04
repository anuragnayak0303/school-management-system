import React from 'react'

export default function NoticeBoard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl mb-6 shadow-lg border-l-4 border-blue-500">
                        <h1 className="text-2xl font-bold text-gray-800">All Staff Members</h1>
                        <NavLink
                            to={'/school/admin/create_staff'}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-sm font-medium"
                        >
                            + Add New Staff
                        </NavLink>
                    </div></div></div></div>
    )
}
