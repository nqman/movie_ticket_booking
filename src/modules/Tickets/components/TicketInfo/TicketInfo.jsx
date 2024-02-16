import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookingTicket } from "../../../../Redux/slices/ticketSlice";
import Swal from "sweetalert2";
import "./TicketInfo.scss";
export default function TicketInfo({ ticketId, tickets, checkList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const seatList = checkList?.reduce((total, item) => {
    return total + " Ghế " + item.tenGhe + ", ";
  }, "");

  const totalPrice = checkList.reduce((total, item) => {
    return total + item.giaVe;
  }, 0);

  const booking = {
    maLichChieu: ticketId,
    danhSachVe: checkList,
  };

  const handleTicket = async () => {
    if (seatList) {
      try {
        await dispatch(bookingTicket(booking)).unwrap();
        Swal.fire("Đặt vé thành công!");

        navigate("/User");
      } catch (error) {
        Swal.fire("Vui lòng chọn ghếaaaas!");
      }
    } else {
      Swal.fire("Vui lòng chọn ghế!");
    }
  };

  return (
    <div className="book">
      <div className="book-details">
        <div className="book-title">
          <div className="book-img">
            <img
              width={150}
              height={200}
              src={tickets?.thongTinPhim.hinhAnh}
              alt={tickets?.thongTinPhim.tenPhim}
            />
          </div>
          <h1 className="book-name">{tickets?.thongTinPhim.tenPhim}</h1>
        </div>

        <div className="book-info">
          <div className="book-item">
            <h3>Cụm rạp:</h3>
            <p>{tickets?.thongTinPhim.tenCumRap}</p>
          </div>

          <div className="book-item">
            <h3>Tên rạp:</h3>
            <p>{tickets?.thongTinPhim.tenRap}</p>
          </div>

          <div className="book-item">
            <h3>Ngày giờ chiếu:</h3>
            <p>
              {tickets?.thongTinPhim.ngayChieu}
              <span> - </span>
              <span style={{ color: "red" }}>{tickets?.thongTinPhim.gioChieu}</span>
            </p>
          </div>

          <div className="book-item">
            <h3>Địa chỉ:</h3>
            <p>{tickets?.thongTinPhim.diaChi}</p>
          </div>

          <div className="book-item list">
            <h3>Ghế đã chọn:</h3>
            <p className="book-list">{seatList}</p>
          </div>
        </div>

        <div className="book-buy">
          <div className="buy">
            <h3 className="total">Thành Tiền: </h3>
            <p className="price">{Number(totalPrice).toLocaleString()} VNĐ</p>
          </div>

          <div className="book-btn">
            <button className="book-btn" onClick={handleTicket}>
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
