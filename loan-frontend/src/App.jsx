import React, { useState } from "react";
import { verifyCustomer } from "./api";
import ChatWindow from "./components/ChatWindow";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!phone.trim()) {
      setError("⚠️ Please enter a phone number.");
      return;
    }
    try {
      const data = await verifyCustomer(phone);
      setCustomer(data);
      setError("");
    } catch {
      setError("❌ Phone number not found. Please try again.");
    }
  };

  const handleLogout = () => {
    setCustomer(null);
    setPhone("");
    setError("");
  };

  if (!customer) {
    return (
      <LoginScreen
        phone={phone}
        setPhone={setPhone}
        error={error}
        handleVerify={handleVerify}
      />
    );
  }

  // Main App after login
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-slate-900 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          {customer.photo_url ? (
            <img
              src={customer.photo_url}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
              {customer.name.charAt(0)}
            </div>
          )}
          <h2 className="mt-4 text-xl font-bold">{customer.name}</h2>
          <p className="text-sm text-slate-400">{customer.phone}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 space-y-2 shadow-lg">
          <h3 className="font-semibold text-slate-200 mb-2">📋 Profile</h3>
          <p>💼 Salary: ₹{customer.monthly_salary}</p>
          <p>⭐ Credit Score: {customer.credit_score}</p>
          <p>💰 Limit: ₹{customer.pre_approved_limit}</p>
          <p>📍 {customer.address}</p>
        </div>

        <div className="mt-auto text-center text-xs text-slate-500">
          Powered by <b>FinEase</b> © 2025
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col bg-slate-50">
        <header className="bg-white border-b shadow px-6 py-3 flex justify-between items-center">
          <h1 className="font-bold text-blue-600 text-lg">💬 Chat with FinEase</h1>
          {/* ✅ Top-right Logout */}
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </header>
        <ChatWindow customer={customer} />
      </main>
    </div>
  );
}
