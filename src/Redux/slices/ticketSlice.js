import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookingTickets } from "../../apis/TicketAPI";

const initialState = {
  tickets: [],
  isLoading: null,
  error: false,
};

export const bookingTicket = createAsyncThunk(
  "home/ticket/booking",
  async (booking, { rejectWithValue }) => {
    try {
      await bookingTickets(booking);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const TicketSlice = createSlice({
  name: "home/ticket",
  initialState,
  reducers: {},
});

export default TicketSlice.reducer;
