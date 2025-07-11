import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from './auth';
import axios from 'axios';

export const AuthStudentContext = createContext();

export default function StudentAuth({ children }) {
  const { auth } = useAuth();
  const [student, setStudent] = useState({});

  const getData = async () => {
    try {
      const { data } = await axios.get('https://school-management-system-1-jprf.onrender.com/api/v3/student/getById', {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(data)
      setStudent(data); // ✅ Store the student data
    } catch (error) {
      console.error('Student fetch error:', error);
    }
  };

  useEffect(() => {
    if (auth?.token) getData(); // ✅ Ensure token exists before request
  }, [auth]);

  return (
    <AuthStudentContext.Provider value={{ student }}>
      {children}
    </AuthStudentContext.Provider>
  );
}
