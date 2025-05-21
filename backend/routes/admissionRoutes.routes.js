import express from "express";
import { getAllAdmissionDetails, submitAdmissionEnquiry } from "../controllers/Enquirycontroller.js";


const Admissionrouter = express.Router();
// http://localhost:8000/api/v2/admission/admission-enquiry
Admissionrouter.post("/admission-enquiry", submitAdmissionEnquiry);
// http://localhost:8000/api/v2/admission/all_admission-enquiry
Admissionrouter.get("/all_admission-enquiry", getAllAdmissionDetails);

export default Admissionrouter;
