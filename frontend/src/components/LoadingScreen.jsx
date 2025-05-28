// src/components/LoadingScreen.js
import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingProvider ";


const LoadingScreen = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Full-screen animated GIF background */}
      <img
        src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
        alt="Boy chasing cat"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Semi-transparent overlay text */}
      <div className="relative z-10 bg-white bg-opacity-70 px-6 py-4 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-700 animate-pulse">Loading...</h2>
        <p className="text-blue-900">A boy is chasing a cat. Hang tight!</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
