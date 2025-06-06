import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I\'m your e-waste recycling assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();
      setInput('');
      setIsLoading(true);

      // Add user message to chat
      setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
          // Check for specific error statuses
          let errorMessage = 'Sorry, I\'m having trouble connecting right now. Please try again later.';
          if (response.status === 429) {
            errorMessage = 'You have sent too many requests. Please wait a moment before trying again.';
          } else if (response.status >= 400 && response.status < 500) {
            errorMessage = `Error: ${response.status}. There was a problem with your request.`;
          } else if (response.status >= 500) {
             errorMessage = `Error: ${response.status}. The server encountered an issue. Please try again later.`;
          }
          console.error('API Error:', response.status, response.statusText);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Add bot response to chat
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error:', error);
        // Add error message to chat
        setMessages(prev => [...prev, { 
          text: error.message || 'An unexpected error occurred.', 
          sender: 'bot' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <img src="/images/chatbot-icon.jpg" alt="Chatbot Icon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        <div className="chat-header">
          <button className="back-button" onClick={toggleChat}>&larr;</button>
          <h2>Green-Gaurd Assistant</h2>
        </div>
        <div className="chat-body">
          <div className="message-history">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask about e-waste recycling..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            {isLoading ? '...' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 