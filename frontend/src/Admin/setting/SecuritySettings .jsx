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


    </div>
  );
};

export default SecuritySettings;
