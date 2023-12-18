import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
