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

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const handleAddClass = () => {
        setIsDrawerOpen(true)
    }
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false)
        // setClassData(null)
    }
     const getClasses = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/class/all`)
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
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Classes</div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">All Class Management</h1>
                        <button
                            onClick={handleAddClass}
                            className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            Add Class
                        </button>
                    </div>

                    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-700">
                                {AllClasses.map((cls) => (
                                    <tr key={cls._id}>
                                        <td className="px-6 py-4 font-medium text-gray-900">{cls?.Classname}</td>
                                        <td className="px-6 py-4">{cls?.Student_Of_no}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls?.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {cls.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-900 text-sm"
                                                onClick={() => {
                                                    setEditingClass(cls);
                                                    setIsEditModalOpen(true);
                                                }}
                                            >
                                                <FiEdit className='text-xl' />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 text-sm">
                                                <MdDelete className='text-xl' onClick={async () => {
                                                    if (confirm("Are your Sure To Delete")) {
                                                        try {
                                                            const { data } = await axios.delete(`http://localhost:8000/api/v2/class/delete/${cls._id}`)
                                                            toast.success("Delete SucessFully")
                                                            getClasses()
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }
                                                }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Slide-in Drawer for Add/Edit */}
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
