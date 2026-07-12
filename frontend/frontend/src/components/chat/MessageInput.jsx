import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import messageService from "../../services/messageService";

const MessageInput = () => {
  const { selectedConversation } = useChat();

  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSending) return;
    if (!selectedConversation) return;
    if (!text.trim()) return;

    setIsSending(true);

    try {
      await messageService.sendMessage(selectedConversation.user._id, text);

      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="border-t border-white/10 bg-[#17141F] p-4">
      <div className="flex gap-3">
        <input
          disabled={!selectedConversation || isSending}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-[#211D2C] text-white px-4 py-2.5 rounded-xl outline-none placeholder:text-gray-500 disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={!selectedConversation || isSending}
          className="px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
