import Sidebar from "../components/sidebar/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageArea from "../components/chat/MessageArea";
import MessageInput from "../components/chat/MessageInput";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-[#0E0C14]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <MessageArea />

        <MessageInput />
      </div>
    </div>
  );
};

export default Dashboard;