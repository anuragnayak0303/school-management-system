import React, { useState, useEffect } from 'react';
import { FaFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FiChevronDown } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Footer from './Footer';
import Header from './Header';
import axios from 'axios';
import { motion } from 'framer-motion';

const Homepage = () => {
  const Naviget = useNavigate();
  const values = [
    {
      title: "VISION",
      img: "https://www.dpssoyla.com/wp-content/uploads/2025/01/DSC_0003-300x200.jpg",
      desc: "Dundlod Public School aspires to be a centre of excellence in education.",
      hoverDir: "Dundlod Public School aspires to inspire excellence and empower students..."
    },
    {
      title: "VALUE",
      img: "https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-51-300x200.jpg",
      desc: "We are dedicated to upholding five core values that shape our school culture.",
      hoverDir: "We are dedicated to upholding five core values: Respect, Honesty, Compassion..."
    },
    {
      title: "AIM",
      img: "https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-416-300x200.webp",
      desc: "Dundlod Public School offers a stimulating environment to prepare students.",
      hoverDir: "Dundlod Public School offers holistic education..."
    }
  ];

  const [marqueeText, setmarqueeText] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "https://images.pexels.com/photos/16044585/pexels-photo-16044585/free-photo-of-building-facade-dallas-college-richland-campus-dallas-texas-usa.jpeg",
    "https://images.pexels.com/photos/31056502/pexels-photo-31056502/free-photo-of-university-of-miami-college-of-arts-sciences-entrance.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/31039040/pexels-photo-31039040/free-photo-of-vibrant-university-campus-setting-in-florida.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  ];

  const getMarquee = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/marquee/get`);
      setmarqueeText(data);
      console.log(data?.text);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarquee();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <>
      <header className="w-full font-sans">
        <Header />



        <div className="relative w-full overflow-hidden mt-[px] h-[250px] sm:h-[400px] md:h-[500px]">
          <marquee className="w-full absolute z-40 overflow-hidden whitespace-nowrap bg-[#00001157] text-white py-2 text-sm sm:text-base">
            <div className="inline-block text-xl font-semibold animate-marquee px-4">
              {marqueeText.text}
            </div>
          </marquee>
          {sliderImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className={`w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
          ))}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xl sm:text-2xl w-10 sm:w-14 h-10 sm:h-14 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl sm:text-2xl w-10 sm:w-14 h-10 sm:h-14 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
          >
            <IoIosArrowForward />
          </button>
        </div>

        <motion.section
          className="text-center py-12 px-4 sm:px-6 md:px-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 border-b-2 inline-block border-gray-400">
            Welcome To DPS
          </h2>
          <p className="text-gray-700 max-w-6xl mx-auto text-base sm:text-lg leading-relaxed my-6">
            At <span className="font-semibold text-blue-800">Dundlod Public School</span>, our aim is to provide a holistic education that nurtures every aspect of a child’s development...
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-md bg-white group flex flex-col justify-between h-full hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={item.img} alt={item.title} className="w-full h-48 sm:h-64 object-cover" />
                <div className="p-4 sm:p-6 flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.hoverDir}</p>
                </div>
                <div className='py-3 flex justify-center'>
                  <button className='bg-blue-900 text-white font-semibold hover:bg-emerald-500 transition-all px-4 py-2 rounded-md text-sm sm:text-base hover:scale-105'>
                    EXPLORE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-0">
            <img src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-full h-full object-cover' />
          </div>

          <div className="relative z-10 text-center w-full px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">What's Next?</h2>
            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-evenly items-center w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button onClick={() => Naviget(`/contact-us`)} className="bg-blue-800 text-white px-8 py-3 text-base rounded hover:bg-blue-900 transition-all hover:scale-105 w-full sm:w-auto">
                Enquiry
              </button>
              <button onClick={() => Naviget(`/admissions-enquiry`)} className="bg-blue-800 text-white px-8 py-3 text-base rounded hover:bg-blue-900 transition-all hover:scale-105 w-full sm:w-auto">
                Admissions
              </button>
              <button onClick={() => Naviget(`/registration-for-ert`)} className="bg-blue-800 text-white px-8 py-3 text-base rounded hover:bg-blue-900 transition-all hover:scale-105 w-full sm:w-auto">
                ERT Registration
              </button>
            </motion.div>
          </div>
        </motion.section>

        <Footer />
      </header>
    </>
  );
};

export default Homepage;
