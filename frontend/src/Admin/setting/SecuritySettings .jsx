import React, { useState } from 'react';
import ChangePasswordModal from '../components/ChangePasswordModal ';

const SecuritySettings = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded">
      <h2 className="font-semibold mb-4">Security Settings</h2>
      <ChangePasswordModal isOpen={showModal} onClose={closeModal} />

      {/* Password */}
      <div className="border-b border-b-gray-300 border-t-gray-300 border-t py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium">Password</h3>
            <p className="text-xs text-gray-500">
              Set a unique password to protect the account | Last Changed 03 Jan 2024, 09:00 AM
            </p>
          </div>
          <button  onClick={openModal} className="btn text-xs flex justify-center items-center bg-black text-white px-2 py-1.5 rounded">Change Password</button>
        </div>
      </div>

      {/* Two Factor Authentication */}
      <div className="border-b border-b-gray-300 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Two Factor Authentication</h3>
            <p className="text-sm text-gray-500">
              Receive codes via SMS or email every time you login
            </p>
          </div>
        
          <button className="btn text-xs flex justify-center items-center bg-black text-white px-2 py-1.5 rounded">Enable</button>
        </div>
      </div>

      {/* Google Authentication */}
      <div className="border-b border-b-gray-300 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Google Authentication</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-0.5 text-green-600 border border-green-500 rounded-full text-xs">
                ● Connected
              </span>
              <span>Connect to Google</span>
            </div>
          </div>
          <input type="checkbox" className="toggle toggle-success" checked disabled />
        </div>
      </div>

      {/* Phone Number Verification */}
      <div className="border-b border-b-gray-300 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Phone Number Verification <span className="text-green-600">✔</span></h3>
            <p className="text-sm text-gray-500">
              The Phone Number associated with the account | Verified Mobile Number: +99264710583
            </p>
          </div>
          <div className="space-x-2 flex ">
            
          <button className="btn text-xs flex justify-center items-center border border-gray-400 px-2 py-1.5 rounded">Remove</button>

          <button className="btn text-xs flex justify-center items-center bg-black text-white px-2 py-1.5 rounded">Change</button>
            
          </div>
        </div>
      </div>

      {/* Email Verification */}
      <div className="border-b border-b-gray-300 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Email Verification <span className="text-green-600">✔</span></h3>
            <p className="text-sm text-gray-500">
              The email address associated with the account | Verified Email: info@example.com
            </p>
          </div>
          <div className="space-x-2 flex ">
            
          <button className="btn text-xs flex justify-center items-center border border-gray-400 px-2 py-1.5 rounded">Remove</button>

          <button className="btn text-xs flex justify-center items-center bg-black text-white px-2 py-1.5 rounded">Change</button>
            
          </div>
        </div>
      </div>

      {/* Device Management */}
      <div className="border-b border-b-gray-300 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Device Management</h3>
            <p className="text-sm text-gray-500">The devices associated with the account</p>
          </div>
          
          <button className="btn text-xs flex justify-center items-center bg-black text-white px-2 py-1.5 rounded">Manage</button>
        </div>
      </div>

      {/* Account Activity */}
      <div className="py-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Account Activity</h3>
            <p className="text-sm text-gray-500">The activities of the account</p>
          </div>
          
          <button className="btn text-xs flex justify-center items-center bg-black text-white px-2 py-1.5 rounded">View</button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
