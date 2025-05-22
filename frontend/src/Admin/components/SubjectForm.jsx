import React from "react";

const SubjectForm = ({
    isOpen,
    toggleForm,
    onSubmit,
    subjectName,
    setSubjectName,
    subjectType,
    setSubjectType,
    classId,
    setClassId,
    subjectCode,
    setSubjectCode,
    editingSubjectId,
    classList,
}) => {
    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-xl transition-transform duration-300 z-50 border-l ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex items-center justify-between p-5 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-700">
                    {editingSubjectId ? "✏️ Edit Subject" : "➕ Add New Subject"}
                </h2>
                <button
                    onClick={toggleForm}
                    className="text-gray-500 hover:text-red-500 text-2xl font-bold"
                    title="Close"
                    type="button"
                >
                    &times;
                </button>
            </div>

            <form onSubmit={onSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Mathematics"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        required
                        value={subjectType}
                        onChange={(e) => setSubjectType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Select Subject Type</option>
                        <option value="Theory">Theory</option>
                        <option value="Practical">Practical</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Class <span className="text-red-500">*</span>
                    </label>
                    <select
                        required
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Choose class</option>
                        {classList.map((cls) => (
                            <option key={cls._id} value={cls._id}>
                                {cls.Classname}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Code
                    </label>
                    <input
                        type="text"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={toggleForm}
                        className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm shadow-sm"
                    >
                        {editingSubjectId ? "Update Subject" : "Save Subject"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubjectForm;
