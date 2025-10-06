import React from "react";

export default function LoginScreen({ phone, setPhone, error, handleVerify }) {
  return (
    <div className="h-screen w-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 text-white p-12 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute w-[400px] h-[400px] bg-white/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl bottom-[-100px] right-[-50px] animate-pulse"></div>

        <h1 className="text-6xl font-extrabold mb-6 relative z-10">FinEase</h1>
        <p className="text-xl font-light max-w-md text-center relative z-10">
          Loans made <span className="font-semibold">easy, secure</span>, and
          designed for your needs.
        </p>
      </div>

      {/* Right Side - Login */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-96 border border-gray-200 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back 👋
          </h2>

          {/* Input */}
          <input
            type="tel"
            maxLength="10"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 mb-4 text-gray-900"
            placeholder="Enter your 10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleVerify}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
          >
            Continue ➜
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            Secured by <span className="font-bold text-blue-600">FinEase</span> © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
