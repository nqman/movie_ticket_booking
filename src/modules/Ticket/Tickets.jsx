import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Tickets() {
  const selectedSeats = useSelector((state) => {
    return state.movieTicket.selectedSeats;
  });
  const totalPrice = useSelector((state) => {
    return state.movieTicket.totalPrice;
  });
  const dispatch = useDispatch();
  const handleRemove = (item) => {
    dispatch({ type: "movieTicket/removeTicket", payload: item });
  };
  const handlePay = () => {
    dispatch({ type: "movieTicket/payTicket", payload: selectedSeats });
  };
  return (
    <div>
      <div className="typeSeat">
        <ul>
          <li style={{ listStyle: "none", marginBottom: "10px" }}>
            <button
              className="btn me-3"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#EB7F87",
              }}
            ></button>
            Ghế đã đặt
          </li>
          <li style={{ listStyle: "none", marginBottom: "10px" }}>
            <button
              className="btn btn-success me-3"
              style={{
                width: "40px",
                height: "40px",
                fontSize: "15px",
              }}
            ></button>
            Ghế đang chọn
          </li>
          <li style={{ listStyle: "none", marginBottom: "10px" }}>
            <button
              className="btn btn-outline-warning me-3"
              style={{
                width: "40px",
                height: "40px",
                fontSize: "15px",
              }}
            ></button>
            Ghế chưa đặt
          </li>
        </ul>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Số ghế</th>
              <th style={{ width: "200px" }}>Giá</th>
              <th style={{ width: "100px" }}>Hủy</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeats.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td
                  className="btn btn-outline-danger"
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => handleRemove(item)}
                >
                  X
                </td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td>Tổng tiền</td>
              <td>{totalPrice}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="text-end">
          <button className="btn btn-primary" onClick={handlePay}>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
