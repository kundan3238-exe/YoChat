import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import messageService from "../../services/messageService";
import MessageBubble from "./MessageBubble";

const MessageArea = () => {
  const { selectedUser } = useChat();
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!selectedUser) return;

  const fetchMessages = async () => {
  try {
    setLoading(true);

    const data = await messageService.getMessages(selectedUser._id);

    console.log("API Response:", data);

    setMessages(data);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  } finally {
    setLoading(false);
  }
};

  fetchMessages();
}, [selectedUser]);


console.log("Selected User:", selectedUser);
console.log("Messages:", messages);

  return (
    
    <main className="flex-1 overflow-y-auto bg-[#0E0C14] p-6">
      <div className="flex flex-col gap-4">
        <MessageBubble />
        <MessageBubble />
        <MessageBubble />
      </div>
    </main>
  );
};

export default MessageArea;