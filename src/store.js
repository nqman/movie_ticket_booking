import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/slices/authSlice";
import ticketSlice from "./Redux/slices/ticketSlice";
import adminSlice from "./Redux/slices/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminSlice,
    ticket: ticketSlice,
  },
});

export default store;
