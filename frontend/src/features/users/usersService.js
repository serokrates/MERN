import axios from "axios";
import authService from "../auth/authService";
const API_URL = "/api/users/";

const getUsers = async (token) => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteUser = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "me/" + userID, config);
  // if()
  // await authService.logout();
  return response.data;
};

const changeStatus = async (dataPut, token) => {
  const userID = dataPut[0];
  const statuss = dataPut[1];
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    status: statuss,
  };
  const response = await axios.put(API_URL + "me/" + userID, data, config);
  return response.data;
};

const usersService = {
  getUsers,
  deleteUser,
  changeStatus,
};

export default usersService;
