import React from "react";
import data from "./data.json";
import SeatList from "./SeatList";
import Tickets from "./Tickets";

export default function MovieTicket() {
  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-8">
          <h3 className="text-center fw-bold">ĐẶT VÉ XEM PHIM</h3>
          <SeatList dataRows={data} />
        </div>
        <div className="col-4">
          <h3 className=" text-center fw-bold mb-4">DANH SÁCH GHẾ BẠN CHỌN</h3>
          <Tickets />
        </div>
      </div>
    </div>
  );
}
