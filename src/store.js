import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/slices/authSlice";

// Tạo reducer
const movieTicketState = {
  selectedSeats: [],
  totalPrice: 0,
  bookedSeats: [],
};
const movieTicketReducer = (state = movieTicketState, action) => {
  switch (action.type) {
    case "movieTicket/selectSeat": {
      const { isSelected, ...seat } = action.payload;
      if (isSelected) {
        const selectedSeats = [...state.selectedSeats, seat];
        const totalPrice = state.totalPrice + seat.price;
        return { ...state, selectedSeats, totalPrice };
      }
      const selectedSeats = state.selectedSeats.filter(
        (item) => item.name !== seat.name
      );
      const totalPrice = state.totalPrice - seat.price;
      return { ...state, selectedSeats, totalPrice };
    }
    case "movieTicket/removeTicket": {
      const selectedSeats = state.selectedSeats.filter(
        (item) => item.name !== action.payload.name
      );
      const totalPrice = state.totalPrice - action.payload.price;
      return { ...state, selectedSeats, totalPrice };
    }
    case "movieTicket/payTicket": {
      const selectedSeats = action.payload;
      const bookedSeats = selectedSeats.map((seat) => {
        return { ...seat, booked: true };
      });
      const totalPrice = 0;
      return { ...state, selectedSeats: [], bookedSeats, totalPrice };
    }
    default:
      return state;
  }
};
const store = configureStore({
  reducer: {
    auth: authReducer,
    movieTicket: movieTicketReducer,
  },
});
const state = store.getState();
export default store;
