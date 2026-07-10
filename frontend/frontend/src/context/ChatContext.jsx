import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import { useUsers } from "./UserContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const { setUsers } = useUsers();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);

      const chatUserId =
        newMessage.senderId === user._id
          ? newMessage.receiverId
          : newMessage.senderId;

      setUsers((prevUsers) => {
        const chatUser = prevUsers.find((u) => u._id === chatUserId);

        if (!chatUser) return prevUsers;

        const remainingUsers = prevUsers.filter((u) => u._id !== chatUserId);

        return [chatUser, ...remainingUsers];
      });
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
