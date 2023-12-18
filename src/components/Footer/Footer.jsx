import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="foot_top">
        <div className="foot_top_left">
          <h6>TIX</h6>
          <a href="#">FAQ</a>
          <a href="#">Brand Guidelines</a>
          <a href="#">Brand Guidelines</a>
          <a href="#">Thỏa thuận sử dụng</a>
          <a href="#">Chính sách bảo mật</a>
        </div>
        <div className="foot_top_mid">
          <h6>ĐỐI TÁC</h6>
          <a href="https://www.cgv.vn/">
            <img src="./image/cgv.png" alt="cgv" />
          </a>
        </div>
        <div className="foot_top_right">
          <div className="mobile_app">
            <h6>MOBILE APP</h6>
            <img src="./image/apple-logo.png" alt="apple-logo" />
            <img src="./image/androi-logo.png" alt="" />
          </div>
          <div className="social">
            <h6>SOCIAL</h6>
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <hr />
      <div className="foot_bottom">
        <div className="foot_bottom_left">
          <img src="./image/zion.jpeg" alt="zion" />
        </div>
        <div className="foot_bottom_mid">
          <h6>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h6>
          <h6>
            Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
          </h6>
          <h6>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</h6>
          <h6>
            đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành
            phố Hồ Chí Minh cấp.
          </h6>
          <h6>Số Điện Thoại (Hotline): 1900 545 436</h6>
        </div>
        <div className="foot_bottom_right">
          <img
            src="https://demo1.cybersoft.edu.vn/static/media/daThongBao-logo.cb85045e.png"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
}
