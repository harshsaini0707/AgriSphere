import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    setTimeout(() => {
      setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` },
      ]);
    }, 600);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
      <input
        ref={inputRef}
        placeholder="Message..."
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="text-blue-600 hover:text-blue-800 text-2xl">
        ⬆
      </button>
    </form>
  );
};

export default ChatForm;
