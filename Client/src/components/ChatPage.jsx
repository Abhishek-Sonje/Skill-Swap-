import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import socket from "../socket";

const ChatPage = () => {
  const [inputValue, setInputValue] = useState("");
  //   const [isTyping, setIsTyping] = useState(false);
  //   const messagesEndRef = useRef(null);
  //   const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);
  //   return <div>Chat is initialize</div>;

  //   const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: socket.id,
        // timestamp: new Date(),
      };
      socket.emit("sendMessage", newMessage);
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  //   const formatTime = (timestamp) => {
  //     return timestamp.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //   };

  const getSkillColor = (skill) => {
    const colors = {
      "Python Developer": "linear-gradient(135deg, #3776ab 0%, #ffd43b 100%)",
      "React Developer": "linear-gradient(135deg, #61dafb 0%, #21232a 100%)",
      default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    };
    return colors[skill] || colors.default;
  };

  return (
    <div className="chat-root">
      {/* Background floating elements */}
      <div className="bg-circle circle1" />
      <div className="bg-circle circle2" />

      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-icon">💬</div>
          <div className="chat-header-texts">
            <h2 className="chat-title">SkillSwap Chat</h2>
            <p className="chat-subtitle">Connect • Learn • Grow Together</p>
          </div>
          <div className="chat-active-swappers">3 Active Swappers</div>
        </div>

        {/* Messages Container */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`chat-message-row ${
                message.sender === socket.id ? "from-me" : "from-other"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="chat-message-content-wrapper">
                {message.sender !== socket.id && (
                  <div className="chat-user-info">
                    <div
                      className="chat-avatar"
                      style={{ background: getSkillColor(message.skill) }}
                      aria-label={`Avatar for ${message.user || "User"}`}
                    >
                      {message.user?.charAt(0) || "U"}
                    </div>
                    <div className="chat-user-details">
                      <div className="chat-user-name">
                        {message.user || "User"}
                      </div>
                      <div className="chat-user-skill">
                        {message.skill || "Skill Swapper"}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`chat-bubble ${
                    message.sender === socket.id ? "me-bubble" : "other-bubble"
                  }`}
                  tabIndex={0}
                >
                  <div>{message.text}</div>
                  {/* <div className="chat-timestamp">
                      {formatTime(message.timestamp)}
                    </div> */}
                </div>
              </div>
            </div>
          ))}

          {/* {isTyping && (
              <div
                className="chat-message-row from-other"
                style={{ animationDelay: "0s" }}
              >
                <div className="chat-message-content-wrapper">
                  <div className="chat-user-info">
                    <div
                      className="chat-avatar python-avatar"
                      aria-label="Avatar for Sarah"
                    >
                      S
                    </div>
                    <div className="chat-user-details">
                      <div className="chat-user-name">Sarah</div>
                      <div className="chat-user-skill">Python Developer</div>
                    </div>
                  </div>

                  <div
                    className="chat-bubble other-bubble typing-bubble"
                    tabIndex={0}
                  >
                    <div className="typing-indicator">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className={`dot dot-${i}`} />
                      ))}
                    </div>
                    <span className="typing-text">Sarah is typing...</span>
                  </div>
                </div>
              </div>
            )} */}
          {/* <div ref={messagesEndRef} /> */}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <textarea
            //   ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Share your skills, ask questions, connect with fellow learners..."
            className="chat-textarea"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`chat-send-button ${
              inputValue.trim() ? "enabled" : "disabled"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
