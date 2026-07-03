import api from "../api/axios";

const authService = {
    register: async (userData) => {
        const response = await api.post ("/auth/register", userData) 
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials)
        return response.data
    },

    logout: async () => {
        const respose = await api.get("/auth/me")
        return response.data
    }
}

export default authService;