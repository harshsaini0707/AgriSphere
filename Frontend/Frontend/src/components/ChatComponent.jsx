import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Video, X, Paperclip } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create a preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Clear selected file
  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if ((!inputMessage.trim() && !selectedFile) || isUploading) return;
    
    let messageContent = inputMessage;
    let messageType = "text";
    
    if (selectedFile) {
      messageType = selectedFile.type.startsWith("image/") ? "image" : 
                    selectedFile.type.startsWith("video/") ? "video" : "file";
      
      // Simulate upload
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        
        // Add new message with media
        const newMessage = {
          id: messages.length + 1,
          text: messageContent,
          media: previewUrl,
          mediaType: messageType,
          sender: "user",
          timestamp: new Date()
        };
        
        setMessages([...messages, newMessage]);
        
        // Add bot response after a delay
        setTimeout(() => {
          const botResponse = {
            id: messages.length + 2,
            text: `I received your ${messageType}!`,
            sender: "bot",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
        }, 1000);
        
        clearSelectedFile();
      }, 1500);
    } else {
      // Add text-only message
      const newMessage = {
        id: messages.length + 1,
        text: messageContent,
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      
      // Add bot response after a delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! How can I help you further?",
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
    
    setInputMessage("");
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-100">
      {/* Chat header */}
      <div className="bg-white shadow p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          AI
        </div>
        <div className="ml-4">
          <h1 className="font-bold">AI Assistant</h1>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
                message.sender === "user" 
                  ? "bg-blue-500 text-white rounded-br-none" 
                  : "bg-white shadow rounded-bl-none"
              }`}
            >
              {message.text && <p className="mb-1">{message.text}</p>}
              
              {message.media && message.mediaType === "image" && (
                <img 
                  src={message.media} 
                  alt="User uploaded image" 
                  className="rounded max-h-64 max-w-full object-contain mt-2" 
                />
              )}
              
              {message.media && message.mediaType === "video" && (
                <video 
                  src={message.media} 
                  controls 
                  className="rounded max-h-64 max-w-full mt-2" 
                />
              )}
              
              <div className="text-xs mt-1 opacity-70 text-right">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Preview area for selected media */}
      {selectedFile && (
        <div className="p-2 bg-gray-200">
          <div className="relative inline-block">
            {selectedFile.type.startsWith("image/") ? (
              <img 
                src={previewUrl} 
                alt="Upload preview" 
                className="h-20 object-contain rounded" 
              />
            ) : selectedFile.type.startsWith("video/") ? (
              <video 
                src={previewUrl} 
                className="h-20 object-contain rounded" 
              />
            ) : (
              <div className="h-20 flex items-center justify-center bg-gray-300 rounded px-3">
                <Paperclip className="mr-2" size={16} />
                <span className="truncate max-w-xs">{selectedFile.name}</span>
              </div>
            )}
            <button 
              onClick={clearSelectedFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="bg-white border-t p-3">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-2">
            {/* Image upload button */}
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="p-2 rounded-full hover:bg-gray-200 transition"
              title="Upload image or video"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*, video/*"
              className="hidden"
            />
          </div>
          
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full border rounded-full px-4 py-2 pr-12 resize-none max-h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={1}
            />
            <button 
              onClick={handleSendMessage}
              disabled={(!inputMessage.trim() && !selectedFile) || isUploading}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                (!inputMessage.trim() && !selectedFile) || isUploading
                  ? "text-gray-400"
                  : "text-blue-500 hover:bg-blue-100"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;