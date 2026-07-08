import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import userService from "../../services/userService";

const Sidebar = () => {
  const { setSelectedUser } = useChat();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
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
      <div className="flex-1 p-4">
        {" "}
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className="p-3 rounded-lg bg-[#211D2C] cursor-pointer hover:bg-[#2B2538] transition-colors"
            >
              {user.username}
            </div>
          ))}
        </div>{" "}
      </div>{" "}
      {/* Bottom */}{" "}
      <div className="p-4 border-t border-white/10">
        {" "}
        <p className="text-white">Current User</p>{" "}
      </div>{" "}
    </aside>
  );
};
export default Sidebar;
