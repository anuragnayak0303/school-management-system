import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function EditClassModal({ isOpen, onClose, classData, onSave }) {
  const [formData, setFormData] = useState({
    Classname: '',
    Student_Of_no: 0,
    status: '',
  });

  useEffect(() => {
    if (classData) {
      setFormData(classData);
    }
  }, [classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'Student_Of_no' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v2/class/update/${formData._id}`,
        formData
      );
      toast.success('Class updated!');
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400/40 via-blue-300/40 to-pink-400/40 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md relative animate-fade-in-up border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Edit Class</h2>

        {/* Class Name */}
        <div className="relative mb-6">
          <input
            type="text"
            name="Classname"
            value={formData.Classname}
            onChange={handleChange}
            className="peer w-full px-4 pt-5 pb-2 text-sm bg-white/70 backdrop-blur-md border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-transparent"
            placeholder="Class Name"
          />
          <label className="absolute left-4 top-2.5 text-gray-600 text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            Class Name
          </label>
        </div>

        {/* Number of Students */}
        <div className="relative mb-6">
          <input
            type="number"
            name="Student_Of_no"
            value={formData.Student_Of_no}
            onChange={handleChange}
            className="peer w-full px-4 pt-5 pb-2 text-sm bg-white/70 backdrop-blur-md border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-transparent"
            placeholder="Number of Students"
          />
          <label className="absolute left-4 top-2.5 text-gray-600 text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            Number of Students
          </label>
        </div>

        {/* Status */}
        <div className="relative mb-6">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 pt-5 pb-2 text-sm bg-white/70 backdrop-blur-md border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <label className="absolute left-4 top-2 text-gray-600 text-sm">
            Status
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
