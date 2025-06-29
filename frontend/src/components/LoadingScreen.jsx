// src/components/LoadingScreen.js
import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingProvider ";


const LoadingScreen = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 z-50 fixed top-0 left-0">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 border-8 border-t-purple-500 border-r-pink-400 border-b-yellow-400 border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-xl font-bold text-purple-700 drop-shadow animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
