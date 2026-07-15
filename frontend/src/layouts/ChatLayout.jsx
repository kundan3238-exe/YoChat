import Sidebar from "../components/sidebar/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageArea from "../components/chat/MessageArea";
import MessageInput from "../components/chat/MessageInput";

const ChatLayout = () => {
  return (
    <>
      <div className="flex h-screen">
    <Sidebar />

    <div className="flex flex-col flex-1">
        <ChatHeader />
        <MessageArea />
        <MessageInput />
    </div>
</div>
    </>
  )
}

export default ChatLayout
