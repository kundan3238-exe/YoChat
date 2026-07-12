import API from "../api/axios";

// GET /api/conversations
const getConversations = async () => {
  const response = await API.get("/conversations");
  return response.data;
};

export default {
  getConversations,
};