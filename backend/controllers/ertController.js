// controllers/ertController.js

import ERTForm from "../models/ERTForm.js";


export const submitERTForm = async (req, res) => {
    try {
        const form = new ERTForm(req.body);
        await form.save();
        res.status(201).json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Form submission failed:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
