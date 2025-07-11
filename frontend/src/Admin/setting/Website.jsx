import React, { useState, useEffect } from "react";
import { IoTrashOutline, IoImageOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const FileCard = ({ title, value, isHomepage }) => (
  <div className="group relative border border-blue-100 shadow-sm rounded-lg bg-white p-4 space-y-3">
    <div className="flex justify-between items-center">
      {value && (
        <label className={`flex items-center gap-2 text-sm ${isHomepage ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
          <input type="radio" name="homepageLogo" checked={isHomepage} disabled className="accent-blue-600 scale-125" />
          <span>Show on Home Page</span>
        </label>
      )}
    </div>
    {value ? (
      <div className="relative">
        <img src={value} alt={title} className="h-32 w-full object-contain rounded" />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded cursor-not-allowed bg-gray-100">
        <IoImageOutline size={28} className="text-gray-400" />
        <span className="text-xs text-gray-500">Upload {title}</span>
      </div>
    )}
  </div>
);

export default function WebsiteSettings({ onEdit }) {
  const [logos, setLogos] = useState({ dark: null, light: null, favicon: null });
  const [homepageLogo, setHomepageLogo] = useState("");
  const [marqueeText, setMarqueeText] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "", instagram: "", twitter: "", youtube: "", linkedin: ""
  });
  const [schoolInfo, setSchoolInfo] = useState({
    name: "", principal: "", phone: "", email: "", address: "", description: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://school-management-system-1-jprf.onrender.com/api/website/get");
        const data = res.data;
        setLogos({
          dark: data.logos?.dark ? `https://school-management-system-1-jprf.onrender.com/${data.logos.dark}` : null,
          light: data.logos?.light ? `https://school-management-system-1-jprf.onrender.com/${data.logos.light}` : null,
          favicon: data.logos?.favicon ? `https://school-management-system-1-jprf.onrender.com/${data.logos.favicon}` : null,
        });
        setHomepageLogo(data.homepageLogo || "");
        setSocialLinks(data.socialLinks || {});
        setSchoolInfo(data.schoolInfo || {});
        setMarqueeText(data.marqueeText || "");
      } catch (err) {
        console.error("Failed to load settings:", err);
        toast.error("Failed to load site settings ❌");
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white space-y-10 animate-fade-in">
      <h1 className="text-4xl font-extrabold drop-shadow">Website Branding</h1>

      {/* Logo Uploads */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {["dark", "light", "favicon"].map(key => (
          <FileCard
            key={key}
            title={`${key.charAt(0).toUpperCase() + key.slice(1)} Logo`}
            value={logos[key]}
            isHomepage={homepageLogo === key}
          />
        ))}
      </div>

      {/* School Info */}
      <div className="bg-gradient-to-br from-gray-50 to-white border border-blue-100 shadow-lg rounded-2xl p-8 space-y-6">
        <div className="flex justify-between font-semibold">
          <h2 className="text-2xl font-bold">🏫 School Information</h2>
          <button onClick={onEdit} className="text-sm text-blue-600 hover:underline">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "principal", "phone", "email"].map(field => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={schoolInfo[field]}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md bg-gray-100"
            />
          ))}
        </div>
        <textarea
          rows={3}
          placeholder="School Address"
          value={schoolInfo.address}
          disabled
          className="w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md bg-gray-100"
        />
        <textarea
          rows={4}
          placeholder="School Description"
          value={schoolInfo.description}
          disabled
          className="w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md bg-gray-100"
        />
      </div>

      {/* Social Media Links */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 space-y-5">
        <h2 className="text-xl font-semibold">🌐 Social Media Links</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: "facebook", icon: <FaFacebookF className="text-blue-600" /> },
            { key: "instagram", icon: <FaInstagram className="text-pink-500" /> },
            { key: "twitter", icon: <FaTwitter className="text-sky-500" /> },
            { key: "youtube", icon: <FaYoutube className="text-red-600" /> },
            { key: "linkedin", icon: <FaLinkedinIn className="text-blue-800" /> }
          ].map(({ key, icon }) => (
            <div key={key} className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
              <input
                type="url"
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
                value={socialLinks[key]}
                disabled
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-blue-100 bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">🎯 Marquee Message</h2>
        <input
          type="text"
          value={marqueeText}
          disabled
          className="w-full rounded-lg border px-4 py-2 bg-gray-100 border-blue-100"
        />
      </div>
    </div>
  );
}
