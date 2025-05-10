import React, { useState } from "react";

const Website = () => {
  const [formData, setFormData] = useState({
    schoolName: "STATE UNIVERSITIES AND COLLEGES",
    schoolCode: "2342524324",
    principalName: "Schooling Principal",
    adminEmail: "Schooling@mail.com",
    adminPhone: "016442290**",
    schoolAddress: "Pilipinas",
    schoolDescription: "STATE UNIVERSITIES AND COLLEGES",
    logoType: "image",
    darkLogo: null,
    lightLogo: null,
    favicon: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  const handleDeleteImage = (key) => {
    setFormData((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved data:", formData);
    // TODO: Replace with actual backend submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-4 bg-white rounded space-y-6"
    >
      <h2 className=" font-semibold">Website Logo Setting</h2>

      <div className="w-full h-auto lg:h-[40vh] flex flex-wrap justify-evenly items-center ">
        <div className="lg:w-2/8 w-full  h-full border border-dotted border-gray-400 rounded-md"></div>
        <div className="lg:w-2/8 w-full h-full border border-dotted border-gray-400 rounded-md"></div>
        <div className="lg:w-2/8 w-full  h-full border border-dotted border-gray-400 rounded-md"></div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Website;
