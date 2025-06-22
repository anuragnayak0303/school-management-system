import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const students = [
  {
    name: "Michael",
    class: "XII, B",
    image:
      "https://img.freepik.com/premium-photo/portrait-handsome-man-casual-clothing-posing_171337-16899.jpg?w=360",
  },
  {
    name: "Sophia",
    class: "XI, A",
    image:
      "https://img.freepik.com/premium-photo/portrait-beautiful-indian-girl-traditional-attire_756748-28.jpg?w=360",
  },
  {
    name: "Ravi",
    class: "X, C",
    image:
      "https://img.freepik.com/free-photo/portrait-smiling-handsome-man-eyeglasses_171337-4842.jpg?w=360",
  },
];

export default function StarStudentCard() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true); // Trigger after first render
  }, []);

  return (
    <div className="w-[200px] lg:w-[169px] h-full bg-blue-600 text-white rounded p-4 shadow-md flex flex-col justify-between items-center">
      {swiperReady && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          loop={true}
          className="w-full h-full flex flex-col justify-between"
        >
          {students.map((student, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="text-center">
                  <p className="font-semibold text-sm">Star Students</p>
                  <h2 className="text-lg font-bold">{student.name}</h2>
                  <p className="text-xs">{student.class}</p>
                </div>
                <div className="relative mt-3 mb-3">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Custom Navigation Buttons */}
      <div className="flex justify-center gap-3 mt-2">
        <button
          ref={prevRef}
          className="bg-white text-blue-600 w-6 h-6 flex justify-center items-center rounded-full text-xs font-bold"
        >
          <FaAngleLeft />
        </button>
        <button
          ref={nextRef}
          className="bg-white text-blue-600 w-6 h-6 flex justify-center items-center rounded-full text-xs font-bold"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}
