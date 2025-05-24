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

export const GetER = async (req, res) => {
    try {
        const from = await ERTForm.find(); // ✅ await added
        res.status(200).json(from);        // ✅ send as JSON with 200 OK
    } catch (error) {
        console.error('Error fetching ERT data:', error);
        res.status(500).json({             // ✅ send proper error response
            message: 'Server error while fetching ERT data',
            error: error.message
        });
    }
};