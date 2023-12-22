import React from "react";
import styleApp from "./styleApp.module.css";

export default function App() {
  return (
    <div
      className="row"
      style={{ backgroundImage: "url(./image/bg_app.jpg)", height: "600px" }}
    >
      <div className={`col-lg-6 ${styleApp.app_left}`}>
        <p style={{ fontSize: "32px" }}>Ứng dụng tiện lợi dành cho</p>
        <p style={{ fontSize: "32px", marginBottom: "30px" }}>
          người yêu điện ảnh
        </p>
        <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm</p>
        <p style={{ marginTop: "-10px" }}>rạp và đổi quà hấp dẫn.</p>
        <button className={styleApp.button_app}>
          APP MIỄN PHÍ - TẢI VỀ NGAY
        </button>
        <p>
          TIX có hai phiên bản{" "}
          <a className={styleApp.store} href="http://">
            IOS
          </a>{" "}
          &
          <a className={styleApp.store} href="http://">
            {" "}
            Android
          </a>
        </p>
      </div>
      <div className={`col-lg-6 ${styleApp.app_right}`}>
        {/* <div className="col-lg-6 app_right"> */}
        <img src="./image/phone_border.png" style={{ width: "200px" }} alt="" />
        <img
          src="./image/ccee.jpg"
          style={{ width: "190px", borderRadius: "20px" }}
          alt=""
        />
      </div>
    </div>
  );
}
