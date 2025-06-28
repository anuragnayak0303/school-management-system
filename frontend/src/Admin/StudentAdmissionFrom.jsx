import React, { useRef, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StudentAdmissionForm() {
  const formRef = useRef();
  const rollNumberRef = useRef(); // ➕ Roll number input ref
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

  // ➕ New: Auto-fill roll number when class is selected
  const handleClassChange = async (e) => {
    const classId = e.target.value;
    const form = formRef.current;

    if (!classId) return;

    try {
      const { data } = await axios.get(`http://localhost:8000/api/v2/class/student_no/${classId}`);
      const nextRoll = data.Student_Of_no + 1;
      const formattedRoll = nextRoll < 10 ? `0${nextRoll}` : `${nextRoll}`;

      if (form) {
        form.rollNumber.value = formattedRoll;
        rollNumberRef.current?.focus();
      }
    } catch (err) {
      console.error('Error fetching student count:', err);
      toast.error('Unable to auto-generate roll number.');
    }
  };

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
    { name: 'academicYear', label: 'Academic Year' },
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
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <Toaster />
      <Sidebar />
      <main className="w-full md:ml-64">
        <MainHeader />
        <form ref={formRef} onSubmit={handleSubmit} className="p-4 sm:p-10">
          <div className="text-sm text-indigo-600 mb-4">Admin &gt; Student</div>

          {/* Admission Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-gray-300">
            <h1 className="text-2xl font-bold text-indigo-800 mb-6">Student Admission Form</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passport Size Photo</label>
                <label
                  htmlFor="photo"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 ease-in-out cursor-pointer mx-auto"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-full border shadow-md" />
                  ) : (
                    <div className="text-center text-indigo-600 text-xs">
                      <svg className="w-6 h-6 mb-1 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0l4 4m-4-4l-4 4m10 12v-4m0 0l4 4m-4-4l-4 4" />
                      </svg>
                      <p className="font-semibold">Upload</p>
                      <p className="text-gray-500">Max 2MB</p>
                    </div>
                  )}
                  <input type="file" name="photo" id="photo" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>

              {/* Text Inputs */}
              {textInputs.map(({ name, label }, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    name={name}
                    type={name === 'email' ? 'email' : 'text'}
                    ref={name === 'rollNumber' ? rollNumberRef : null}
                    maxLength={name === 'primaryContact' ? 10 : undefined}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-400 outline-none shadow-sm"
                    required
                  />
                </div>
              ))}

              {/* Date Inputs */}
              {dateInputs.map(({ name, label }, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    name={name}
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-400 outline-none shadow-sm text-gray-700"
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
                    onChange={name === 'class' ? handleClassChange : undefined}

                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring focus:ring-indigo-400 outline-none shadow-sm"
                    required
                  >
                    <option value="">Select {label}</option>
                    {options.map((option, j) => (
                      <option  key={j} value={label === 'Class' ? option._id : option}>
                        {label === 'Class' ? option?.Classname : option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Info */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
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
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-400 outline-none shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="mt-4 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md"
            >
              Submit Admission
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
