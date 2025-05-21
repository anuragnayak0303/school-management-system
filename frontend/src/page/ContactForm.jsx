import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: null,
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  toast.dismiss();

  // ✅ Validate phone number: must be exactly 10 digits
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(formData.phone)) {
    toast.error("Phone number must be exactly 10 digits.");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v2/admission/admission-enquiry",
      formData
    );
    toast.success(res.data.message || "Enquiry submitted successfully!");

    // Reset form
    setFormData({ name: "", email: "", phone: "", description: "" });
  } catch (err) {
    console.log(err);
    if (err.response?.status === 409) {
      toast.error(err.response.data.message || "Duplicate email or phone number.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="bg-green-600 py-16 px-4 md:px-16 text-white">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto text-center mb-12">
        <h4 className="text-sm uppercase tracking-wide">Dundlod Public School</h4>
        <h2 className="text-4xl md:text-5xl font-bold mt-1">Get in Touch with Us</h2>
        <div className="mt-4 mb-2 border-t border-white w-1/2 mx-auto" />
        <p className="text-white text-md md:text-lg">
          Wish to enquire about admissions, syllabus, or anything else? You can walk in during office hours, give us a call.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-full px-6 py-3 bg-white text-gray-800 w-full focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="rounded-full px-6 py-3 bg-white text-gray-800 w-full focus:outline-none"
          required
        />

        <input
          type="tel"
          name="phone"
          maxLength={10}
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-full px-6 py-3 bg-white text-gray-800 w-full focus:outline-none"
          required
        />

       

        <textarea
          name="description"
          rows={6}
          placeholder="Write Your Message"
          value={formData.description}
          onChange={handleChange}
          className="rounded-3xl px-6 py-4 bg-white text-gray-800 w-full focus:outline-none md:col-span-2 resize-none"
          required
        ></textarea>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-green-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-md transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Now"}
          </button>
        </div>
      </form>
    </section>
  );
}
