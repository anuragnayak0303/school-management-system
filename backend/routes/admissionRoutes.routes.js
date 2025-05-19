import express from "express";
import { submitAdmissionEnquiry } from "../controllers/Enquirycontroller.js";


const Admissionrouter = express.Router();
// http://localhost:8000/api/v2/admission/admission-enquiry
Admissionrouter.post("/admission-enquiry", submitAdmissionEnquiry);

export default Admissionrouter;
