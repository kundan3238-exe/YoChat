import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    conversation.lastMessage = newMessage._id;
    await conversation.save();
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
