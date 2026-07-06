import React from 'react'

const ChatHeader = () => {
  return (
    <header className="h-20 bg-[#17141F] border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
          J
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg">
            John Doe
          </h2>

          <p className="text-green-400 text-sm">
            Online
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