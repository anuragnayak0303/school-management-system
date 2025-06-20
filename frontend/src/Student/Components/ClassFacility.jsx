import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { AuthStudentContext } from '../../context/StudentAuth';
import axios from 'axios';
import { useAuth } from '../../context/auth';

export default function ClassFacility() {
  const { auth } = useAuth();
  const { student } = useContext(AuthStudentContext);
  const [Subject, setSubject] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const GetSubject = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v2/subject/ClassId/${student?.class?._id}`);
      setSubject(data);
      const ids = data.map(subject => subject._id);
      setSubjectIds(ids);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTeachersBySubjects = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/v2/subject/by-subjects", {
        subjectIds,
      });
      setTeachers(data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  useEffect(() => {
    if (student?.class?._id) GetSubject();
  }, [student, auth]);

  useEffect(() => {
    if (subjectIds.length > 0) fetchTeachersBySubjects();
  }, [subjectIds]);

  const getTeacherBySubjectId = (subjectId) => {
    return teachers.find(teacher =>
      teacher.subject.some(s => s._id === subjectId)
    );
  };

  return (
    <div className="w-full bg-white shadow-md border border-gray-300 rounded overflow-hidden">
      {/* Header */}
      <div className="w-full h-[45px] border-b border-gray-300 flex justify-between items-center px-5">
        <h1 className="font-semibold text-gray-700">Class Faculties</h1>
        <div className="w-28 flex items-center justify-end space-x-1.5">
          <div className="swiper-button-prev-custom w-5 h-5 border border-gray-400 rounded-full shadow flex justify-center items-center cursor-pointer transition transform active:scale-90 hover:bg-gray-100">
            <FaAngleLeft className="text-sm text-gray-500" />
          </div>
          <div className="swiper-button-next-custom w-5 h-5 border border-gray-400 rounded-full shadow flex justify-center items-center cursor-pointer transition transform active:scale-90 hover:bg-gray-100">
            <FaChevronRight className="text-sm text-gray-500" />
          </div>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full px-3 py-3">
        {teachers.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No teachers assigned yet.</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={Math.min(Subject.length, 4)}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            loop={Subject.length > 4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {Subject.map((subject, index) => {
              const teacher = getTeacherBySubjectId(subject._id);
              const teacherImg = teacher?.userId?.profileImage;
              const teacherName = teacher?.userId?.name || "Teacher";
              const shortSubjectName =
                subject.subjectName?.length > 13
                  ? subject.subjectName.slice(0, 13) + "..."
                  : subject.subjectName;

              return (
                <SwiperSlide key={index}>
                  <div className="w-full h-[100px] border bg-gray-50 shadow rounded border-gray-300 px-4 py-2 flex flex-col justify-between">
                    <div className="flex items-end space-x-2.5">
                      <img
                        src={teacherImg ? `http://localhost:8000/${teacherImg}` : "https://avatar.iran.liara.run/public/44"}
                        alt={teacherName}
                        className="w-[40px] h-[40px] rounded object-cover"
                      />
                      <div className="space-y-0.5">
                        <p
                          className="text-sm font-semibold"
                          title={subject.subjectName}
                        >
                          {shortSubjectName}
                        </p>
                        <p className="text-sm text-gray-500 font-semibold">
                          {teacherName}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-[12px] font-semibold w-24 rounded h-7 border border-gray-300 bg-white transition transform hover:bg-gray-100 active:scale-95">
                        Email
                      </button>
                      <button className="text-[12px] font-semibold w-24 rounded h-7 border border-gray-300 bg-white transition transform hover:bg-gray-100 active:scale-95">
                        Chat
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
}
