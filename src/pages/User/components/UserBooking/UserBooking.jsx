import React from "react";
import dayjs from "dayjs";
import "./UserBooking.module.scss";

export default function UserBooking({ userInfo }) {
  return (
    <div className="user-history">
      <h1 className="user-history-title">Lịch sử đặt vé</h1>

      <div className="user-history-booking">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Phim</th>
              <th>Thời Lượng Phim</th>
              <th>Tên Rạp</th>
              <th>Ngày Đặt</th>
              <th>Mã Vé</th>
              <th>Tên Ghế</th>
              <th>Giá Vé</th>
              <th>Tổng Tiền</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {userInfo?.thongTinDatVe.map((list, index) => {
              return (
                <tr key={index}>
                  <td>
                    <strong>{index + 1}</strong>
                  </td>
                  <td>{list.tenPhim}</td>
                  <td>{list.thoiLuongPhim} Phút</td>
                  <td>{list?.danhSachGhe.slice(0, 1).map((item) => item.tenRap)}</td>
                  <td>{dayjs(list.ngayDat).format("DD/MM/YYYY")}</td>
                  <td>{list.maVe}</td>
                  <td>{list?.danhSachGhe.map((item) => item.tenGhe + ", ")}</td>
                  <td>{Number(list.giaVe).toLocaleString()} đ</td>
                  <td>{Number(list.giaVe * list.danhSachGhe.length).toLocaleString()} đ</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
