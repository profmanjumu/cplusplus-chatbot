// src/components/ChatInput.jsx
import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 bg-gray-100">
      <input
        type="text"
        placeholder="Ask a C++ question..."
        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;