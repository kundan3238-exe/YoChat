import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import messageService from "../../services/messageService";

const MessageInput = () => {
  const { selectedUser, messages, setMessages } = useChat();

  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!selectedUser) return;

    if (!text.trim()) return;

    try {
      const newMessage = await messageService.sendMessage(
        selectedUser._id,
        text,
      );

      setMessages((prev) => [...prev, newMessage]);

      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  
  return (
  <div className="border-t border-white/10 bg-[#17141F] p-4">
    <div className="flex gap-3">
      <input
        disabled={!selectedUser}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Type a message..."
        className="flex-1 bg-[#211D2C] text-white px-4 py-3 rounded-xl outline-none placeholder:text-gray-500 disabled:opacity-50"
      />

      <button
        onClick={handleSend}
        disabled={!selectedUser}
        className="px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium disabled:opacity-50"
      >
        Send
      </button>
    </div>
  </div>
);
};

export default MessageInput;
