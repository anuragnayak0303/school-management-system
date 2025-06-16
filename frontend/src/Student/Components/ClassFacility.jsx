import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";

const teachers = [
  { name: 'Teresa', subject: 'Math', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-01.jpg' },
  { name: 'Daniel', subject: 'Science', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-02.jpg' },
  { name: 'Sophia', subject: 'English', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-03.jpg' },
  { name: 'Michael', subject: 'History', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-04.jpg' },
  { name: 'Emily', subject: 'Biology', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-05.jpg' },
  { name: 'John', subject: 'Physics', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-06.jpg' },
];

export default function ClassFacility() {
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
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={4}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {teachers.map((teacher, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[100px] border bg-gray-50 shadow rounded border-gray-300 px-4 py-2 flex flex-col justify-between">
                <div className="flex items-end space-x-2.5">
                  <img src={teacher.img} alt={teacher.name} className="w-[40px] h-[40px] rounded" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">{teacher.name}</p>
                    <p className="text-sm text-gray-500 font-semibold">{teacher.subject}</p>
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
          ))}
        </Swiper>
      </div>
    </div>
  );
}
