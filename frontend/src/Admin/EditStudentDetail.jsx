import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudentDetail() {
    const { id } = useParams();
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [AllClass, setAllClass] = useState([]);
    const nav = useNavigate()

    const [formData, setFormData] = useState({
        admissionNumber: '',
        rollNumber: '',
        firstName: '',
        lastName: '',
        primaryContact: '',
        email: '',
        admissionDate: '',
        dateOfBirth: '',
        academicYear: '',
        class: '',
        status: '',
        gender: '',
        bloodGroup: '',
        religion: '',
        category: '',
        fatherName: '',
        fatherEmail: '',
        fatherPhone: '',
        fatherOccupation: '',
        motherName: '',
        motherEmail: '',
        motherPhone: '',
        motherOccupation: '',
    });

    useEffect(() => {
        axios.get(`https://school-management-system-1-jprf.onrender.com/api/v3/student/getById/${id}`).then(res => {
            const student = res.data;
            console.log(student)
            const [first, ...lastParts] = student.userId.name.split(' ');
            setFormData({
                admissionNumber: student.admissionNumber,
                rollNumber: student.rollNumber,
                firstName: first,
                lastName: lastParts.join(' '),
                primaryContact: student.primaryContact,
                email: student.userId.email,
                admissionDate: student.admissionDate.slice(0, 10),
                dateOfBirth: student.dateOfBirth.slice(0, 10),
                academicYear: student.academicYear,
                class: student.class._id,
                status: student.status,
                gender: student.gender,
                bloodGroup: student.bloodGroup,
                religion: student.religion,
                category: student.category,
                fatherName: student.father?.name || '',
                fatherEmail: student.father?.email || '',
                fatherPhone: student.father?.phone || '',
                fatherOccupation: student.father?.occupation || '',
                motherName: student.mother?.name || '',
                motherEmail: student.mother?.email || '',
                motherPhone: student.mother?.phone || '',
                motherOccupation: student.mother?.occupation || '',
            });

            if (student.userId.profileImage) {
                setPhotoPreview(`https://school-management-system-1-jprf.onrender.com/${student.userId.profileImage}`);
            }
        });

        axios.get('https://school-management-system-1-jprf.onrender.com/api/v2/class/all').then(res => setAllClass(res.data));
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        setPhotoFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }

        if (photoFile) {
            data.append('photo', photoFile);
        }

        try {
            await axios.put(`https://school-management-system-1-jprf.onrender.com/api/v3/student/update/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Student updated successfully!');
            nav(`/school/admin/all_student`)
        } catch (error) {
            console.error(error);
            toast.error('Update failed.');
        }
    };

    const dropdowns = [
        { name: 'class', label: 'Class', options: AllClass.map(c => ({ value: c._id, label: c.Classname })) },
        { name: 'status', label: 'Status', options: ['Active', 'Inactive'].map(s => ({ value: s, label: s })) },
        { name: 'gender', label: 'Gender', options: ['Male', 'Female'].map(g => ({ value: g, label: g })) },
        { name: 'bloodGroup', label: 'Blood Group', options: ['A+', 'B+', 'O+', 'AB+'].map(b => ({ value: b, label: b })) },
        { name: 'religion', label: 'Religion', options: ['Hindu', 'Muslim', 'Christian'].map(r => ({ value: r, label: r })) },
        { name: 'category', label: 'Category', options: ['General', 'OBC', 'SC', 'ST'].map(c => ({ value: c, label: c })) },
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
                <form onSubmit={handleSubmit} className="p-4 sm:p-10">
                    <div className="text-sm text-indigo-600 mb-4">Admin &gt; Edit Student</div>

                    {/* Section: Admission Info */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-gray-300">
                        <h1 className="text-2xl font-bold text-indigo-800 mb-6">Edit Student Details</h1>
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
                            {[
                                { name: 'admissionNumber', label: 'Admission Number' },
                                { name: 'rollNumber', label: 'Roll Number' },
                                { name: 'firstName', label: 'First Name' },
                                { name: 'lastName', label: 'Last Name' },
                                { name: 'primaryContact', label: 'Primary Contact' },
                                { name: 'email', label: 'Email', type: 'email' },
                                { name: 'admissionDate', label: 'Admission Date', type: 'date' },
                                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                                { name: 'academicYear', label: 'Academic Year' },
                            ].map(({ name, label, type }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        name={name}
                                        type={type || 'text'}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-400 outline-none shadow-sm"
                                        required
                                    />
                                </div>
                            ))}

                            {/* Dropdowns */}
                            {dropdowns.map(({ name, label, options }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <select
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring focus:ring-indigo-400 outline-none shadow-sm"
                                        required
                                    >
                                        <option value="">Select {label}</option>
                                        {options.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section: Parents Info */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Parents & Guardian Information</h2>
                        {parentFields.map(({ role, fields }) => (
                            <div key={role} className="mb-10">
                                <h3 className="text-lg font-semibold text-indigo-700 mb-4">{role}'s Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {fields.map(field => {
                                        const key = `${role.toLowerCase()}${field}`;
                                        return (
                                            <div key={key}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{`${role} ${field}`}</label>
                                                <input
                                                    name={key}
                                                    type={field.includes('Email') ? 'email' : 'text'}
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-400 outline-none shadow-sm"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 text-right">
                        <button
                            type="submit"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
