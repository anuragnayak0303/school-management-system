import React, { useState, useEffect } from 'react';
import { FaFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FiChevronDown } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Homepage = () => {
  const navItems = [
    { label: "HOME", path: "/" },
    {
      label: "ABOUT US",
      submenu: [
        "Mission and Vision",
        "Principal Message",
        "Campus Infrastructure",
        "Eminent Visitors"
      ]
    },
    {
      label: "ADMISSIONS",
      submenu: ["Admissions Enquiry"]
    },
    {
      label: "ACADEMICS",
      submenu: ["Brochure", "Campus Infrastructure"]
    },
    {
      label: "OTHER LINKS",
      submenu: ["Registration for ERT"]
    },
    {
      label: "NEWS & EVENTS",
      submenu: ["Latest News", "Events"]
    },
    { label: "CONTACT US", path: "/contact-us" }
  ];

  const sliderImages = [
    "https://images.pexels.com/photos/16044585/pexels-photo-16044585/free-photo-of-building-facade-dallas-college-richland-campus-dallas-texas-usa.jpeg",
    "https://images.pexels.com/photos/31056502/pexels-photo-31056502/free-photo-of-university-of-miami-college-of-arts-sciences-entrance.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/31039040/pexels-photo-31039040/free-photo-of-vibrant-university-campus-setting-in-florida.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full font-sans">
      {/* Top Contact Bar */}
      <div className="bg-white text-center text-sm py-4 px-10 flex justify-between items-center border-b border-gray-300">
        <div className="flex space-x-4 text-gray-700">
          <FaFacebook className='text-2xl' />
          <FaSquareXTwitter className='text-2xl' />
          <FaSquareInstagram className='text-2xl' />
        </div>
        <div className="text-blue-900 text-xl font-semibold text-center">
          Empowering Minds, Inspiring Futures · Est 2002
        </div>
        <div className="flex space-x-4 text-sm text-gray-700">
          <span>📞 +91 954 954 9195</span>
          <span>📧 admissions@dpssoyla.com</span>
        </div>
      </div>

      {/* Logo and Admission Button */}
      <div className="flex items-center justify-between px-20 py-6 bg-white shadow-sm">
        <div className='flex items-center gap-12'>
          <div>
            <h1 className="text-4xl font-bold text-blue-900">DUNDLOD PUBLIC SCHOOL</h1>
            <p className="text-green-600 text-3xl font-semibold -mt-1">SOYLA</p>
          </div>
          <img
            src="https://www.dpssoyla.com/wp-content/uploads/2025/01/500X500.png"
            alt="DPS Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
        <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md text-base font-semibold">
          ADMISSION
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-10 py-6 flex justify-between items-center text-base font-medium">
          {navItems.map((item) => (
            <div key={item.label} className="relative group px-2">
              <NavLink
                to={item.path || "#"}
                className={({ isActive }) =>
                  `flex items-center space-x-1 transition-colors duration-200 ${
                    isActive ? "text-yellow-300" : "text-white hover:text-yellow-300"
                  }`
                }
              >
                <span>{item.label}</span>
                {item.submenu && <FiChevronDown className="text-sm mt-1" />}
              </NavLink>

              {/* Bottom border on hover */}
              <span className="absolute -bottom-[23px] left-0 h-[3px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>

              {/* Dropdown Menu */}
              {item.submenu && (
                <div className="absolute top-[100%] left-0 mt-2 bg-white text-blue-900 rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 translate-y-2">
                  <ul className="w-56 py-2">
                    {item.submenu.map((subItem, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-5 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                        >
                          {subItem}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Marquee Announcement */}
      <div className="relative bg-[#00000096] text-white text-lg font-bold py-2 overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-content">
            ADMISSIONS OPEN FOR NURSERY TO CLASS VIII FOR SESSION 2025-26.&nbsp;&nbsp;&nbsp;
            ADMISSIONS OPEN FOR NURSERY TO CLASS VIII FOR SESSION 2025-26.&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="relative w-full overflow-hidden h-[500px]">
        {sliderImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className={`w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
        >
          ‹
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
        >
          ›
        </button>
      </div>
    </header>
  );
};

export default Homepage;
