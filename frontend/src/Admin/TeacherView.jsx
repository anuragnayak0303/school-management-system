import React from 'react'

export default function TeacherView() {
    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />

                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Subject</div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Subject Management</h1>
                        <button
                            onClick={toggleForm}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            {editingSubjectId ? "Edit Subject" : "Add Subject"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
