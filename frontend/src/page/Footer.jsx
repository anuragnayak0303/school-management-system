import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#1b2b38] text-white py-10 px-5 md:px-20">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-500 pb-6">
                {/* Logo and Description */}
                <div className="mb-6 md:mb-0 max-w-md">
                    <img src="https://www.dpssoyla.com/wp-content/uploads/2025/01/500X500.png." alt="DPS Logo" className="w-24 mb-4" />
                    <h2 className="text-xl font-semibold">Dundlod Public School</h2>
                    <p className="text-sm mt-1">
                        A Group of CBSE Affiliated, Sr. Sec., Co-educational, Boarding-cum-Day
                        Schools
                    </p>
                </div>

                {/* School Address */}
                <div className="mb-6 md:mb-0">
                    <h3 className="font-bold text-lg mb-2">School Address</h3>
                    <p className="flex items-start text-sm">
                        <FaLocationDot className="mt-1 mr-2" />
                        Jodhpur-Nagaur Highway, NH62, Village: Soyla, Teh.: Bawadi,
                        Jodhpur, Rajasthan – 342037
                    </p>
                </div>

                {/* Contact Information */}
                <div className="mb-6 md:mb-0">
                    <h3 className="font-bold text-lg mb-2">Contact Information</h3>
                    <p className="flex items-center text-sm mb-1">
                        <FaPhoneAlt className="mr-2" /> +91 954 954 9195
                    </p>
                    <p className="flex items-center text-sm">
                        <MdEmail className="mr-2" /> enquiry@dpssoyla.com
                    </p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="font-bold text-lg mb-2">Find Us On:</h3>
                    <div className="flex space-x-4">
                        <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
                        <FaXTwitter className="hover:text-blue-400 cursor-pointer" />
                        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                        <FaLinkedinIn className="hover:text-blue-600 cursor-pointer" />
                        <FaYoutube className="hover:text-red-500 cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm">
                <p>
                    Copyright © 2025 Dundlod Public School, Soyla | All Rights Reserved.
                </p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:underline">
                        Terms & Conditions
                    </a>
                    <a href="#" className="hover:underline">
                        Refund Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
