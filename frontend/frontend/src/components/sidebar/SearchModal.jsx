import { useEffect, useState } from "react";
import userService from "../../services/userService";

const SearchModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  console.log("SearchModal isOpen:", isOpen);

  useEffect(() => {
    console.log("useEffect fired. isOpen =", isOpen);

    if (!isOpen) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const data = await userService.getUsers();
        console.log("Users API Response:", data);

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[420px] rounded-2xl bg-[#17141F] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-white">Start New Chat</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full rounded-xl bg-[#211D2C] text-white px-4 py-3 outline-none"
        />

        <div className="mt-5 space-y-2 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400">
              <span className="loading loading-infinity loading-xl"></span>
            </p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#211D2C] hover:bg-[#2B2538] cursor-pointer transition"
              >
                <div>
                  <p className="text-white font-medium">{user.username}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
