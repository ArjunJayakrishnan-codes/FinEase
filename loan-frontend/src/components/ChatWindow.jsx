import React, { useState } from "react";
import { sendMessage, downloadSanctionLetter } from "../api";

export default function ChatWindow({ customer }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: `👋 Hello ${customer.name}! How can I help you today?` },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await sendMessage(input, customer);
      setTimeout(() => {
        setIsTyping(false);
        if (res.sanction_letter) {
          setMessages([
            ...newMessages,
            { sender: "bot", text: res.response, sanction_letter: res.sanction_letter },
          ]);
        } else {
          setMessages([...newMessages, { sender: "bot", text: res.response }]);
        }
      }, 800);
    } catch {
      setIsTyping(false);
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Server error." }]);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const blob = await downloadSanctionLetter(fileName);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    } catch {
      alert("❌ Failed to download sanction letter.");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-sm p-3 rounded-2xl shadow-sm animate-fade-in ${
              m.sender === "user"
                ? "bg-blue-600 text-white ml-auto rounded-br-none"
                : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
            }`}
          >
            <p>{m.text}</p>
            {m.sanction_letter && (
              <button
                onClick={() => handleDownload(m.sanction_letter)}
                className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm transition hover:scale-105"
              >
                📄 Download Sanction Letter
              </button>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="bg-white text-slate-500 p-3 rounded-2xl shadow inline-block animate-pulse">
            • • •
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex space-x-2 sticky bottom-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-slate-300 rounded-xl px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your loan request..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow transform transition hover:scale-105 active:scale-95"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
