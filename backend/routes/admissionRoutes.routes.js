import express from "express";
import { getAllAdmissionDetails, submitAdmissionEnquiry } from "../controllers/Enquirycontroller.js";


const Admissionrouter = express.Router();
// https://school-management-system-1-jprf.onrender.com/api/v2/admission/admission-enquiry
Admissionrouter.post("/admission-enquiry", submitAdmissionEnquiry);
// https://school-management-system-1-jprf.onrender.com/api/v2/admission/all_admission-enquiry
Admissionrouter.get("/all_admission-enquiry", getAllAdmissionDetails);

export default Admissionrouter;
