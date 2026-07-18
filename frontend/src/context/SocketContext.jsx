import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
      auth: {
        userId: user._id,
      },
    });

    // 👇 Add this
    newSocket.onAny((event, ...args) => {
      console.log("📡 Socket Event:", event, args);
    });

    newSocket.on("onlineUsers", (users) => {
      console.log("🟢 Online Users:", users);
      setOnlineUsers(users);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off();
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };