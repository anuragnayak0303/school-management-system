import React, { useState, useEffect } from "react";
import classNames from "classnames";

export default function AddSubjectBatch({
    isOpen,
    toggleForm,
    onSubmit,
    classList,
    initialClassId = "",
    initialSubjects = null,
}) {
    const [classId, setClassId] = useState(initialClassId);
    const [subjects, setSubjects] = useState([
        { subjectName: "", subjectType: "", subjectCode: "", _id: undefined },
    ]);

    useEffect(() => {
        if (initialClassId) setClassId(initialClassId);
        if (initialSubjects) {
            const enriched = initialSubjects.map((subj) => ({
                subjectName: subj.subjectName || "",
                subjectType: subj.subjectType || "",
                subjectCode: subj.subjectCode?.replace("#00", "") || "",
                _id: subj._id || undefined,
            }));
            setSubjects(enriched);
        }
    }, [initialClassId, initialSubjects]);

    const addSubjectRow = () => {
        setSubjects((prev) => [
            ...prev,
            { subjectName: "", subjectType: "", subjectCode: "", _id: undefined },
        ]);
    };

    const removeSubjectRow = (idx) => {
        if (subjects.length === 1) return;
        setSubjects((prev) => prev.filter((_, i) => i !== idx));
    };

    const updateField = (idx, field, val) => {
        setSubjects((prev) => {
            const copy = [...prev];
            copy[idx][field] = val;
            return copy;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            classId,
            subjects: subjects.map((subj) => ({
                subjectName: subj.subjectName,
                subjectType: subj.subjectType,
                subjectCode: subj.subjectCode.toUpperCase(),
                classId,
                _id: subj._id || undefined,
            })),
        };
        onSubmit(payload);
    };

    return (
        <div
            className={classNames(
                "fixed top-0 right-0 w-full sm:w-[500px] h-full bg-gray-50 border-s border-s-gray-300 bg-gradient-to-br from-white via-gray-50 to-white animate-fade-in shadow-xl transform transition-transform duration-300 z-50",
                { "translate-x-0": isOpen, "translate-x-full": !isOpen }
            )}
        >
            <div className="flex justify-between items-center p-4 border-b border-b-gray-300 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800">
                    {initialSubjects ? "Edit Subjects" : "Add Subjects"}
                </h3>
                <button
                    onClick={toggleForm}
                    className="text-2xl text-gray-600 hover:text-red-500 transition"
                    aria-label="Close form"
                >
                    &times;
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col h-[88vh] bg-white">
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

                    {/* Subject Fields */}
                    {subjects.map((subj, idx) => (
                        <div
                            key={idx}
                            className="relative border border-gray-300 bg-white rounded-xl shadow p-4 space-y-3 mt-5"
                        >
                            <div className="absolute -top-3 left-4 space-x-2.5 bg-white px-2 text-xs text-gray-500 font-medium">
                                <span>Subject {idx + 1}</span>
                            </div>
                            <div className="absolute -top-2.5 right-4 space-x-2.5 bg-white px-2 text-xs text-gray-500 font-medium">
                                <button
                                    type="button"
                                    onClick={() => removeSubjectRow(idx)}
                                    className="text-red-500 hover:cursor-pointer text-xs hover:text-red-600 transition"
                                >
                                    &minus; Remove
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    required
                                    placeholder="Subject Name"
                                    value={subj.subjectName}
                                    onChange={(e) => updateField(idx, "subjectName", e.target.value)}
                                    className="flex-1 w-full border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-blue-500 transition"
                                />

                                <select
                                    required
                                    value={subj.subjectType}
                                    onChange={(e) => updateField(idx, "subjectType", e.target.value)}
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
                                    value={subj.subjectCode}
                                    onChange={(e) =>
                                        updateField(idx, "subjectCode", e.target.value.toUpperCase())
                                    }
                                    className="w-24 border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Add More */}
                    <div className="text-right">
                        <button
                            type="button"
                            onClick={addSubjectRow}
                            className="text-blue-600 font-semibold hover:underline mt-2"
                        >
                            + Add Another Subject
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-t-gray-300 flex justify-end gap-3 bg-white shadow-inner">
                    <button
                        type="button"
                        onClick={toggleForm}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
