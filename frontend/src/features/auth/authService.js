// strictly for making the http request and sending any data back and into locak storage
import axios from "axios";
// endpoint
const API_URL = "/api/users/";

// registering the user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  // axios is putting the response in response.data
  if (response.data) {
    // we are passign the response to local storage, we are checking this local storage in authSlice.js in a 5 row
    //  --- const user = JSON.parse(localStorage.getItem("user")); ----
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(localStorage);
  }

  return response.data;
};

const logout = async (userData) => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
