import React, { useEffect, useState } from "react";
import styleFooter from "./styleFooter.module.css";
import { getLogoCinemaAPI } from "../../apis/cinemaAPI";

export default function Footer() {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLogoCinema = async () => {
      try {
        const cinemas = await getLogoCinemaAPI();
        setCinemas(cinemas);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getLogoCinema();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <footer style={{ backgroundColor: "#212121", paddingBottom: "40px" }}>
      <div className="container" style={{ padding: "0px 100px" }}>
        <div className="foot_top row">
          <div className="foot_top_left col-lg-4">
            <h6>TIX</h6>
            <div className="row">
              <div className="col">
                <a href="#">FAQ</a>
              </div>
              <div className="col">
                <a href="#">Thỏa thuận sử dụng</a>
              </div>
              <div class="w-100"></div>
              <div className="col">
                <a href="#">Brand Guidelines</a>
              </div>
              <div className="col">
                <a href="#">Chính sách bảo mật</a>
              </div>
            </div>
          </div>
          <div className="foot_top_mid col-lg-4">
            <h6>ĐỐI TÁC</h6>
            {cinemas.map((cinema) => (
              <a>
                <img className={styleFooter.size30_30px} src={cinema.logo} />
              </a>
            ))}
          </div>
          <div className="mobile_app col-lg-2">
            <h6>MOBILE APP</h6>
            <img
              className={styleFooter.size30_30px}
              src="./image/apple-logo.png"
              alt="apple-logo"
            />
            <img
              className={styleFooter.size30_30px}
              src="./image/androi-logo.png"
              alt=""
            />
          </div>
          <div className="social col-lg-2">
            <h6>SOCIAL</h6>
            <img
              className={styleFooter.size30_30px}
              src="./image/fb.png"
              alt=""
            />
            <img
              className={styleFooter.size30_30px}
              src="/image/zalo.png"
              alt=""
            />
          </div>
        </div>
        <hr style={{ color: "#f5f7ea" }} />
        <div className="foot_bottom row">
          <div className="foot_bottom_left col-2">
            <img
              src="./image/zion.jpeg"
              alt="zion"
              style={{ width: "100px" }}
            />
          </div>
          <div className="foot_bottom_mid col-8">
            <h5>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h5>
            <h5>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </h5>
            <h5>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</h5>
            <h5>
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </h5>
            <h5>Số Điện Thoại (Hotline): 1900 545 436</h5>
          </div>
          <div className="foot_bottom_right col-2 ">
            <img
              src="https://demo1.cybersoft.edu.vn/static/media/daThongBao-logo.cb85045e.png"
              alt=""
              style={{ width: "100px" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
