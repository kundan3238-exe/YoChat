import { useChat } from "../../context/ChatContext";

const ChatHeader = () => {
  const { selectedUser } = useChat();
  
  if (!selectedUser) {
    return (
      <header className="h-20 bg-[#17141F] border-b border-white/10 flex items-center px-6">
      <h2 className="text-gray-400 text-lg">
        Select to Start Chatting
      </h2>
    </header>
  );
}
// console.log("Selected User:", selectedUser);
  return (
    
    <header className="h-20 bg-[#17141F] border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
          {selectedUser.username.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg">
            {selectedUser.username}
          </h2>

          <p className="text-green-400 text-sm">
            @{selectedUser.username}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition">
          📞
        </button>

        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition">
          ⋮
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;