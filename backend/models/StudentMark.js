// models/StudentMark.js
import mongoose from 'mongoose';

const SubjectMarkSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    markObtained: {
        type: Number,
        required: true
    }
});

const StudentMarkSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentAdmission',
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    marks: [SubjectMarkSchema],
    fullMarks: {
        type: Number,
        required: true
    },
    Delete: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('StudentMark', StudentMarkSchema);
