import express from 'express';
import { addBrandingSetting, getBrandingSetting, updateBrandingSetting, upload } from '../controllers/WebsiteController.js';


const WebSiterouter = express.Router();

// Multi-file upload
const logoUpload = upload.fields([
  { name: 'dark', maxCount: 1 },
  { name: 'light', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
]);

// http://localhost:8000/api/website/get

WebSiterouter.post('/add', logoUpload, addBrandingSetting);
WebSiterouter.put('/update', logoUpload, updateBrandingSetting);
WebSiterouter.get('/get', getBrandingSetting);

export default WebSiterouter;
