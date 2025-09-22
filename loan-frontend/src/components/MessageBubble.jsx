export default function MessageBubble({ sender, text }) {
  const isUser = sender === "user";

  // Check if message contains sanction letter link
  if (text.includes("Sanction letter generated:")) {
    const filename = text.split(":").pop().trim();
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`p-3 rounded-xl max-w-xs ${
            isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          <a
            href={`http://localhost:5000/sanctions/${filename}`}
            download
            className="text-blue-700 underline"
          >
            📄 Download Sanction Letter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-xl max-w-xs ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
