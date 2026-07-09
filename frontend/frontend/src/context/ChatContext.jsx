import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

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
