import React from "react";
import "../Application/application.css";

export default function Application() {
  return (
    <div className="app container">
      <div className="app_left">
        <p>Ứng dụng tiện lợi dành cho</p>
        <p>người yêu điện ảnh</p>
        <p>
          Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi
          quà hấp dẫn.
        </p>
        <button>APP MIỄN PHÍ - TẢI VỀ NGAY!</button>
        <p>
          TIX có hai phiên bản{" "}
          <a
            target="_blank"
            href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
          >
            IOS
          </a>
          &
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123&pli=1"
          >
            Android
          </a>
        </p>
      </div>
      <div className="app_right"></div>
    </div>
  );
}
