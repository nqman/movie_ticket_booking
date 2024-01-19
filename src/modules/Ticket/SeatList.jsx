import React from "react";
import SeatRow from "./SeatRow";

const colNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function SeatList({ dataRows }) {
  return (
    <>
      <div style={{ paddingLeft: "40px" }}>
        {colNumbers.map((number, index) => (
          <button
            key={index}
            className="btn btn-outline-none text-warning fw-bold text-center fs-4 m-2 p-0"
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            {number}
          </button>
        ))}
      </div>
      {dataRows.map((dataRow, index) => {
        return <SeatRow key={index} dataRow={dataRow} />;
      })}
    </>
  );
}
