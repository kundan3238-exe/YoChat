import MessageBubble from "./MessageBubble";

const MessageArea = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#0E0C14] p-6">
      <div className="flex flex-col gap-4">
        <MessageBubble />
        <MessageBubble />
        <MessageBubble />
      </div>
    </main>
  );
};

export default MessageArea;