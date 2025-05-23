import React, { useRef, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StudentAdmissionForm() {
  const formRef = useRef();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [AllClass, setAllClass] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);

    const photoFile = form.photo?.files[0];
    if (photoFile) {
      formData.set('photo', photoFile);
    }

    try {
      const res = await axios.post('http://localhost:8000/api/v3/student/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Admission submitted successfully!');
      form.reset();
      setPhotoPreview(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit admission.');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getClasses = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/v2/class/all');
      setAllClass(data);
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const textInputs = [
    { name: 'admissionNumber', label: 'Admission Number' },
    { name: 'rollNumber', label: 'Roll Number' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'primaryContact', label: 'Primary Contact Number' },
    { name: 'email', label: 'Email Address' },

  ];

  const dateInputs = [
    { name: 'admissionDate', label: 'Admission Date' },
    { name: 'dateOfBirth', label: 'Date of Birth' },
    { name: 'academicYear', label: 'Academic Year', },
  ];

  const dropdowns = [
    { name: 'class', label: 'Class', options: AllClass },
    { name: 'status', label: 'Status', options: ['Active', 'Inactive'] },
    { name: 'gender', label: 'Gender', options: ['Male', 'Female'] },
    { name: 'bloodGroup', label: 'Blood Group', options: ['A+', 'B+', 'O+', 'AB+'] },
    { name: 'religion', label: 'Religion', options: ['Hindu', 'Muslim', 'Christian'] },
    { name: 'category', label: 'Category', options: ['General', 'OBC', 'SC', 'ST'] },
  ];

  const parentFields = [
    { role: 'Father', fields: ['Name', 'Email', 'Phone', 'Occupation'] },
    { role: 'Mother', fields: ['Name', 'Email', 'Phone', 'Occupation'] },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster />
      <Sidebar />
      <main className="md:ml-64 w-full">
        <MainHeader />
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-10">
          <div className="text-sm text-indigo-600 mb-4">Admin &gt; Student</div>
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-extrabold text-indigo-800 mb-8">Student Admission Form</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Photo Upload */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                <label
                  htmlFor="photo"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-full border" />
                  ) : (
                    <div className="text-center">
                      <svg className="w-10 h-10 text-indigo-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0l4 4m-4-4l-4 4m10 12v-4m0 0l4 4m-4-4l-4 4" />
                      </svg>
                      <p className="text-sm font-semibold text-indigo-600">Click to upload</p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 2MB)</p>
                    </div>
                  )}
                  <input type="file" name="photo" id="photo" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>

              {/* Text Fields */}
              {textInputs.map(({ name, label }, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    name={name}
                    type={name == 'email' ? 'email' :'text'}
                    maxLength={name == 'primaryContact' ? 10 : ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              ))}

              {/* Date Fields */}
              {dateInputs.map(({ name, label }, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    name={name}
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              ))}

              {/* Dropdowns */}
              {dropdowns.map(({ name, label, options }, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <select
                    name={name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="">Select {label}</option>
                    {options.map((option, j) => (
                      <option key={j} value={label === 'Class' ? option._id : option}>
                        {label === 'Class' ? option?.Classname : option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Parents Info */}
          <div className="mt-10 bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Parents & Guardian Information</h2>
            {parentFields.map(({ role, fields }, i) => (
              <div key={i} className="mb-10">
                <h3 className="text-lg font-semibold text-indigo-700 mb-4">{role}'s Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {fields.map((field, j) => (
                    <div key={j}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {role} {field}
                      </label>
                      <input
                        type="text"
                        name={`${role.toLowerCase()}${field}`}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full sm:w-auto mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
            >
              Submit Admission
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
