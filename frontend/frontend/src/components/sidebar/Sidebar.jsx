import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import userService from "../../services/userService";
import useAuth from "../../hooks/useAuth";
import { useSocket } from "../../context/SocketContext";
import { useUsers } from "../../context/UserContext";

const Sidebar = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const { users, setUsers } = useUsers();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { onlineUsers } = useSocket();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();

        setUsers(
          data.map((user) => ({
            ...user,
            unreadCount: 0,
          })),
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  // console.log("Users:", users);

  if (loading) {
    return (
      <aside className="w-80 h-full bg-[#17141F] border-r border-white/10 flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>{" "}
      </aside>
    );
  }

  return (
    <aside className="w-80 h-full bg-[#17141F] border-r border-white/10 flex flex-col">
      {" "}
      {/* Top */}{" "}
      <div className="p-6 border-b border-white/10">
        {" "}
        <h1 className="text-white text-2xl font-bold">YoChat</h1>{" "}
      </div>{" "}
      {/* Middle */}{" "}
      <div className="flex-1 overflow-y-auto p-4">
        {" "}
        <div className="space-y-2">
          {users.map((chatUser) => {
            const isOnline = onlineUsers.includes(chatUser._id);

           return (
  <div
    key={chatUser._id}
    onClick={() => {
      setSelectedUser(chatUser);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === chatUser._id
            ? { ...user, unreadCount: 0 }
            : user
        )
      );
    }}
    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      selectedUser?._id === chatUser._id
        ? "bg-violet-600"
        : "bg-[#211D2C] hover:bg-[#2B2538]"
    }`}
  >
    <div className="flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Online Status */}
        <div className="inline-grid *:[grid-area:1/1]">
          {isOnline && (
            <div className="status status-success animate-ping"></div>
          )}

          <div
            className={`status ${
              isOnline ? "status-success" : "status-neutral"
            }`}
          ></div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-white font-medium">
            {chatUser.username}
          </span>

          <span
            className={`text-xs ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Unread Badge */}
      {chatUser.unreadCount > 0 && (
        <div className="min-w-6 h-6 px-2 rounded-full bg-violet-600 text-white text-xs font-semibold flex items-center justify-center">
          {chatUser.unreadCount}
        </div>
      )}
    </div>
  </div>
);
          })}
        </div>{" "}
      </div>{" "}
      {/* Bottom */}{" "}
      <div className="p-4 border-t border-white/10">
        {" "}
        <div>
          <p className="text-white font-semibold">{user.username}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>{" "}
      </div>{" "}
    </aside>
  );
};
export default Sidebar;
