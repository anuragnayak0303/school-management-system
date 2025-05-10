// pages/settings/ProfileSettings.jsx
import React, { useEffect, useState } from "react";
import EmailOtpModal from "../components/EmailOtpModal";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function ProfileSettings() {
  const { auth } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [data, setdata] = useState({});

  useEffect(() => {
    async function featchdata() {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v2/get`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setdata(data);
      } catch (error) {
        console.log(error);
      }
    }

    auth.token && featchdata();
  }, [auth]);

  return (
    <div className="bg-white">
      {modalOpen && (
        <EmailOtpModal
          onClose={() => setModalOpen(false)}
          onVerified={() => {
            setModalOpen(false);
            setVerified(true);
          }}
        />
      )}
      <h2 className="font-semibold mb-3">Profile Settings</h2>
      <section className="bg-white text-sm border-t border-t-gray-200 pt-4 py-6 mb-1">
        <h3 className="font-semibold text-gray-800 mb-3">Basic Information</h3>
        <div className="flex items-center gap-4 mb-4 bg-gray-50 p-5 rounded-md">
          <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
            {data?.userId?.profileImage !== "" ? (
              <img
                src={`http://localhost:8000/${data?.userId?.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
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
                onClick={() => setModalOpen(true)}
                className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit Profile
              </button>
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
              value={data?.userId?.name}
              readOnly
              className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={data?.phone}
              readOnly
              className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={data?.userId?.email}
              readOnly
              className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
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
            value={data?.address}
            readOnly
            className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1">Country</label>
            <input
              type="text"
              value={data?.country}
              readOnly
              className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">State</label>
            <input
              type="text"
              value={data?.state}
              readOnly
              className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">City</label>
            <input
              type="text"
              value={data?.city}
              readOnly
              className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-xs font-medium mb-1">Postal Code</label>
          <input
            type="text"
            value={data?.postalcode}
            readOnly
            className="w-full rounded px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed outline-none"
          />
        </div>
      </section>
    </div>
  );
}
