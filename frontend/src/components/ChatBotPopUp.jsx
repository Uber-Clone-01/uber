import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

const ChatBotPopup = () => {
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Hi! How can I assist you today?',
            timestamp: new Date().toISOString(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const userMessage = {
            sender: 'captain',
            text: inputMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, userMessage]);
        setInputMessage('');

        try {
            // Send user message to the backend and get bot response
            const response = await axios.post("https://uber-clone-backend-t531.onrender.com/bot/bot-res", {
                prompt: inputMessage,
            });

            const cleanedResponse = response.data.response.replace(/[*_]/g, '');

            const botMessage = {
                sender: 'bot',
                text: cleanedResponse || 'Sorry, I couldn\'t process your request.',
                timestamp: new Date().toISOString(),
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);

            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, there was an error. Please try again later.',
                timestamp: new Date().toISOString(),
            };

            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 bg-blue-500 text-white font-bold text-lg">
                Chat Support
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${
                            message.sender === 'captain' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`p-3 rounded-lg shadow-md max-w-xs ${
                                message.sender === 'captain'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 bg-white flex items-center">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default ChatBotPopup;
