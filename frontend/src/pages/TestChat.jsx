// src/pages/TestChat.jsx
import Chat from "./Chat";

const TestChat = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Chat Test</h1>
      <Chat projectId="64a7d8e9c29f5b001f7d1234" userId="64a7d8e9c29f5b001f7d5678" />
    </div>
  );
};

export default TestChat;
