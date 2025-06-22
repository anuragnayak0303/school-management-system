import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthStudentContext } from '../../context/StudentAuth';

const maxHeight = 180;

export default function ExamResultCard() {
    const { student } = useContext(AuthStudentContext);
    const [examData, setExamData] = useState([]);
    const [selectedExam, setSelectedExam] = useState('Quarter 1');
    const [loading, setLoading] = useState(true);

    const getRandomColor = () => {
        const colors = ['#3B82F6', '#FACC15', '#F87171', '#34D399', '#A78BFA'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        const fetchExamResults = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v11/exam/student/${student?._id}`);
                const result = res.data?.data;

                if (Array.isArray(result)) {
                    setExamData(result);
                } else {
                    console.error('Unexpected data format:', result);
                }
            } catch (error) {
                console.error('Error fetching exam data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (student?._id) fetchExamResults();
    }, [student]);

    const examNames = [...new Set(examData.map(exam => exam.examName))];

    const filteredExam = examData.find(exam => exam.examName === selectedExam);

    const barData = filteredExam?.marks?.map(mark => ({
        subject: mark.subjectId?.subjectName || 'Unknown',
        score: mark.markObtained,
        color: getRandomColor(),
        label: `${mark.subjectId?.subjectName} : ${mark.markObtained}`,
        labelStyle: ' bg-blue-100 text-blue-800'
    })) || [];

    return (
        <div className="space-y-4">
            {loading ? (
                <div className="p-4 text-sm text-gray-500">Loading...</div>
            ) : (
                <div className="w-full bg-white rounded shadow-md border border-gray-300">
                    {/* Header with Exam Dropdown */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
                        <h2 className="text-sm font-semibold text-gray-800">Exam Results</h2>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600">📅</span>
                            <select
                                value={selectedExam}
                                onChange={(e) => setSelectedExam(e.target.value)}
                                className="text-[11px] border border-gray-300 rounded px-2 py-1 text-gray-700"
                            >
                                {examNames.map((name, i) => (
                                    <option key={i} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="px-4 py-4">
                        {/* Labels */}
                        <div className="flex flex-wrap gap-2 mb-4 text-[10px] font-medium">
                            {barData.slice(0, 4).map((item, i) => (
                                <div key={i} className={`px-2 py-1 rounded ${item.labelStyle}`}>
                                    {item.label}
                                </div>
                            ))}
                        </div>

                        {/* Bar Graph */}
                        <div className="flex justify-between items-end mt-10 h-[200px] pt-2 px-2 border-s border-b border-gray-200">
                            {barData.map((item, i) => (
                                <div key={i} className="flex flex-col items-center w-[18%]">
                                    <span className="text-[11px] font-semibold text-gray-800 mb-1">
                                        {((item.score / (filteredExam?.fullMarks || 100)) * 100).toFixed(0)}%
                                    </span>
                                    <div className="w-[28px] h-[180px] bg-gray-100 rounded-md flex items-end">
                                        <div
                                            className="w-full rounded-t-md transition-all duration-300"
                                            style={{
                                                height: `${(item.score / (filteredExam?.fullMarks || 100)) * maxHeight}px`,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                    </div>
                                    <span className="text-[11px] text-gray-600 mt-1">{item.subject.slice(0, 3)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
