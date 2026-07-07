import API from "../api/axios";

//!GET /api/messages/:receiverId
const getMessages = async (receiverId) => {
  const response = await API.get(`/messages/${receiverId}`);
  return response.data;
};

//! POST /api/messages/:receiverId
const sendMessage = async (receiverId, message) => {
  const response = await API.post(
    `/messages/${receiverId}`,
    {
      message,
    }
  );

  return response.data;
};

export default {
  getMessages,
  sendMessage,
};
export default messageService;
