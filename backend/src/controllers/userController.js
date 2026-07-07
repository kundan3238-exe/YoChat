import User from "../models/User.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({
      _id: {
        $ne: loggedInUserId,
      },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export { getUsersForSidebar };