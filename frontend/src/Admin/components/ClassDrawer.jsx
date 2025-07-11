import React, { useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ClassDrawer({ isOpen, onClose, onSave }) {

    const [classData, setClassData] = useState({
        Classname: '',
        Student_Of_no: 0,
        status: "Active"
    })

    async function handleSaveClass() {
        try {
            const { data } = await axios.post(`https://school-management-system-1-jprf.onrender.com/api/v2/class/add`, classData)
            toast.success("Class Added Successfully")
            setTimeout(() => {
                setClassData({
                    Classname: '',
                    Student_Of_no: 0,
                    status: "Active"
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
            "fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-md transform transition-transform duration-500 ease-in-out z-50",
            {
                'translate-x-0': isOpen,
                'translate-x-full': !isOpen
            }
        )} style={{ perspective: '1200px' }}>
            <div className="flex flex-col h-full p-6 bg-gray-50">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 select-none" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
                        Add Class
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-700 hover:text-gray-900 text-3xl leading-none font-bold transition-transform duration-200 hover:scale-125 focus:outline-none"
                        aria-label="Close drawer"
                    >
                        &times;
                    </button>
                </div>

                {/* Form */}
                <div className="flex-1 space-y-8 overflow-y-auto">
                    {/* Class Name */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 select-none">Class Name</label>
                        <input
                            type="text"
                            name="Classname"
                            value={classData?.Classname}
                            placeholder="I, II, III..."
                            onChange={(e) => {
                                const romanRegex = /^(?=[MDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
                                const value = e.target.value.toUpperCase();
                                if (value === "" || romanRegex.test(value)) {
                                    setClassData({ ...classData, Classname: value });
                                } else {
                                    toast.error("Only valid Roman numerals allowed (e.g. I, II, III, IV...)");
                                }
                            }}
                            className="
                                w-full
                                px-4 py-3
                                rounded-lg
                                bg-gradient-to-tr from-white to-gray-100
                                border border-gray-300
                                shadow-[inset_3px_3px_6px_#d1d9e6, inset_-3px_-3px_6px_#ffffff]
                                focus:outline-none focus:ring-1 focus:ring-blue-300
                            
                                transition
                                duration-300
                                ease-in-out
                                "
                        />
                    </div>
                    {/* Status */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 select-none">Status</label>
                        <select
                            name="status"
                            value={classData?.status}
                            onChange={(e) => setClassData({ ...classData, status: e.target.value })}
                            className="
                                w-full
                                px-4 py-3
                                rounded-lg
                                bg-gradient-to-tr from-white to-gray-100
                                border border-gray-300
                                shadow-[3px_3px_6px_#d1d9e6, -3px_-3px_6px_#ffffff]
                                focus:outline-none focus:ring-1 focus:ring-blue-300
                                transition
                                duration-300
                                ease-in-out
                                cursor-pointer
                            "
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="pt-6 mt-auto flex space-x-4">
                    <button
                        className="flex-1 py-3 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-transform duration-200 hover:scale-105"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
                        onClick={handleSaveClass}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
