import User from "../models/User.js";
import Conversation from "../models/Conversation.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // All users except me
    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // Conversations sorted by latest activity
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    }).sort({ updatedAt: -1 });

    const orderedUsers = [];

    // Add users with conversations first
    conversations.forEach((conversation) => {
      const otherUserId = conversation.participants.find(
        (id) => id.toString() !== loggedInUserId.toString()
      );

      const chatUser = users.find(
        (user) => user._id.toString() === otherUserId.toString()
      );

      if (
        chatUser &&
        !orderedUsers.some(
          (user) => user._id.toString() === chatUser._id.toString()
        )
      ) {
        orderedUsers.push(chatUser);
      }
    });

    // Add users with no conversations
    users.forEach((user) => {
      if (
        !orderedUsers.some(
          (u) => u._id.toString() === user._id.toString()
        )
      ) {
        orderedUsers.push(user);
      }
    });

    return res.status(200).json(orderedUsers);
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const searchUsers = async (req, res) => {
  try {
const loggedInUserId = req.user._id;
const { q } = req.query;
const users = await User.find({
  _id: { $ne: loggedInUserId },
  $or: [
    {
      username: {
        $regex: q,
        $options: "i",
      },
    },
    {
      email: {
        $regex: q,
        $options: "i",
      },
    },
  ],
}).select("username email");
return res.status(200).json({
  success: true,
  users,
});

  } catch (error) {
    console.error("Search Users Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { getUsersForSidebar, searchUsers };