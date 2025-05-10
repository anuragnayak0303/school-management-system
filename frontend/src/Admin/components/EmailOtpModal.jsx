import React, { useEffect, useState, useRef } from "react";
import OtpInput from "./OtpInput";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import EditPfofile from "../setting/EditProfile";

export default function EmailOtpModal({ onClose, onVerified }) {
  const { auth } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resendCount, setResendCount] = useState(0);

  // Countdown for resend
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  // OTP generator
  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    console.log("Generated OTP:", otpCode); // For testing/logging
  };

  // Send OTP (step 1)
  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v2/emp/emailVerified`,
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        setTimeout(() => {
          generateOtp();
          setStep(2);
          setTimer(30);
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // OTP submit check
  const handleOtpSubmit = () => {
    if (otp.join("") === generatedOtp) {
      setStep(3);
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleResend = () => {
    if (resendCount >= 5) return alert("Max resend attempts reached!");
    generateOtp();
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setResendCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center overflow-y-auto">
        <Toaster />
        {step !== 3 && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-slide-down border border-gray-200">
            {/* Step 1: Email Entry */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-indigo-700 mb-1">
                  🔐 Verify Your Email
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Enter your email to receive a 6-digit OTP.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded focus:ring-indigo-500 mb-4"
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Send OTP
                </button>
              </>
            )}

            {/* Step 2: OTP Entry */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-green-600 mb-1">
                  🔑 Enter OTP
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  We’ve sent a 6-digit OTP to your email.
                </p>
                <OtpInput
                  otp={otp}
                  setOtp={(i, v) => {
                    const newOtp = [...otp];
                    newOtp[i] = v;
                    setOtp(newOtp);
                  }}
                />

                <div className="text-sm text-gray-600 mt-2 mb-4">
                  {timer > 0 ? (
                    <>
                      Resend OTP in <strong>{timer}s</strong>
                    </>
                  ) : (
                    <button
                      onClick={handleResend}
                      className="text-blue-600 underline font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  onClick={handleOtpSubmit}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>
              </>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 w-full text-center"
            >
              Cancel
            </button>
          </div>
        )}

        {step == 3 && <EditPfofile onVerified={onVerified} />}
      </div>
    </>
  );
}
