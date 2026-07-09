import { useEffect, useState ,useRef} from "react";
import { useChat } from "../../context/ChatContext";
import messageService from "../../services/messageService";
import MessageBubble from "./MessageBubble";

const MessageArea = () => {
const {
  selectedUser,
  messages,
  setMessages,
} = useChat();

const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!selectedUser) return;

  const fetchMessages = async () => {
  try {
    setLoading(true);

    const data = await messageService.getMessages(selectedUser._id);

    // console.log("API Response:", data);

    setMessages(data);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  } finally {
    setLoading(false);
  }
};

  fetchMessages();
}, [selectedUser]);

const bottomRef = useRef(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);


// console.log("Selected User:", selectedUser);
// console.log("Messages:", messages);

  return (
    
    <main className="flex-1 overflow-y-auto bg-[#0E0C14] p-6">
<div className="flex flex-col gap-4">
  {messages.map((msg) => (
    <MessageBubble
      key={msg._id}
      message={msg}
    />
  ))}
</div>
<div ref={bottomRef}></div>
    </main>
    
  );
};

export default MessageArea;