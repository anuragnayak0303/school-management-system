import React, { useState, useEffect } from "react";
import { IoTrashOutline, IoImageOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

// Convert base64 data URL to File object
function dataURLtoFile(dataUrl, filename) {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

const FileCard = ({ title, value, onChange, onRemove, isHomepage, onHomepageSelect }) => (
  <div className="group relative border border-blue-100 shadow-sm rounded-lg bg-white hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 space-y-3">
    <div className="flex justify-between items-center">
      {value && (
        <label className={`flex items-center gap-2 text-sm cursor-pointer ${isHomepage ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
          <input type="radio" name="homepageLogo" checked={isHomepage} onChange={onHomepageSelect} className="accent-blue-600 scale-125" />
          <span>Show on Home Page</span>
        </label>
      )}
    </div>
    {value ? (
      <div className="relative">
        <img src={value} alt={title} className="h-32 w-full object-contain rounded " />
        <button type="button" onClick={onRemove} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100 transition">
          <IoTrashOutline className="text-red-500" size={18} />
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
        <IoImageOutline size={28} className="text-gray-400" />
        <span className="text-xs text-gray-500">Upload {title}</span>
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      </label>
    )}
  </div>
);

export default function WebsiteSettings() {
  const [logos, setLogos] = useState({ dark: null, light: null, favicon: null });
  const [homepageLogo, setHomepageLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [marqueeText, setMarqueeText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [editableFields, setEditableFields] = useState({ schoolInfo: false, socialLinks: false });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "", instagram: "", twitter: "", youtube: "", linkedin: ""
  });

  const [schoolInfo, setSchoolInfo] = useState({
    name: "", principal: "", phone: "", email: "", address: "", description: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/website/get");
        const data = res.data;
        setLogos({
          dark: data.logos?.dark ? `http://localhost:8000/${data.logos.dark}` : null,
          light: data.logos?.light ? `http://localhost:8000/${data.logos.light}` : null,
          favicon: data.logos?.favicon ? `http://localhost:8000/${data.logos.favicon}` : null,
        });
        setHomepageLogo(data.homepageLogo || "");
        setSocialLinks(data.socialLinks || {});
        setSchoolInfo(data.schoolInfo || {});
        setMarqueeText(data.marqueeText || "");
      } catch (err) {
        console.error("Failed to load settings:", err);
        toast.error("Failed to load site settings ❌");
      }
    })();
  }, []);

  const handleChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogos(prev => ({ ...prev, [key]: reader.result }));
        setHomepageLogo(prev => prev || key);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (key) => {
    setLogos(prev => ({ ...prev, [key]: null }));
    if (homepageLogo === key) setHomepageLogo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    ["dark", "light", "favicon"].forEach(key => {
      const dataUrl = logos[key];
      if (dataUrl?.startsWith("data:image")) {
        formData.append(key, dataURLtoFile(dataUrl, `${key}.png`));
      }
    });
    formData.append("homepageLogo", homepageLogo);
    Object.entries(socialLinks).forEach(([k, v]) => formData.append(`socialLinks[${k}]`, v));
    Object.entries(schoolInfo).forEach(([k, v]) => formData.append(`schoolInfo[${k}]`, v));
    formData.append("marqueeText", marqueeText);

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/website/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Website settings saved successfully ✅");
      setEditableFields({ schoolInfo: false, socialLinks: false });
    } catch (err) {
      console.error("API error =>", err.response?.data || err.message);
      toast.error("Failed to save settings ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleMarqueeSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/marquee/add", { text: inputValue });
      toast.success("Marquee text updated ✅");
      setMarqueeText(inputValue);
      setInputValue("");
    } catch (err){
      console.log(err)
      toast.error("Failed to update marquee text ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 md:p-10 bg-white space-y-10 animate-fade-in">
      <h1 className="text-4xl font-extrabold drop-shadow">Website Branding</h1>

      {/* Logo Uploads */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {["dark", "light", "favicon"].map(key => (
          <FileCard
            key={key}
            title={`${key.charAt(0).toUpperCase() + key.slice(1)} Logo`}
            value={logos[key]}
            onChange={e => handleChange(e, key)}
            onRemove={() => handleRemove(key)}
            isHomepage={homepageLogo === key}
            onHomepageSelect={() => setHomepageLogo(key)}
          />
        ))}
      </div>

      {/* School Info */}
      <div className="bg-gradient-to-br from-gray-50 to-white border border-blue-100 shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold flex justify-between items-center">
          🏫 School Information
          {!editableFields.schoolInfo && Object.values(schoolInfo).some(v => v) && (
            <button
              type="button"
              onClick={() => setEditableFields(prev => ({ ...prev, schoolInfo: true }))}
              className="text-sm text-blue-600 hover:underline"
            >
              Update
            </button>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "principal", "phone", "email"].map(field => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={schoolInfo[field]}
              disabled={!editableFields.schoolInfo}
              onChange={e => setSchoolInfo(prev => ({ ...prev, [field]: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md focus:ring-2 focus:ring-blue-500 ${!editableFields.schoolInfo ? "bg-gray-100" : ""}`}
            />
          ))}
        </div>
        <textarea
          rows={3}
          placeholder="School Address"
          value={schoolInfo.address}
          disabled={!editableFields.schoolInfo}
          onChange={e => setSchoolInfo(prev => ({ ...prev, address: e.target.value }))}
          className={`w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md focus:ring-2 focus:ring-blue-500 ${!editableFields.schoolInfo ? "bg-gray-100" : ""}`}
        />
        <textarea
          rows={4}
          placeholder="School Description"
          value={schoolInfo.description}
          disabled={!editableFields.schoolInfo}
          onChange={e => setSchoolInfo(prev => ({ ...prev, description: e.target.value }))}
          className={`w-full px-4 py-3 rounded-lg border border-blue-100 shadow-md focus:ring-2 focus:ring-blue-500 ${!editableFields.schoolInfo ? "bg-gray-100" : ""}`}
        />
      </div>

      {/* Social Media Links */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 space-y-5">
        <h2 className="text-xl font-semibold flex justify-between items-center">
          🌐 Social Media Links
          {!editableFields.socialLinks && Object.values(socialLinks).some(v => v) && (
            <button
              type="button"
              onClick={() => setEditableFields(prev => ({ ...prev, socialLinks: true }))}
              className="text-sm text-blue-600 hover:underline"
            >
              Update
            </button>
          )}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: "facebook", icon: <FaFacebookF className="text-blue-600" /> },
            { key: "instagram", icon: <FaInstagram className="text-pink-500" /> },
            { key: "twitter", icon: <FaTwitter className="text-sky-500" /> },
            { key: "youtube", icon: <FaYoutube className="text-red-600" /> },
            { key: "linkedin", icon: <FaLinkedinIn className="text-blue-800" /> }
          ].map(({ key, icon }) => (
            <div key={key} className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
              <input
                type="url"
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
                value={socialLinks[key]}
                disabled={!editableFields.socialLinks}
                onChange={e => setSocialLinks(prev => ({ ...prev, [key]: e.target.value }))}
                className={`pl-10 pr-4 py-2 w-full rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 ${!editableFields.socialLinks ? "bg-gray-100" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">🎯 Set Marquee Message</h2>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder={marqueeText || "Enter marquee text here..."}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="flex-grow rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleMarqueeSubmit}
            disabled={loading || !inputValue.trim()}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition ${loading || !inputValue.trim() ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>

      {/* Save All */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full max-w-md mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition ${loading ? "opacity-70" : ""}`}
      >
        {loading ? "Saving..." : "Save All Settings"}
      </button>
    </form>
  );
}
