import React, { useState, useRef, useEffect } from "react";
import CountrySelect from "../CountrySelect";
import StateField from "../StateSelect";
import CitySelect from "../CiitySelect";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

export default function EditPfofile({ onVerified }) {
  const { auth } = useAuth();
  const [UserData, setuserdat] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    state: "",
    city: "",
    country: "",
    postalcode: "",
    stateCode: "",
    countryCode: "",
    image: null, // image file
  });
  useEffect(() => {
    async function featchdata() {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v2/get`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setuserdat({
          ...UserData,
          name: data?.userId.name,
          email: data?.userId.email,
          address: data?.address,
          phone: data?.phone,
          state: data?.state,
          city: data?.city,
          country: data?.country,
          postalcode: data?.postalcode,
          stateCode: data?.stateCode,
          countryCode: data?.countryCode,
          image: data?.userId?.profileImage,
        });
      } catch (error) {
        console.log(error);
      }
    }

    auth.token && featchdata();
  }, [auth]);

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChenge = (e) => {
    setuserdat({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setuserdat({ ...UserData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (let key in UserData) {
      formData.append(key, UserData[key]);
    }
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v2/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      toast.success(data.message);
      setTimeout(() => {
        onVerified();
      },1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[50%] p-6 border border-gray-300 box-border shadow bg-white">
      <div className="bg-white">
        <h2 className="font-semibold mb-3">Profile Settings</h2>

        <section className="bg-white text-sm border-t border-t-gray-200 pt-4 py-6 mb-1">
          <h3 className="font-semibold text-gray-800 mb-3">
            Basic Information
          </h3>

          <div className="flex items-center gap-4 mb-4 bg-gray-50 p-5 rounded-md">
            <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl overflow-hidden">
              {imagePreview || UserData?.image !== "" ? (
                <img
                  src={`${
                    imagePreview
                      ? imagePreview
                      : `http://localhost:8000/${UserData?.image}`
                  }`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "📷"
              )}
            </div>
            <div>
              <p className="font-semibold">Profile Picture</p>
              <p className="text-sm text-gray-500 mb-1">
                Recommended image size is 40px x 40px
              </p>
              <div className="flex gap-2">
                <button
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload
                </button>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={UserData.name}
                onChange={handleChenge}
                className="w-full border rounded px-3 border-gray-300 outline-0 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={UserData.phone}
                onChange={handleChenge}
                className="w-full border rounded px-3 border-gray-300 outline-0 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={UserData.email}
                onChange={handleChenge}
                className="w-full border rounded px-3 border-gray-300 outline-0 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-t-gray-300 py-4">
          <h3 className="font-semibold text-sm text-gray-800 mb-3">
            Address Information
          </h3>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={UserData.address}
              onChange={handleChenge}
              className="w-full border rounded px-3 border-gray-300 outline-0 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1">Country</label>
              <CountrySelect
                UserData={UserData}
                setuserdat={setuserdat}
                handleChenge={handleChenge}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">State</label>
              <StateField
                UserData={UserData}
                setuserdat={setuserdat}
                handleChenge={handleChenge}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">City</label>
              <CitySelect
                UserData={UserData}
                setuserdat={setuserdat}
                handleChenge={handleChenge}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="postalcode"
              value={UserData.postalcode}
              onChange={handleChenge}
              className="w-full border rounded px-3 border-gray-300 outline-0 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-orange-400 text-white rounded-md mt-2.5"
          >
            Save
          </button>
        </section>
      </div>
    </div>
  );
}
