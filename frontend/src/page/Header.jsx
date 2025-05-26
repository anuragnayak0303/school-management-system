import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaFacebook, FaTimes } from 'react-icons/fa';
import { FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';
import { FiChevronDown, FiChevronsDown } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    const navItems = [
        { label: "HOME", path: "/" },
        {
            label: "ABOUT US",
            submenu: ["Mission and Vision", "Principal Message"],
        },
        { label: "ADMISSIONS", submenu: ["Admissions Enquiry"] },
        {
            label: "ACADEMICS", submenu: ["Campus Infrastructure"]
        },
        { label: "OTHER LINKS", submenu: ["Registration for ERT"] },
        { label: "CONTACT US", path: "/contact-us" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setShowHeader(false); // Scroll down → hide
            } else {
                setShowHeader(true); // Scroll up → show
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Mobile Sidebar Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300">
                    <div className='flex justify-between items-center mb-6'>
                        <img
                            src="https://www.dpssoyla.com/wp-content/uploads/2025/01/500X500.png"
                            alt="DPS Logo"
                            className="w-16 h-16 object-contain"
                        />
                        <FaTimes
                            className="text-xl text-gray-700 cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    </div>

                    {navItems.map((item) => (
                        <div key={item.label} className="mb-4">
                            {item.submenu ? (
                                <>
                                    <div
                                        className="flex justify-between items-center cursor-pointer text-blue-800 font-semibold py-2"
                                        onClick={() =>
                                            setMobileDropdown(mobileDropdown === item.label ? null : item.label)
                                        }
                                    >
                                        <span>{item.label}</span>
                                        <FiChevronDown
                                            className={`transition-transform duration-300 ${mobileDropdown === item.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    </div>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${mobileDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <ul className="ml-4 mt-2 text-sm text-gray-700 border-l pl-4 border-blue-200">
                                            {item.submenu.map((subItem, idx) => (
                                                <li key={idx} className="py-1">
                                                    <NavLink
                                                        to={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {subItem}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-blue-800 font-semibold py-2"
                                >
                                    {item.label}
                                </NavLink>
                            )}
                        </div>
                    ))}

                    <div className="flex mt-10 justify-center gap-4 mb-6">
                        <FaFacebook className='text-2xl text-gray-800' />
                        <FaSquareXTwitter className='text-2xl text-gray-800' />
                        <FaSquareInstagram className='text-2xl text-gray-800' />
                    </div>
                </div>
            )}

            {/* Logo and Admission Button */}
            <div className="flex items-center justify-between px-6 md:px-20 py-2 bg-white shadow-sm">
                <div className='flex items-center gap-6 md:gap-12'>
                    <div className="hidden md:block">
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-900">DUNDLOD PUBLIC SCHOOL</h1>
                        <p className="text-green-600 text-xl md:text-3xl font-semibold -mt-1">SOYLA</p>
                    </div>
                    <img
                        src="https://www.dpssoyla.com/wp-content/uploads/2025/01/500X500.png"
                        alt="DPS Logo"
                        className="w-16 h-16 md:w-24 md:h-24 object-contain"
                    />
                </div>
                <div className="md:hidden">
                    <FaBars className="text-2xl text-blue-900 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
                </div>
                <button className="hidden md:block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md text-base font-semibold">
                    ADMISSION
                </button>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden md:block bg-blue-800 sticky top-0 text-white w-full z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-5xl mx-auto px-10 py-6 flex justify-between items-center text-base font-medium">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative px-2 group"
                            onMouseEnter={() => setActiveSubmenu(item.label)}
                            onMouseLeave={() => setActiveSubmenu(null)}
                        >
                            <NavLink
                                to={item.path || "#"}
                                className={({ isActive }) =>
                                    `flex items-center space-x-1 transition-colors duration-200 ${isActive ? "text-yellow-300" : "text-white hover:text-gray-400"}`
                                }
                            >
                                <span>{item.label}</span>
                                {item.submenu && <FiChevronsDown className="text-sm mt-1" />}
                            </NavLink>
                            {item.submenu && (
                                <div
                                    className={`absolute top-full left-0 mt-2 w-56 bg-white text-blue-900 border shadow-lg z-50 transition-all duration-300 ease-in-out transform 
                                    ${activeSubmenu === item.label ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
                                >
                                    <ul className="py-2">
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
        </>
    );
}
