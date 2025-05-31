import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUserEdit } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
export default function SyllabusCarousel() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const doughnutData = {
        datasets: [
            {
                data: [90, 10],
                backgroundColor: ["#008631", "#EF4444"],
                borderWidth: 1,
                cutout: "60%",
            },
        ],
    };
    return (
        <div className=" h-auto py-3.5">
            <div className='mt-20'>
                <Slider {...settings}>

                    {
                        [1, 2, 3, 4, 5, 6, 7].map(() => (<div className="w-60 h-60 shadow-xl bg-white rounded ">
                            <div className="w-full h-[8vh] border-b border-b-gray-300 flex justify-between items-center pt-2.5 pb-1.5 px-2.5">
                                <h1 className=" uppercase font-semibold text-blue-700 text-sm">class iv</h1>
                                <p className=" uppercase text-red-400 font-semibold text-sm">English</p>
                                <FaUserEdit className=" text-green-600 text-lg cursor-pointer" />
                            </div>

                            <h1 className="text-center uppercase text-sm font-semibold font-sans tracking-widest  mt-1">Syllabus status</h1>
                            <div className="flex flex-col justify-center items-center ">
                                <div className="sm:w-[130px]">
                                    <Doughnut data={doughnutData} options={{ cutout: "60%" }} />
                                </div>
                                <ul className="flex text-sm justify-around mt-1.5 w-full" >
                                    <li className="text-green-700 font-semibold">Complete : <span>90%</span></li>

                                    <li className="text-red-600 font-semibold">pending : <span>10%</span></li>
                                </ul>
                            </div>
                        </div>))
                    }
                </Slider>
            </div>
        </div>
    )
}
