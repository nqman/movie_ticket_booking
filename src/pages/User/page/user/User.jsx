import React from "react";
import useRequest from "../../../../hooks/useRequest";
import { getUserIn4 } from "../../../../apis/userAPI";
import cn from "classnames";
import UserInfo from "../../UserInfo/UserInfo";
import UserBooking from "../../UserBooking/UserBooking";
import { TitleFunction } from "../../../../utils/TitleFunction";
import "./User.module.scss";

export default function User() {
  TitleFunction("User Information");

  const { data: userInfo } = useRequest(() => getUserIn4());

  const numTickets = userInfo?.thongTinDatVe.reduce((total, item) => {
    return total + item.danhSachGhe.length;
  }, 0);

  const numBooking = userInfo?.thongTinDatVe.length;

  return (
    <div style={{ marginTop: "64px" }} className="user">
      <div className="user-main">
        <div className="user-info">
          <p className="user-photo">{userInfo?.taiKhoan.slice(0, 1).toUpperCase()}</p>
          <p className="user-name">{userInfo?.hoTen}</p>
          <p
            className={cn("user-type text-primary", {
              "text-danger": userInfo?.maLoaiNguoiDung === "QuanTri",
            })}
          >
            {userInfo?.loaiNguoiDung.tenLoai}
          </p>

          <div className="user-info-booking">
            <p>
              Số lần đặt vé: <strong className="text-success">{numBooking}</strong>
            </p>
            <p>
              Số vé đã đặt: <strong className="text-success">{numTickets}</strong>
            </p>
          </div>
        </div>

        <div className="user-show">
          <div className="infomation">
            <UserInfo userInfo={userInfo} />
          </div>

          <div className="history">
            <UserBooking userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
