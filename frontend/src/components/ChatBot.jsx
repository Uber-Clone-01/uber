import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! Are you a Captain or a User?" },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
        const response = await axios.post('http://localhost:4000/bot/bot-res', {
          prompt: input,
        });
      
        //console.log('Backend response:', response.data);
      
        const botMessage = {
          sender: 'bot',
          text: response.data.response || "Sorry, no valid response received.",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = {
          sender: 'bot',
          text: 'Sorry, I encountered an error. Please try again later.',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
      

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;

