import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(true); // Управление видимостью чата
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Функция для отправки запроса в Hugging Face API
  const getHuggingFaceResponse = async (messages) => {
    const API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";  // Здесь указываем модель
    const API_TOKEN = "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";  // Вставьте ваш API токен

    try {
      const response = await axios.post(
        API_URL,
        { inputs: messages.map(msg => msg.content).join('\n') },
        {
          headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          }
        }
      );
      return response.data[0].generated_text;
    } catch (error) {
      throw new Error('Ошибка при получении ответа от ИИ');
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await getHuggingFaceResponse([userMessage]);
      const botMessage = { role: 'bot', content: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botErrorMessage = { role: 'bot', content: error.message };
      setMessages((prev) => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="chat-popup"
    >
      <div className="chat-header">
        <h3>Чат с ботом</h3>
        <button className="close-button" onClick={() => setIsOpen(false)}>
          ✖
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="chat-message bot">Бот печатает...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          Отправить
        </button>
      </div>
    </motion.div>
  );
};

export default ChatPopup;
