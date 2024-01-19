// import { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";

export default function SeatItem({ seat, isSelected }) {
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch({
      type: "movieTicket/selectSeat",
      payload: { ...seat, isSelected: !isSelected },
    });
  };

  return (
    <button
      key={seat.name}
      className={cn("btn  m-2", {
        "btn-danger": seat.booked,
        "btn-success": isSelected,
        "btn-outline-warning": !seat.booked && !isSelected,
      })}
      disabled={seat.booked}
      onClick={handleSelect}
      style={{
        width: "40px",
        height: "40px",
        fontSize: "15px",
        color: "black",
        textAlign: "center",
        padding: "0",
      }}
    >
      {seat.name}
    </button>
  );
}
