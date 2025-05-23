import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { Sidebar } from 'lucide-react';
import MainHeader from '../components/MainHeader';

export default function ERTlist() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ert/entries');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      sorter: (a, b) => a.studentName.localeCompare(b.studentName),
    },
    {
      title: 'Father Name',
      dataIndex: 'fatherName',
      key: 'fatherName',
      sorter: (a, b) => a.fatherName.localeCompare(b.fatherName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: 'WhatsApp',
      dataIndex: 'whatsapp',
      key: 'whatsapp',
      sorter: (a, b) => a.whatsapp.localeCompare(b.whatsapp),
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
    },
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
      sorter: (a, b) => a.schoolName.localeCompare(b.schoolName),
    },
    {
      title: 'Current Class',
      dataIndex: 'currentClass',
      key: 'currentClass',
      sorter: (a, b) => a.currentClass - b.currentClass,
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: 'Pincode',
      dataIndex: 'pincode',
      key: 'pincode',
      sorter: (a, b) => a.pincode - b.pincode,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="md:ml-64 w-full min-h-screen bg-gray-50">
        <MainHeader />
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-3">
            Admin &gt; <span className="font-medium text-gray-700">Students</span>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">All Students</h1>
          </div>

          <Table
            columns={columns}
            dataSource={students}
            rowKey="email"
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ x: 'max-content' }}
          />
        </div>
      </main>
    </div>
  );
}
