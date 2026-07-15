import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/sidebar/Sidebar";
import ChatHeader from "./components/chat/ChatHeader";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/ch" element={<ChatHeader />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
