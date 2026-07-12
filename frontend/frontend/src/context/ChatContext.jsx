import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import useAuth from "../hooks/useAuth";
import conversationService from "../services/conversationService";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const chatUserId =
        newMessage.senderId === user._id
          ? newMessage.receiverId
          : newMessage.senderId;

      // Only append if this conversation is currently open
if (selectedConversation?.user._id === chatUserId) {
  setMessages((prev) => [...prev, newMessage]);
}
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) => {
          if (conversation._id !== newMessage.conversationId) {
            return conversation;
          }
          return {
            ...conversation,
            lastMessage: newMessage,
            updatedAt: newMessage.createdAt,

unreadCount:
  newMessage.senderId !== user._id &&
  selectedConversation?.user._id !== conversation.user._id
    ? conversation.unreadCount + 1
    : conversation.unreadCount,
          };
        });

        const updatedConversation = updatedConversations.find(
          (conversation) => conversation._id === newMessage.conversationId,
        );

        const remainingConversations = updatedConversations.filter(
          (conversation) => conversation._id !== newMessage.conversationId,
        );

        return [updatedConversation, ...remainingConversations];
      });
    });
    return () => {
      socket.off("newMessage");
    };
}, [socket, selectedConversation, user]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { conversations } = await conversationService.getConversations();
        const formattedConversations = conversations.map((conversation) => {
          const chatPartner = conversation.participants.find(
            (participant) => participant._id !== user._id,
          );
          return {
            _id: conversation._id,
            user: chatPartner,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
            unreadCount: 0,
          };
        });

        console.log(formattedConversations);
        setConversations(formattedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);
  useEffect(() => {
    console.log("Conversations state:", conversations);
  }, [conversations]);


  return (
    <ChatContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
        conversations,
        setConversations,
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
