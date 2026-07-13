import { useEffect, useState } from "react";
import userService from "../../services/userService";
import conversationService from "../../services/conversationService";
import { useChat } from "../../context/ChatContext";
import useAuth from "../../hooks/useAuth";

const SearchModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [creatingConversation, setCreatingConversation] = useState(false);

  const {
    conversations,
    setConversations,
    setSelectedConversation,
  } = useChat();

  const { user: currentUser } = useAuth();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Search users from backend
  useEffect(() => {
    if (!isOpen) return;

    if (!debouncedSearch.trim()) {
      setUsers([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const { users } = await userService.searchUsers(debouncedSearch);

        setUsers(users);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch, isOpen]);

  const handleStartChat = async (user) => {
    if (creatingConversation) return;

    setCreatingConversation(true);

    try {
      const { conversation } =
        await conversationService.createConversation(user._id);

      const existingConversation = conversations.find(
        (chat) => chat._id === conversation._id
      );

      if (existingConversation) {
        setSelectedConversation(existingConversation);
      } else {
        const chatPartner = conversation.participants.find(
          (participant) => participant._id !== currentUser._id
        );

        const newConversation = {
          _id: conversation._id,
          user: chatPartner,
          lastMessage: conversation.lastMessage,
          updatedAt: conversation.updatedAt,
          unreadCount: 0,
        };

        setConversations((prev) => [newConversation, ...prev]);
        setSelectedConversation(newConversation);
      }

      setSearch("");
      setUsers([]);

      onClose();
    } catch (error) {
      console.error("Failed to create conversation:", error);
    } finally {
      setCreatingConversation(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[420px] rounded-2xl bg-[#17141F] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-white">
            Start New Chat
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username or email..."
          className="w-full rounded-xl bg-[#211D2C] text-white px-4 py-3 outline-none"
        />

        {/* Results */}
        <div className="mt-5 space-y-2 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400">
              <span className="loading loading-infinity loading-xl"></span>
            </p>
          ) : users.length === 0 && debouncedSearch.trim() ? (
            <p className="text-center text-gray-400">
              No users found.
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  if (!creatingConversation) {
                    handleStartChat(user);
                  }
                }}
                className={`flex items-center justify-between p-3 rounded-xl transition ${
                  creatingConversation
                    ? "opacity-50 pointer-events-none"
                    : "bg-[#211D2C] hover:bg-[#2B2538] cursor-pointer"
                }`}
              >
                <div>
                  <p className="text-white font-medium">
                    {user.username}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {user.email}
                  </p>
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