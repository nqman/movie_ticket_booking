import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinAPI } from "../../../apis/userAPI";

export const signin = createAsyncThunk("auth/signin", async (values) => {
  const data = await signinAPI(values);
  // Lưu thông tin đăng nhập vào localStorage
  localStorage.setItem("currentUser", JSON.stringify(data));
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      return { ...state, isLoading: true, error: null };
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      return { ...state, isLoading: false, currentUser: action.payload };
    });

    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
  },
});

export default authSlice.reducer;
