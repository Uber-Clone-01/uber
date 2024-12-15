import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaHome } from 'react-icons/fa';
import { UserCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageText = (text) => {
    // Replace markdown-like symbols with proper formatting
    const boldPattern = /\*\*(.*?)\*\*/g; // Bold **text**
    const italicPattern = /\*(.*?)\*/g; // Italic *text*
    return text
      .replace(boldPattern, '<b>$1</b>')
      .replace(italicPattern, '<i>$1</i>');
  };

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent empty messages

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send input to backend
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bot/bot-res`, {
        prompt: input,
      });

      // Add bot response to chat
      const botMessage = {
        sender: 'bot',
        text: response.data.response || 'Sorry, no valid response received.',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-blue-500">
      <div className="w-full max-w-lg h-full bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header with Home Icon */}
        <div className="flex justify-between items-center p-4 bg-indigo-600 rounded-t-2xl">
          <Link to="/home" className="text-white text-2xl">
            <FaHome />
          </Link>
        </div>

        {/* Chat Box */}
        <div
          className="flex-1 overflow-y-auto p-4 bg-gray-100"
          ref={chatBoxRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                message.sender === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400 mr-2" />
              )}
              {message.sender === 'user' && (
                <UserCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-900'
                }`}
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(message.text),
                }}
              ></div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start mb-4">
              <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400 mr-2" />
              <div className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg shadow-md animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex items-center p-4 bg-white border-t">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
