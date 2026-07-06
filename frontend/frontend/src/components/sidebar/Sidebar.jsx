import React from 'react'

const Sidebar = () => {
  return (
   <aside className="w-80 h-full bg-[#17141F] border-r border-white/10 flex flex-col">
      {/* Top */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-white text-2xl font-bold">YoChat</h1>
      </div>

      {/* Middle */}
      <div className="flex-1 p-4">
        <p className="text-gray-400">Conversations will appear here.</p>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <p className="text-white">Current User</p>
      </div>
    </aside>
  );
};

export default Sidebar
