// routes/ertRoutes.js
import express from 'express';
import { GetER, submitERTForm } from '../controllers/ertController.js';

const ertRoutes = express.Router();
// http://loaclhost:8000/api/ert/submit
ertRoutes.post('/submit', submitERTForm);
// http://loaclhost:8000/api/ert/all
ertRoutes.get('/all', GetER);


export default ertRoutes;
