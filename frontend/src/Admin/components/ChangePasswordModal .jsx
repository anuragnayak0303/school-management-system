import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";

// Step 1: Old Password Component
const OldPasswordStep = ({ onNext }) => {
  const { auth } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v2/emp/passwordmatch`,
        { oldPassword },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          onNext();
        }, 1000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="space-y-3">
      <label className="mb-1.5 font-sans">Old Password</label>
      <div className="relative">
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="Enter current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border rounded p-2 pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-sm"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          {showOldPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!oldPassword}
          onClick={handleSubmit}
          className="text-sm px-3 py-1 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Step 2: New Password Component
const NewPasswordStep = ({ onClose }) => {
  const { auth } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validations = {
    length: newPassword.length >= 8,
    digit: /\d/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const allValid = Object.values(validations).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword;

  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v2/emp/ForgetPass`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const getClass = (valid) =>
    `flex items-center gap-2 text-sm ${
      valid ? "text-green-600" : "text-gray-400"
    }`;

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type={showNew ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded p-2 pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-sm"
          onClick={() => setShowNew(!showNew)}
        >
          {showNew ? "Hide" : "Show"}
        </button>
      </div>

      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded p-2 pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-sm"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? "Hide" : "Show"}
        </button>
      </div>

      <div className="text-xs space-y-1 pt-1">
        <div className={getClass(validations.length)}>
          • At least 8 characters
        </div>
        <div className={getClass(validations.digit)}>• At least 1 digit</div>
        <div className={getClass(validations.lowercase)}>
          • At least 1 lowercase letter
        </div>
        <div className={getClass(validations.uppercase)}>
          • At least 1 uppercase letter
        </div>
        <div className={getClass(validations.special)}>
          • At least 1 special character
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button onClick={onClose} className="text-sm px-3 py-1 border rounded">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!allValid || !passwordsMatch}
          className="text-sm px-3 py-1 rounded text-white disabled:opacity-50"
          style={{
            backgroundColor: allValid && passwordsMatch ? "#000" : "#888",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Main Modal
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleClose = () => {
    setStep(1); // Reset to Step 1 when closing
    onClose();
  };

  return (
    <AnimatePresence>
      <Toaster />
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-[#0018] bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            {step === 1 ? (
              <OldPasswordStep onNext={handleNext} />
            ) : (
              <NewPasswordStep onClose={handleClose} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
