import Conversation from "../models/Conversation.js";

const getConversations = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    })
      .populate("participants", "username email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    console.log(JSON.stringify(conversations, null, 2));
    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("Get Conversations Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { getConversations };
