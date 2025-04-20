import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./chatbotform";
import ChatMessage from "./ChatMessage";

const Chatbot = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
        role: "model",
        text: `
        You are a professional agriculture assistant built specifically for Indian farmers and agriculture experts.
        - Always provide accurate, helpful, and region-specific answers related to agriculture in India only.
        - Do not mention that you're an AI or assistant; just respond as a knowledgeable expert in Indian agriculture.
        - You can answer queries about crops, soil, fertilizers, seasons, climate conditions, farming techniques, government schemes, etc., specific to any region in India.
        - Only respond with information related to agriculture. For unrelated queries, politely decline.
        - Treat each message as a new query unless the user explicitly refers to previous context.
        `.trim(),
        hideInChat: true,
      }
  ]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        {showChatbot ? "❌" : "💬"}
      </button>

      {/* Chat Popup */}
      {showChatbot && (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col mt-4">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-blue-600 rounded-t-lg">
            <div className="flex items-center space-x-2 text-white">
              <ChatbotIcon />
              <h2 className="font-semibold text-lg">AgriHelp Chatbot</h2>
            </div>
            <button onClick={() => setShowChatbot(false)} className="text-white text-xl">
              ⬇
            </button>
          </div>

          {/* Body */}
          <div
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text text-sm text-gray-700">
                Hey there! <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
