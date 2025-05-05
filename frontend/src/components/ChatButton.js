import React, { useState } from "react";
import { FaComments } from "react-icons/fa"; // Иконка чата
import ChatPopup from "./ChatPopup"; // Импорт компонента чата

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Иконка чата */}
      <button className="chat-button" onClick={toggleChat}>
        <FaComments size={24} />
      </button>

      {/* Всплывающее окно чата */}
      {isChatOpen && <ChatPopup />}
    </>
  );
};

export default ChatButton;