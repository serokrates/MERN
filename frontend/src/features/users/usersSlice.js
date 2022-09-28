import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      return await usersService.getUsers();
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
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.deleteUser(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeStatus = createAsyncThunk(
  "users/change",
  async (dataPut, thunkAPI) => {
    const { id, statuss } = dataPut;
    console.log(" ", dataPut);
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      let response = await usersService.changeStatus(dataPut, token);
      return await usersService.getUsers();
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // wywalamy tego użytkownika z users którego id wysłaliśmy w delete
        state.users = state.users.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        // state.users = state.users.findByIdAndUpdate(
        //   (goal) => goal._id !== action.payload.id
        // );
      })

      //   User.findByIdAndUpdate(action.payload.id, req.body, {
      //     new: true,
      //   });

      .addCase(changeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
