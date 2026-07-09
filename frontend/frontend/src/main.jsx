import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
);
