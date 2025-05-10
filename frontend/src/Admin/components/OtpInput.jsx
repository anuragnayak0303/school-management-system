import React, { useRef, useEffect } from "react";

export default function OtpInput({ otp, setOtp }) {
  const refs = useRef([]);

  const handleChange = (index, value) => {
    setOtp(index, value);
    if (value && index < 5) refs.current[index + 1]?.focus();
    if (!value && index > 0) refs.current[index - 1]?.focus();
  };

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  return (
    <div className="flex justify-between gap-2 mb-2">
      {otp.map((val, idx) => (
        <input
          key={idx}
          ref={(el) => (refs.current[idx] = el)}
          type="text"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(idx, e.target.value)}
          className="w-10 h-12 text-center border rounded text-lg border-gray-300 focus:outline-indigo-500"
        />
      ))}
    </div>
  );
}
