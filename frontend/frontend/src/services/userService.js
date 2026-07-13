import api from "../api/axios";
import axios from "../api/axios";

const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
const searchUsers = async (search) => {
  const response = await api.get("/users/search", {
    params: {
      q: search,
    },
  });

  return response.data;
};
export default {
  getUsers,
  searchUsers
};
