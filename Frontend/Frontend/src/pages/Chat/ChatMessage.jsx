import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <div className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
        <div
          className={`rounded-lg p-2 text-sm max-w-[80%] ${
            chat.role === "model"
              ? chat.isError
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-900"
              : "bg-green-100 text-green-900"
          }`}
        >
          {chat.text}
        </div>
      </div>
    )
  );
};

export default ChatMessage;
