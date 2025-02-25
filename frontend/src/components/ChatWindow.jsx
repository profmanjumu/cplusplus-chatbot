// src/components/ChatWindow.jsx
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server.');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.answer || 'Sorry, I could not generate a response.', isUser: false },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: 'Error: Unable to connect to the backend server.', isUser: false },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;