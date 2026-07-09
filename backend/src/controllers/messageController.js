import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getIO, getOnlineUsers } from "../sockets/socket.js";

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
    // console.log("Conversation after find/create:", conversation);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // console.log("Conversation after find/create:", conversation);

    console.log(req.body);
    console.log(message);

    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      message,
    });
    // console.log("Conversation after find/create:", conversation);

    conversation.lastMessage = newMessage._id;
    await conversation.save();

    const onlineUsers = getOnlineUsers();
    const receiverSocketId = onlineUsers[receiverId];

    const senderSocketId = onlineUsers[senderId];
    const io = getIO();

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    console.log("Sender:", senderId);
    console.log("Receiver:", receiverId);

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }
    console.log("Conversation:", conversation);

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    console.log("Conversation ID:", conversation._id);
    console.log("Messages from DB:", messages);

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Get Message Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { sendMessage, getMessages };
