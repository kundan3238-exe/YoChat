import { createContext, useContext, useState , useEffect} from "react";
import { useSocket } from "./SocketContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

const { socket } = useSocket();

useEffect(() => {
  if (!socket) return;

  socket.on("newMessage", (newMessage) => {
  
   setMessages((prev) => [...prev, newMessage]);
  });

  return () => {
    socket.off("newMessage");
  };
}, [socket]);

  // console.log("ChatProvider:", selectedUser);

  return (
<ChatContext.Provider
  value={{
    selectedUser,
    setSelectedUser,
    messages,
    setMessages,
  }}
  
>
  {children}
</ChatContext.Provider>
  );
};

const useChat = () => {
  return useContext(ChatContext);
  
};

export { ChatProvider, useChat };
