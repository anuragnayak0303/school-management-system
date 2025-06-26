import React, { useState, useEffect } from "react";
import classNames from "classnames";

export default function EditSubjectForm({
  isOpen,
  toggleForm,
  onSubmit,
  classList,
  initialClassId = "",
  initialSubject = null,
}) {
  const [classId, setClassId] = useState(initialClassId);

  const [subject, setSubject] = useState({
    subjectName: "",
    subjectType: "",
    subjectCode: "",
    subjectId: undefined,
  });

  useEffect(() => {
    if (initialSubject) {
      setSubject({
        classId,
        subjectId: initialSubject[0]?.subjectId,
        subjectName: initialSubject[0]?.subjectName || "",
        subjectType: initialSubject[0]?.subjectType || "",
        subjectCode: initialSubject[0]?.subjectCode || "",
      });
    }

    // Only set classId if not already set
    if (!classId && initialClassId) {
      setClassId(initialClassId);
    }
  }, [initialClassId, initialSubject, classId]);

  const handleChange = (field, val) => {
    setSubject((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      classId,
      subjects: [
        {
          ...subject,
          subjectCode: subject.subjectCode.toUpperCase(),
        },
      ],
    };
    console.log("Submitting payload:", payload); // ✅ Debug check
    onSubmit(payload);
  };

  const IsFormClose = () => {
    setClassId("")
    setSubject({
      subjectName: "",
      subjectType: "",
      subjectCode: "",
      subjectId: undefined,
    })
    toggleForm()
  }

  return (
    <div
      className={classNames(
        "fixed top-0 right-0 w-full sm:w-[500px] h-full bg-gray-50 border-s border-s-gray-300 bg-gradient-to-br from-white via-gray-50 to-white animate-fade-in shadow-xl transform transition-transform duration-300 z-50",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        }
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-b-gray-300 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-blue-800">Edit Subject</h3>
        <button
          onClick={IsFormClose}
          className="text-2xl text-gray-600 hover:text-red-500 transition"
          aria-label="Close form"
        >
          &times;
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-[88vh] bg-white"
      >
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {/* Class Dropdown */}
          <div className="relative border border-gray-300 bg-white rounded-xl shadow p-4 space-y-3">
            <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500 font-medium">
              Select Class <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-blue-500 transition"
            >
              <option value="">Choose class</option>
              {classList.map((c) => (
                <option key={c._id} value={c._id}>
                  Class {c.Classname || c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Input Card */}
          <div className="relative border border-gray-300 bg-white rounded-xl shadow p-4 space-y-3 mt-5">
            <div className="absolute -top-3 left-4 space-x-2.5 bg-white px-2 text-sm text-gray-500 font-medium">
              <span>Subject Details</span>
            </div>

            <div className="space-y-3.5">
              <input
                type="text"
                required
                placeholder="Subject Name"
                value={subject.subjectName}
                onChange={(e) => handleChange("subjectName", e.target.value)}
                className="flex-1 w-full border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-blue-500 transition"
              />

              <select
                required
                value={subject.subjectType}
                onChange={(e) => handleChange("subjectType", e.target.value)}
                className="flex-1 w-full border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-blue-500 transition"
              >
                <option value="">Type</option>
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
              </select>

              <input
                type="text"
                required
                maxLength={3}
                placeholder="Code"
                value={subject.subjectCode}
                onChange={(e) =>
                  handleChange("subjectCode", e.target.value.toUpperCase())
                }
                className="w-24 border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-t-gray-300 flex justify-end gap-3 bg-white shadow-inner">
          <button
            type="button"
            onClick={IsFormClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
