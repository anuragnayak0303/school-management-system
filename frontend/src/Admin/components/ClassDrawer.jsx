import React, { useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ClassDrawer({ isOpen, onClose, onSave }) {

    const [classData, setClassData] = useState({
        Classname: '',
        Student_Of_no: 0,
        status: ""
    })

    async function handleSaveClass() {

        try {
            const { data } = await axios.post(`http://localhost:8000/api/v2/class/add`, classData)
            toast.success("Class Add Sucessfully")
            setTimeout(() => {
                setClassData({
                    Classname: '',
                    Student_Of_no: 0,
                    status: ""
                })
                onClose(false)
                onSave()
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={classNames(
            "fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50",
            {
                'translate-x-0': isOpen,
                'translate-x-full': !isOpen
            }
        )}>
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add Class
                    </h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-lg">×</button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Class Name</label>
                        <input
                            type="text"
                            className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name='Classname'
                            value={classData?.Classname}
                            onChange={(e) => setClassData({ ...classData, Classname: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Students</label>
                        <input
                            type="Student_Of_no"
                            className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={classData?.Student_Of_no}
                            onChange={(e) =>
                                setClassData({ ...classData, Student_Of_no: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name='status'
                            value={classData?.status}
                            onChange={(e) => setClassData({ ...classData, status: e.target.value })}
                        >
                            <option >select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 mt-auto flex justify-between space-x-2">
                    <button
                        className="flex-1 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleSaveClass}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
