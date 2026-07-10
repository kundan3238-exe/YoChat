import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import { useUsers } from "./UserContext";
import useAuth from "../hooks/useAuth";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const { setUsers } = useUsers();
  const { user } = useAuth();

  useEffect(() => {
    if (!socket) return;

   socket.on("newMessage", (newMessage) => {
  const chatUserId =
    newMessage.senderId === user._id
      ? newMessage.receiverId
      : newMessage.senderId;

  // Only append if this conversation is currently open
  if (selectedUser?._id === chatUserId) {
    setMessages((prev) => [...prev, newMessage]);
  }

  setUsers((prevUsers) => {
    const updatedUsers = prevUsers.map((chatUser) => {
  if (chatUser._id !== chatUserId) {
    return chatUser;
  }

  const shouldIncrease =
    newMessage.senderId !== user._id &&
    selectedUser?._id !== chatUserId;

  return {
    ...chatUser,
    unreadCount: shouldIncrease
      ? chatUser.unreadCount + 1
      : chatUser.unreadCount,
  };
});

const movedUser = updatedUsers.find(
  (user) => user._id === chatUserId
);

const remainingUsers = updatedUsers.filter(
  (user) => user._id !== chatUserId
);

return [movedUser, ...remainingUsers];  });
});
    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedUser, user, setUsers]);

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
