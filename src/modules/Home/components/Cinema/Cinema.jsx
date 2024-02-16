import React from "react";
import { Collapse, Tabs } from "antd";
import useRequest from "../../../../hooks/useRequest";
import { getDetailCinemasAPI } from "../../../../apis/cinemaAPI";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";
import "./cinema.scss";

export default function Cinema() {
  const { Panel } = Collapse;
  const navigate = useNavigate();
  const { data: cinema, isLoading } = useRequest(() => getDetailCinemasAPI());

  const handleBooking = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div id="cinema" className="cinema">
      {/* WEB*/}
      <div className="cinema_system">
        <Tabs defaultActiveKey="1" tabPosition="left">
          {cinema?.map((cinemaSystem) => {
            return (
              <Tabs.TabPane
                className="logoCinema"
                key={cinemaSystem.maHeThongRap}
                tab={
                  <div className="cinema_logo">
                    <img
                      width={50}
                      height={50}
                      src={cinemaSystem.logo}
                      alt={cinemaSystem.tenHeThongRap}
                    />
                  </div>
                }
              >
                <Tabs className="tab_info" defaultActiveKey="1" tabPosition="left">
                  {cinemaSystem.lstCumRap?.slice(0, 10).map((cinemaComplex) => {
                    return (
                      <Tabs.TabPane
                        className="cinema_scroll"
                        key={cinemaComplex.maCumRap}
                        tab={
                          <div className="cinema_info">
                            <h3 className="cinema_name">{cinemaComplex.tenCumRap}</h3>
                            <p className="cinema_address">{cinemaComplex.diaChi}</p>
                            <span className="cinema_detail">[chi tiết]</span>
                          </div>
                        }
                      >
                        {cinemaComplex.danhSachPhim.map((film, index) => {
                          return (
                            <div key={index} className="cinema_film">
                              <div className="cinema_img">
                                <img
                                  src={film.hinhAnh}
                                  alt={film.maPhim}
                                  width={100}
                                  height={150}
                                />
                              </div>

                              <div className="cinema_title">
                                <h1>
                                  {film.hot && <span className="cinema_sub">HOT</span>}
                                  {film.tenPhim}
                                </h1>
                                {film.lstLichChieuTheoPhim?.slice(0, 4).map((showtimes, idx) => {
                                  return (
                                    <button
                                      key={idx}
                                      className="cinema_date"
                                      onClick={() => handleBooking(showtimes.maLichChieu)}
                                    >
                                      {dayjs(showtimes.ngayChieuGioChieu).format(
                                        "DD-MM-YYYY ~ HH:MM"
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </Tabs.TabPane>
                    );
                  })}
                </Tabs>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>

      {/* MOBILE */}
      <div className="cinema_system_mobile">
        <Collapse onChange={onChange}>
          {cinema?.map((cinemaSystem, index) => {
            return (
              <Panel
                header={
                  <div>
                    <img
                      width={40}
                      height={40}
                      src={cinemaSystem.logo}
                      alt={cinemaSystem.tenHeThongRap}
                    />
                  </div>
                }
                key={index + 1}
              >
                <Collapse>
                  {cinemaSystem.lstCumRap?.slice(0, 10).map((cinemaComplex, idx) => {
                    return (
                      <Panel
                        header={
                          <div className="cinema_info_mobile">
                            <h3 className="cinema_name_mobile">{cinemaComplex.tenCumRap}</h3>
                            <p className="cinema_address_mobile">{cinemaComplex.diaChi}</p>
                            <span className="cinema_detail_mobile">[chi tiết]</span>
                          </div>
                        }
                        key={idx + 1}
                      >
                        {cinemaComplex.danhSachPhim.map((film, filmIndex) => {
                          return (
                            <div key={filmIndex} className="d-flex align-items-center mb-3">
                              <div>
                                <img width={60} height={80} src={film.hinhAnh} alt={film.maPhim} />
                              </div>
                              <div className="ms-3">
                                <p className="name_film_mobile">{film.tenPhim}</p>
                                {film.lstLichChieuTheoPhim
                                  ?.slice(0, 4)
                                  .map((showtimes, showtimesIndex) => {
                                    return (
                                      <button
                                        key={showtimesIndex}
                                        className="cinema_date_mobile"
                                        onClick={() => handleBooking(showtimes.maLichChieu)}
                                      >
                                        {dayjs(showtimes.ngayChieuGioChieu).format(
                                          "DD-MM-YYYY ~ HH:MM"
                                        )}
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </Panel>
                    );
                  })}
                </Collapse>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}
