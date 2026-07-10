import Conversation from "../models/Conversation.js";

const getConversations = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // We'll add the query next.
  } catch (error) {
    console.error("Get Conversations Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { getConversations };