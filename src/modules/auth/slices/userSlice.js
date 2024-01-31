import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserIn4,
  updateUserClient,
} from "../../../apis/userAPI";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  search: "",
};

export const getUsers = createAsyncThunk("home/admin/getUsers", async (_, { rejectWithValue }) => {
  try {
    const data = await getUserIn4();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addUser = createAsyncThunk(
  "home/admin/addUser",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      await createUser(values); // Sử dụng hàm createUser từ baseAPI
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "home/admin/deleteUser",
  async (account, { dispatch, rejectWithValue }) => {
    try {
      await deleteUser(account); // Sử dụng hàm deleteUser từ baseAPI
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUsers = createAsyncThunk(
  "home/admin/updateUser",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      await updateUser(values); // Sử dụng hàm updateUser từ baseAPI
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "home/admin/users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
