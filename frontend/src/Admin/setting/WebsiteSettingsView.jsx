import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa";

const IconMap = {
    facebook: <FaFacebookF className="text-blue-600" />,
    instagram: <FaInstagram className="text-pink-500" />,
    twitter: <FaTwitter className="text-sky-500" />,
    youtube: <FaYoutube className="text-red-600" />,
    linkedin: <FaLinkedinIn className="text-blue-800" />,
};

export default function WebsiteSettingsView({ data, onEdit }) {
    if (!data) return <p>No data found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white space-y-10 animate-fade-in">
            <h1 className="text-2xl font-extrabold drop-shadow">Website Branding (View Mode)</h1>

            {/* Logos */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {["dark", "light", "favicon"].map((val, i) => (
                    <div key={i} className="border border-blue-100 shadow-sm rounded-lg bg-white p-4">
                        <h3 className="mb-2 font-semibold">{val.charAt(0).toUpperCase() + val.slice(1)} Logo</h3>
                        {data.logos?.[val] ? (
                            <img
                                src={`http://localhost:8000/${data.logos?.[val]}`}
                                alt={`${val} logo`}
                                className="h-32 w-full object-contain rounded"
                            />
                        ) : (
                            <p className="text-gray-400">No {val} logo uploaded</p>
                        )}
                        {data.homepageLogo === val && (
                            <p className="mt-1 text-blue-600 font-semibold">Shown on Home Page</p>
                        )}
                    </div>
                ))}
            </div>

            {/* School Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-blue-100 shadow-lg rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-bold flex justify-between items-center">
                    🏫 School Information
                    <button onClick={onEdit} className="text-sm text-blue-600 hover:underline">
                        Edit
                    </button>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["name", "principal", "phone", "email"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 text-sm font-semibold">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <p className="w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md bg-gray-50">
                                {data.schoolInfo?.[field] || "-"}
                            </p>
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-semibold">Address</label>
                    <p className="w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md bg-gray-50">
                        {data.schoolInfo?.address || "-"}
                    </p>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-semibold">Description</label>
                    <p className="w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md bg-gray-50">
                        {data.schoolInfo?.description || "-"}
                    </p>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 space-y-5">
                <h2 className="text-xl font-semibold flex justify-between items-center">🌐 Social Media Links</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(data.socialLinks || {}).map(([key, val]) => (
                        <div key={key} className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{IconMap[key]}</div>
                            {val ? (
                                <a
                                    href={val}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 "
                                >
                                    {val}
                                </a>
                            ) : (
                                <span className="text-gray-400 italic">No link provided</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 space-y-5">
                <h2 className="text-xl font-semibold">🌐 Social Media Links</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(data.socialLinks || {}).map(([key, val]) => (
                        <div key={key} className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{IconMap[key]}</div>
                            <input
                                type="url"
                                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
                                value={val}
                                
                                className={`pl-10 pr-4 py-2 w-full rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 ${!editableFields.socialLinks ? "bg-gray-100" : ""}`}
                            />
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Marquee */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-2">🎯 Marquee Message</h2>
                <p className="px-4 py-2 rounded border border-blue-100 bg-gray-50">
                    {data.marqueeText || "-"}
                </p>
            </div>
        </div>
    );
}
