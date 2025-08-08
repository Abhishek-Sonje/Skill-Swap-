import socket from "../socket";
import { useParams,useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);
  console.log("User Data:", userData);
  const { _id } = userData || {};
  console.log("User ID:", _id);
  console.log("Socket ID:", socket.id);
  const { receiverId } = useParams();

  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await axios.get(
        `${backendUrl}/api/chat/${_id}/${receiverId}`
      );
      setChat(
        res.data.map((m) => ({
          message: m.message,
          sender: m.sender,
          receiver: m.receiverId,
        }))
      );
    };

    fetchMessage();

    socket.emit("registerUser", { userId: _id });

    socket.emit("joinPrivateRoom", { fromUserId: _id, toUserId: receiverId });

    socket.on("chatInitialized", ({ roomId }) => {
      setRoomId(roomId);
      console.log("Chat initialized in room:", roomId);
    });

    // Receive private messages
    socket.on("privateMessage", ({ message, sender }) => {
      setChat((prevChat) => [...prevChat, { message, sender }]);
      console.log("New message received:", message, "from", sender);
    });

    return () => {
      socket.off("chatInitialized");
      socket.off("privateMessage");
    };
  }, [_id, receiverId, backendUrl]);

  const sendMessage = () => {
    if (message.trim() && roomId) {
      socket.emit("privateMessage", {
        roomId,
        message,
        sender: _id,
        receiver: receiverId,
      });
      setMessage("");
    }
  };

  return (
   
  
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        marginTop: "80px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#4a90e2",
          color: "#fff",
          padding: "15px 20px",
          fontSize: "18px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            marginRight: "16px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Back"
        >
          &#8592;
        </button>
        Private Chat
      </div>

      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          background: "#f7f7f7",
        }}
      >
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === _id ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                background: msg.sender === _id ? "#4a90e2" : "#e5e5ea",
                color: msg.sender === _id ? "#fff" : "#000",
                padding: "10px 14px",
                borderRadius: "18px",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ddd",
          background: "#fff",
        }}
      >
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "12px 20px",
            background: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
