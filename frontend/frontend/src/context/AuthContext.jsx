import {createContext, useState ,useEffect} from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
        const data = await authService.getCurrentUser()
        setUser(data.user)
    } catch (error) {
        setUser(null)
    }finally{
        setLoading(false)
    }
  }

const login = async (credentials) => {
    const data = await authService.login(credentials)
    setUser(data.user)
    return data
}

const register = async (userData) => {
    const data = await authService.register(userData)
    setUser(data.user)
    return data
}

const logout = async () => {
    await authService.logout()
    setUser(null)
}
useEffect(() => {
  checkAuth();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
