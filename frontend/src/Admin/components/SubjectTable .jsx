import React, { useState } from "react";

const SubjectTable = ({
  subjects,
  handleEdit,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 20;

  const totalPages = Math.ceil(subjects.length / subjectsPerPage);

  const paginatedSubjects = subjects.slice(
    (currentPage - 1) * subjectsPerPage,
    currentPage * subjectsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border-separate border-spacing-y-1">
          <thead className="bg-blue-50 text-xs text-blue-800 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">Subject Name</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubjects.map((subj, index) => (
              <tr key={subj._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-2 font-medium text-gray-800">{subj.subjectName}</td>
                <td className="px-4 py-2">{subj.subjectCode || "—"}</td>
                <td className="px-4 py-2">{subj.subjectType}</td>
                <td className="px-4 py-2">{subj.classId?.Classname || "N/A"}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
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

export default SubjectTable;
