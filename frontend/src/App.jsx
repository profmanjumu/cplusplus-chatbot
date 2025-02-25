import React, { useState } from 'react';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            const response = await fetch('https://cplusplus-chatbot-backend.vercel.app/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: input }),
            });
            const data = await response.json();
            const botMessage = { role: 'bot', content: data.answer };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', content: 'Error: Unable to connect to the backend server.' },
            ]);
        }
    };

    return (
        <div className="chat-container">
            <h1>Prof M's CS210 Office Bot</h1>
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ask a question about C++ or the assignment..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
            <div className="disclaimer">
                📢 Disclaimer: This bot is a helpful assistant but may not always provide accurate answers. 
                Please verify critical information manually. When in doubt, refer to official resources or consult your instructor.
            </div>
        </div>
    );
};

export default App;