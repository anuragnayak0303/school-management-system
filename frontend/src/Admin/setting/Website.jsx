import React, { useState } from "react";
import { IoTrashOutline, IoImageOutline } from "react-icons/io5";

const FileCard = ({ title, value, onChange, onRemove }) => (
  <div className="group relative border rounded-xl bg-white hover:shadow-md transition duration-300">
    <div className="p-4">
      <label className="block text-gray-700 font-medium mb-2">{title}</label>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt={title}
            className="h-32 w-full object-contain rounded border"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100 transition"
            title="Remove"
          >
            <IoTrashOutline className="text-red-500" size={18} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
          <IoImageOutline size={28} className="text-gray-400" />
          <span className="text-xs text-gray-500">Upload {title}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>
      )}
    </div>
  </div>
);

export default function WebsiteSettings() {
  const [logos, setLogos] = useState({
    dark: null,
    light: null,
    favicon: null,
  });

  const [activeDisplay, setActiveDisplay] = useState("dark"); // Default selected

  const handleChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setLogos((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemove = (key) => {
    setLogos((prev) => ({ ...prev, [key]: null }));
    if (activeDisplay === key) {
      setActiveDisplay(""); // Remove display if deleted
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected display logo:", activeDisplay);
    console.log("Logo data:", logos);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 md:p-10 bg-white border rounded-2xl shadow space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Website Branding</h1>
        <p className="text-gray-500 text-sm">
          Upload logos and choose which one to display on the website.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <FileCard
          title="Dark Logo"
          value={logos.dark}
          onChange={(e) => handleChange(e, "dark")}
          onRemove={() => handleRemove("dark")}
        />
        <FileCard
          title="Light Logo"
          value={logos.light}
          onChange={(e) => handleChange(e, "light")}
          onRemove={() => handleRemove("light")}
        />
        <FileCard
          title="Favicon"
          value={logos.favicon}
          onChange={(e) => handleChange(e, "favicon")}
          onRemove={() => handleRemove("favicon")}
        />
      </div>

      {/* New: Select Which Logo to Display */}
      <div className="pt-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select logo to display on the website:
        </label>
        <select
          value={activeDisplay}
          onChange={(e) => setActiveDisplay(e.target.value)}
          className="w-full md:w-1/2 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="dark">Dark Logo</option>
          <option value="light">Light Logo</option>
          <option value="favicon">Favicon</option>
        </select>
      </div>

      <div className="text-right pt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Save Branding Settings
        </button>
      </div>
    </form>
  );
}
