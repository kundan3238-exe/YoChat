import useAuth from "../../hooks/useAuth";

const MessageBubble = ({ message }) => {
  const { authUser } = useAuth();

  const isMyMessage = message.senderId === authUser._id;

  return (
    <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isMyMessage ? "bg-violet-600 text-white" : "bg-[#211D2C] text-white"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default MessageBubble;
