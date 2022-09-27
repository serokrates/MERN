import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
// get user from local storage
// JWT is saved to local storage so we check
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // if it is in local storage we set it to user, if not the person should login
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: "",
};
// we make async thunk function to talk to our backend in order to register the user
// we are going to dispatch this function from register page and pass the "user" data
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.reasponse &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // it will send the error message as the payload
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.reasponse && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // it will send the error message as the payload
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//  https://redux-toolkit.js.org/api/createSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // we will dispatch this function after we register to reset these values to false
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  //
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // here comes the message from "register" --- return thunkAPI.rejectWithValue(error);
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // here comes the message from "login" --- return thunkAPI.rejectWithValue(error);
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// now we can use this reset reducer in a components we want it to fire off
export const { reset } = authSlice.actions;
export default authSlice.reducer;
