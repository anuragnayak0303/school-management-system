// routes/ertRoutes.js
import express from 'express';
import { submitERTForm } from '../controllers/ertController.js';

const ertRoutes = express.Router();
// http://loaclhost:8000/api/ert/submit
ertRoutes.post('/submit', submitERTForm);

export default ertRoutes;
