import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SeatItem from "./SeatItem";

export default function SeatRow({ dataRow }) {
  const { seats, row } = dataRow;
  const [newSeats, setNewSeats] = useState(seats);

  const bookedSeats = useSelector((state) => {
    return state.movieTicket.bookedSeats;
  });

  // hàm so sánh giá trị nếu trùng name thì lấy key và value mới của bookedSeats
  function changeSeats(seats, bookedSeats) {
    for (let i = 0; i < seats.length; i++) {
      const arr1 = seats[i];

      const arr2 = bookedSeats.find((item) => item.name === arr1.name);

      if (arr2) {
        seats[i] = arr2;
      }
    }
    setNewSeats([...seats]);
    // return seats;
  }

  useEffect(() => {
    changeSeats(seats, bookedSeats);
  }, [seats, bookedSeats]);

  // Danh sách ghế đang được chọn
  const selectedSeats = useSelector((state) => {
    return state.movieTicket.selectedSeats; // reducer movieTicket
  });
  return (
    <div className="rowName">
      <span
        className="text-warning fw-bold fs-4 text-center"
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
        }}
      >
        {row}
      </span>

      {newSeats.map((seat) => {
        const found = selectedSeats.find((item) => item.name === seat.name);
        return <SeatItem key={seat.name} seat={seat} isSelected={!!found} />;
      })}
    </div>
  );
}
