import express from 'express';
import multer from 'multer';
import path from 'path';
import { addEvent, getAllEvents } from '../controllers/eventController.js';


const Eventrouter = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/events/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `event-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to accept PDF only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route
// https://school-management-system-1-jprf.onrender.com/api/v8/event/add
Eventrouter.post('/add', upload.single('attachment'), addEvent);
// https://school-management-system-1-jprf.onrender.com/api/v8/event/all 
Eventrouter.get("/all", getAllEvents);


export default Eventrouter;
