import React from 'react'
import { FaFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FiChevronDown } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const navItems = [
        { label: "HOME", path: "/" },
        {
            label: "ABOUT US",
            submenu: [
                "Mission and Vision",
                "Principal Message",
                "Campus Infrastructure",
                "Eminent Visitors"
            ],
            path: "/vision-mission-motto/" 
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
    return (
        <>
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
            <div className="flex items-center justify-between px-20 py-2 bg-white shadow-sm">
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

            {/* Scroll-Reveal Navigation Bar */}
            <nav
                className={`bg-blue-800  sticky top-0 text-white w-full z-50 transition-transform duration-300`}
            >
                <div className="max-w-5xl mx-auto px-10 py-6 flex justify-between items-center text-base font-medium">
                    {navItems.map((item) => (
                        <div key={item.label} className="relative group px-2">
                            <NavLink
                                to={item.path || "#"}
                                className={({ isActive }) =>
                                    `flex items-center space-x-1 transition-colors duration-200 ${isActive ? " " : "text-white hover:text-gray-400"
                                    }`
                                }
                            >
                                <span>{item.label}</span>
                                {item.submenu && <FiChevronDown className="text-sm mt-1" />}

                                {item.submenu && (
                                    <div className="absolute top-[150%] left-0 mt-2 bg-white text-blue-900 border shadow-lg z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 translate-y-2">
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
                            </NavLink>

                            <span className="absolute -bottom-[23px] left-0 h-[3px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>


                        </div>
                    ))}
                </div>
            </nav>

        </>
    )
}
