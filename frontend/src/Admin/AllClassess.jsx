import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MainHeader from '../components/MainHeader'
import ClassDrawer from './components/ClassDrawer'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from "react-icons/md";
import EditClassModal from './components/EditClassModal'

export default function AllClassess() {
    const [AllClasses, setAllClasses] = useState([])
    const [editingClass, setEditingClass] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [IsError, setIsError] = useState('')

    const handleAddClass = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);

    const getClasses = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v2/class/all`)
            setAllClasses(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClasses()
    }, [])

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <Toaster />
            <main className="md:ml-64 w-full min-h-screen bg-gray-50">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Classes</div>
                    {
                        IsError && <>
                            <div className="flex items-center w-full gap-4 px-4 mb-3.5 py-3 text-sm text-pink-500 border border-pink-100 rounded bg-pink-50" role="alert">
                                <p className="flex-1 truncate">{IsError}</p>
                                <button onClick={() => setIsError('')} aria-label="Close" className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-pink-500 transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-200 focus:text-pink-700 disabled:cursor-not-allowed disabled:text-pink-300 disabled:shadow-none disabled:hover:bg-transparent">
                                    <span className="relative only:-mx-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-19 desc-19">
                                            <title id="title-19">Icon title</title>
                                            <desc id="desc-19">
                                                A more detailed description of the icon
                                            </desc>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </>
                    }
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow border border-gray-200">
                        <h1 className="text-xl font-bold text-gray-800">All Class Management</h1>
                        <button
                            onClick={handleAddClass}
                            className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            Add Class
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {AllClasses.map((cls) => (
                            <div
                                key={cls._id}
                                className="bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
                            >
                                <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-300">
                                    <h2 className="text-lg font-semibold text-gray-800">Class {cls?.Classname}</h2>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingClass(cls);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FiEdit className="text-xl" />
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (confirm("Are you sure you want to delete this class?")) {
                                                    try {
                                                        const { data } = await axios.delete(`https://school-management-system-1-jprf.onrender.com/api/v2/class/delete/${cls._id}`);
                                                        if (data?.success) {
                                                            toast.success(data?.message);
                                                            getClasses();
                                                        } else {
                                                            toast(data?.message)
                                                        }

                                                    } catch (error) {
                                                        if (error?.response?.data?.message) {
                                                            setIsError(error?.response?.data?.message)
                                                            setTimeout(() => {
                                                                setIsError('')
                                                            }, 4000);
                                                        }
                                                    }
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <MdDelete className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between px-4 py-6'>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p><strong>Students:</strong> {cls?.Student_Of_no}</p>
                                        {/* <p><strong>Students:</strong> {cls?._id}</p> */}
                                        <p><strong>Subject:</strong> {cls?.Subjects?.length || 0}</p>
                                    </div>
                                    <div className="mt-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${cls?.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {cls?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ClassDrawer
                        isOpen={isDrawerOpen}
                        onClose={handleCloseDrawer}
                        onSave={getClasses}
                    />
                    <EditClassModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        classData={editingClass}
                        onSave={getClasses}
                    />
                </div>
            </main>
        </div>
    )
}
