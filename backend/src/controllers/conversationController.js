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
const createConversation = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { receiverId } = req.body;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [loggedInUserId, receiverId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [loggedInUserId, receiverId],
      });
    }
    conversation = await conversation.populate(
      "participants",
      "username email",
    );
    return res.status(200).json({
      success: true,
      conversation,
    });

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [loggedInUserId, receiverId],
      },
    }).populate("participants", "username email");
  } catch (error) {
    console.error("Create Conversation Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { getConversations, createConversation };
