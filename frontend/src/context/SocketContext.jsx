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

   const newSocket = io("http://localhost:5000", {
  withCredentials: true,
  auth: {
    userId: user._id,
  },
});

    setSocket(newSocket);
newSocket.on("onlineUsers", (users) => {
  console.log("🟢 Online Users:", users);
  setOnlineUsers(users);
});
    return () => {
      newSocket.disconnect();
      newSocket.off("onlineUsers");

    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocket };