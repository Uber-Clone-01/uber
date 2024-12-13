import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatBotPopup = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (inputMessage.trim() === '') return;

        const newMessage = {
            sender: 'captain',
            text: inputMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');

        
        setTimeout(() => {
            const botMessage = {
                sender: 'bot',
                text: 'Thank you for your message! How can I assist you further?',
                timestamp: new Date().toISOString(),
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="h-full flex flex-col">
           
            <div className="p-4 bg-blue-500 text-white font-bold text-lg">
                Chat Support
            </div>

           
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
