import React, { useState } from "react";

const GroupedSubjectCards = ({ subjects, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  // Group subjects by classId
  const grouped = subjects.reduce((acc, subj) => {
    const className = subj.classId?.Classname || "Unknown Class";
    if (!acc[className]) acc[className] = [];
    acc[className].push(subj);
    return acc;
  }, {});

  const classGroups = Object.entries(grouped); // [ [className, subjects[]], ... ]
  const totalPages = Math.ceil(classGroups.length / classesPerPage);

  const paginatedGroups = classGroups.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {paginatedGroups.map(([className, subjects]) => (
          <div key={className} className="bg-white shadow-md rounded-xl p-4">
            {/* Class Header */}
            <h2 className="text-green-700 uppercase font-bold text-lg mb-3 border-b pb-1">
              {className}
            </h2>

            {/* Subjects List */}
            <ul className="space-y-2">
              {subjects.map((subj) => (
                <li
                  key={subj._id}
                  className="flex justify-between items-start bg-gray-50 rounded p-2"
                >
                  <div>
                    <div className="text-gray-800 font-semibold capitalize">
                      {subj.subjectName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Code: {subj.subjectCode || "—"} | Type: {subj.subjectType}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => handleEdit(subj)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(subj._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 px-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupedSubjectCards;
