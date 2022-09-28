import axios from "axios";

const API_URL = "/api/users/";

const getUsers = async (token) => {
  const response = await axios.get(API_URL);
  console.log("getUsers: ", response);
  return response.data;
};

const deleteUser = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "me/" + userID, config);

  return response.data;
};

const changeStatus = async (dataPut, token) => {
  const userID = dataPut[0];
  const statuss = dataPut[1];
  console.log(statuss, "  ", userID, "  ", token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    status: statuss,
  };
  const response = await axios.put(API_URL + "me/" + userID, data, config);
  console.log("change Status: ", response);
  return response.data;
};

const usersService = {
  getUsers,
  deleteUser,
  changeStatus,
};

export default usersService;
