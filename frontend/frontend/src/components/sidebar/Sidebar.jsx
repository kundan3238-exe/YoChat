import { useChat } from "../../context/ChatContext";
import useAuth from "../../hooks/useAuth";
import { useSocket } from "../../context/SocketContext";

const Sidebar = () => {
  const {
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
  } = useChat();

  const { user } = useAuth();
  const { onlineUsers } = useSocket();

  return (
    <aside className="w-80 h-full bg-[#17141F] border-r border-white/10 flex flex-col">
      {/* Top */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-white text-2xl font-bold">YoChat</h1>
      </div>

      {/* Middle */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <p>No conversations yet</p>
              <p className="text-sm mt-2">
                Start a new chat to begin messaging.
              </p>
            </div>
          ) : (
            conversations.map((conversation) => {
              const isOnline = onlineUsers.includes(conversation.user._id);

              return (
                <div
                  key={conversation._id}
                  onClick={() => {
                    setSelectedConversation(conversation);

                    setConversations((prev) =>
                      prev.map((chat) =>
                        chat._id === conversation._id
                          ? {
                              ...chat,
                              unreadCount: 0,
                            }
                          : chat,
                      ),
                    );
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedConversation?._id === conversation._id
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
                          {conversation.user.username}
                        </span>

                        <span
                          className={`text-xs ${
                            isOnline ? "text-green-400" : "text-gray-400"
                          }`}
                        >
                          {isOnline ? "Online" : "Offline"}
                        </span>

                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500 truncate max-w-[180px]">
                            {conversation.lastMessage.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Unread Badge */}
                    {conversation.unreadCount > 0 && (
                      <div className="min-w-6 h-6 px-2 rounded-full bg-violet-600 text-white text-xs font-semibold flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <div>
          <p className="text-white font-semibold">{user.username}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
