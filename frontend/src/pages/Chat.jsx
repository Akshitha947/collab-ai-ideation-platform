
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/chats";
const SOCKET_URL = "http://localhost:5000";

const Chat = ({ projectId = "demo-project" }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  // Initialize socket only once
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit("joinProject", projectId);

    // Listen for new messages
    socketRef.current.on("newMessage", (msg) => {
      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    // Listen for deleted messages
    socketRef.current.on("deleteMessage", (id) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [projectId]);

  // Load initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/${projectId}`);
        const uniqueMessages = Array.from(
          new Map(res.data.map((m) => [m._id, m])).values()
        );
        setMessages(uniqueMessages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [projectId]);

  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await axios.post(API_URL, { projectId, text: message });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto border rounded p-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="mb-2 p-2 bg-white rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-gray-500 text-lg" />
              <span>{msg.text}</span>
            </div>
            <button
              onClick={() => deleteMessage(msg._id)}
              className="text-red-500 text-xs ml-2"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border px-3 py-2 rounded-l"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
