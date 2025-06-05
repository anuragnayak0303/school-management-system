import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditEventModal({ onClose }) {
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const inputClass =
    "w-full border border-gray-300 outline-0 rounded px-3 py-2 shadow-md transition duration-300 ease-in-out transform hover:shadow-lg focus:shadow-2xl focus:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("audience", selectedAudience);
    formData.append("title", title);
    formData.append("category", selectedCategory);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("message", message);
    if (file) formData.append("attachment", file);

    try {
      const response = await axios.post("http://localhost:8000/api/v8/event/add", formData);
      toast.success("✅ Event created successfully!");
      onClose();
    } catch (error) {
      console.error("❌ Error submitting event:", error);
      toast.error("❌ Failed to create event. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-bold text-gray-800 px-6 pt-6 pb-3 border-b border-gray-200">
          New Event
        </h2>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Event For</label>
            <div className="flex gap-5">
              {["all", "students", "staffs"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="audience"
                    value={type}
                    checked={selectedAudience === type}
                    onChange={() => setSelectedAudience(type)}
                    className="accent-blue-600"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="Meeting">Meeting</option>
                <option value="Holiday">Holiday</option>
                <option value="Activity">Activity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="date" className={inputClass} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input type="time" className={inputClass} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input type="time" className={inputClass} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="mt-2 bg-gray-50 border rounded px-4 py-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
            <div className="flex items-center gap-3">
              <label className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition cursor-pointer">
                Upload
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              {file && <span className="text-sm text-gray-600">{file.name}</span>}
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload size of 4MB, Accepted Format PDF</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Meeting with Staffs on the Quality Improvement..."
              className={`${inputClass} resize-none`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded shadow-md transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
