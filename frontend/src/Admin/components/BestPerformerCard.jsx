import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const performers = [
  {
    name: "George Odell",
    role: "English Teacher",
    img: "https://img.freepik.com/premium-photo/smiling-afro-man-student-casual-outfit-holding-laptop-notebooks-isolated-background_171337-15096.jpg?w=360",
    score: "98%",
  },
  {
    name: "Lisa Brown",
    role: "Math Teacher",
    img: "https://img.freepik.com/premium-photo/beautiful-happy-smiling-young-woman-white-background_380164-61.jpg?w=360",
    score: "96%",
  },
  {
    name: "Aarav Singh",
    role: "Science Teacher",
    img: "https://img.freepik.com/free-photo/portrait-handsome-bearded-indian-man_53876-176754.jpg?w=360",
    score: "97%",
  },
];

export default function BestPerformerCard() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="w-[200px] lg:w-[169px] h-full bg-green-500 text-white rounded p-4 shadow-md flex flex-col justify-between items-center">
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
          {performers.map((person, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="text-center">
                  <p className="font-semibold text-sm">Best Performer</p>
                  <h2 className="text-lg font-bold">{person.name}</h2>
                  <p className="text-xs">{person.role}</p>
                </div>
                <div className="relative mt-3 mb-3">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="rounded-full w-24 h-24 object-cover"
                  />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white text-black px-2 py-1 rounded-full text-xs font-semibold">
                    {person.score}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-3 mt-2">
        <button
          ref={prevRef}
          className="bg-white text-green-600 w-6 h-6 flex justify-center items-center rounded-full text-xs font-bold"
        >
          <FaAngleLeft />
        </button>
        <button
          ref={nextRef}
          className="bg-white text-green-600 w-6 h-6 flex justify-center items-center rounded-full text-xs font-bold"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}
