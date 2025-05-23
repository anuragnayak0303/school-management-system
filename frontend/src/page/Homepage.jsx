import React, { useState, useEffect } from 'react';
import { FaFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FiChevronDown } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Footer from './Footer';
import Header from './Header';

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
  const values = [
    {
      title: "VISION",
      img: "https://www.dpssoyla.com/wp-content/uploads/2025/01/DSC_0003-300x200.jpg", // replace with actual hosted image or asset path
      desc: "Dundlod Public School aspires to be a centre of excellence in education.",
      hoverDir: "Dundlod Public School aspires to inspire excellence and empower students, fostering transformative learning through innovative teaching, a nurturing environment, and a commitment to holistic development, unlocking every student's full potential"
    },
    {
      title: "VALUE",
      img: "https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-51-300x200.jpg",
      desc: "We are dedicated to upholding five core values that shape our school culture.",
      hoverDir: "We are dedicated to upholding five core values: Respect, Honesty, Compassion, Fairness, and Responsibility (RHCFR), fostering trust, ethical practices, empathy, equity, and accountability in all aspects of our work."
    },
    {
      title: "AIM",
      img: "https://www.dpssoyla.com/wp-content/uploads/2025/01/Gallery-image-416-300x200.webp",
      desc: "Dundlod Public School offers a stimulating environment to prepare students.",
      hoverDir: "Dundlod Public School offers holistic education, fostering academic, social, emotional, and physical growth, inspiring lifelong learning, and equipping students with skills to thrive in a dynamic, ever-changing world."
    }
  ];


  const sliderImages = [
    "https://images.pexels.com/photos/16044585/pexels-photo-16044585/free-photo-of-building-facade-dallas-college-richland-campus-dallas-texas-usa.jpeg",
    "https://images.pexels.com/photos/31056502/pexels-photo-31056502/free-photo-of-university-of-miami-college-of-arts-sciences-entrance.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/31039040/pexels-photo-31039040/free-photo-of-vibrant-university-campus-setting-in-florida.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     nextSlide();
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setShowNavbar(true);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>
      <header className="w-full font-sans">
        {/* Top Contact Bar */}
        <Header />
        {/* ✅ Fixed Marquee Section */}
        <div className="w-full overflow-hidden whitespace-nowrap bg-[#00001157] text-white py-2">
          <div className="inline-block animate-marquee px-4">
            ADMISSIONS OPEN FOR NURSERY TO CLASS VIII FOR SESSION 2025-26.&nbsp;&nbsp;&nbsp;
            ADMISSIONS OPEN FOR NURSERY TO CLASS VIII FOR SESSION 2025-26.&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* Banner Slider */}
        <div className="relative w-full overflow-hidden mt-[1px] h-[500px]">
          {sliderImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className={`w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            />
          ))}

          <button
            onClick={prevSlide}
            className="absolute top-1/2 flex justify-center items-center left-4 text-2xl w-14 h-14 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
          >

            <IoIosArrowBack />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 flex justify-center items-center right-4 text-2xl w-14 h-14 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
          >

            <IoIosArrowForward />
          </button>
        </div>

        <section className="text-center py-12 px-6 md:px-16">
          <h2 className="text-3xl font-bold mb-4 border-b-2 inline-block border-gray-400">
            Welcome To DPS
          </h2>
          <p className="text-gray-700 max-w-6xl mx-auto text-lg leading-relaxed my-6">
            At <span className="font-semibold text-blue-800">Dundlod Public School</span>, our aim is to provide a holistic education that nurtures every aspect of a child’s development—
            academically, socially, emotionally, and physically. We strive to create a learning environment where students are encouraged to
            reach their highest potential, cultivate a lifelong love for learning, and develop the skills needed to succeed in an ever-evolving world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {values.map((item, idx) => (
              <div
                key={idx}
                className={`border relative  rounded-lg overflow-hidden shadow-md transform transition duration-500 ${item.hoverDir} hover:shadow-xl bg-white group`}
              >
                <img src={item.img} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-6 py-9">
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xl ">{item.hoverDir}</p>
                </div>

                <div className=' w-full py-3'>
                  <button className='w-auto bg-blue-900 text-white font-semibold cursor-pointer hover:bg-emerald-500  transition-colors h-auto px-4 py-2 max-w-xs rounded-md'>EXPLOER</button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* <section className="py-16 px-4 md:px-16 bg-white text-center ">
          <div className='w-full flex justify-center items-center'>
            <div className='w-auto h-20 max-w-sm px-8 py-5 rounded-md   mb-4 bg-blue-900 flex justify-center items-center'>
              <h2 className="text-3xl font-bold text-white ">Eminent Visitors</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eminentVisitors.map((visitor, index) => (
              <div
                key={index}
                className="bg-white border relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={visitor.img}
                  alt={visitor.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="bg-[#00001191]  absolute bottom-0 w-full text-white text-sm ">
                  <h3 className=" text-start">{visitor.name}</h3>
                  <p className="text-[10px] text-start">{visitor.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}


        <section
          className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center  "
        >
          <div className="absolute bacgroundImageAdd inset-0 bg-white bg-opacity-60">
            <img src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-full h-[80vh]' />
          </div>

          <div className="relative z-10 text-center w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
              What's Next?
            </h2>
            <div className=" w-full  flex justify-evenly ">
              <button className="bg-blue-800 text-white px-8 py-3 text-lg rounded hover:bg-blue-900 transition">
                Enquiry
              </button>
              <button className="bg-blue-800 text-white px-8 py-3 text-lg rounded hover:bg-blue-900 transition">
                Admissions
              </button>
              <button className="bg-blue-800 text-white px-8 py-3 text-lg rounded hover:bg-blue-900 transition">
                ERT Registration
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </header>


    </>
  );
};







const eminentVisitors = [
  {
    name: "Babita Phogat",
    profession: "Indian Wrestler & Commonwealth Games Gold Medalist",
    img: "/images/visitors/babita.jpg",
  },
  {
    name: "Apurvi Chandela",
    profession: "Olympic Shooter & National Champion",
    img: "/images/visitors/apurvi.jpg",
  },
  {
    name: "Krishna Poonia",
    profession: "Olympic Athlete & Commonwealth Gold Medalist",
    img: "/images/visitors/krishna.jpg",
  },
  {
    name: "Jhabar Singh Kharra",
    profession: "Ministry of Urban Development & Self-Governance",
    img: "/images/visitors/jhabar.jpg",
  },
  {
    name: "Gajendra Chauhan",
    profession: "Actor & Former Chairman, FTII",
    img: "/images/visitors/gajendra.jpg",
  },
  {
    name: "Avinash Gehlot",
    profession: "Ministry of Social Justice & Empowerment",
    img: "/images/visitors/avinash.jpg",
  },
  {
    name: "Pushpendra Singh Rathore",
    profession: "Deputy Inspector General, BSF",
    img: "/images/visitors/pushpendra.jpg",
  },
  {
    name: "Krishan Kumar Vishnoi",
    profession: "Honourable Minister, Government of Rajasthan",
    img: "/images/visitors/krishan.jpg",
  },
];


export default Homepage;
