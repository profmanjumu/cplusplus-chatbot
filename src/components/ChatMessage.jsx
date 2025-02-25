// src/components/ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-2`}
    >
      <div
        className={`p-2 max-w-xs break-words rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;