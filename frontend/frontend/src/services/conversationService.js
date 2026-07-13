import api from "../api/axios";

//  /api/conversations
const getConversations = async () => {
  const response = await api.get("/conversations");
  return response.data;
};
const createConversation = async (receiverId) => {
  const response = await api.post("/conversations", {
    receiverId,
  });

  return response.data;
};

export default {
  getConversations,
  createConversation
};