import AdmissionEnquiryModel from "../models/Enguiry.js";

; // adjust the path if needed

// Handle POST: New Admission Enquiry
export const submitAdmissionEnquiry = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;

    // Basic Validation
    if (!name || !email || !phone || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save to DB
    const newEnquiry = new AdmissionEnquiryModel({ name, email, phone, description });
    await newEnquiry.save();

    res.status(201).json({ message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Admission Enquiry Error:", error);

    // Handle duplicate entry errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ message: `${field} already exists.` });
    }

    res.status(500).json({ message: "Something went wrong. Please try again later.", error });
  }
};

export const getAllAdmissionDetails = async (req, res) => {
  try {
    const Data = await AdmissionEnquiryModel.find().lean()
    // console.log(Data)
    res.send(Data)
  } catch (error) {
    console.log(error)
  }
}
