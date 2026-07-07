import api from "../api/axios";
import axios from "../api/axios";

const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export default {
  getUsers,
};
