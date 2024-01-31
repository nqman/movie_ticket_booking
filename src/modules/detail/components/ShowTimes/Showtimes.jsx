import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getMovieDetailsAPI } from "../../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Showtime({ movieId }) {
  const [cinemas, setCinemas] = useState([]);
  const navigate = useNavigate();

  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieShowtimes", movieId],
    queryFn: () => getMovieDetailsAPI(movieId),
    // nếu giá trị movieId là null hay undefined thì không gọi
    enabled: !!movieId,
  });
  const cinemaSystems = data.heThongRapChieu || [];

  const handleGetCinemaSystem = (cinemaSystemId) => {
    const found = cinemaSystems.find((item) => item.maHeThongRap === cinemaSystemId);
    setCinemas(found.cumRapChieu);
  };

  // console.log("Các cụm rạp chiếu :",cinemaSystems);
  console.log("Rạp đang chọn", cinemas);

  // hiển thị cụm rạp chiếu đầu tiên
  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems]);
  return (
    <div>
      <div className="container">
        {/* Render Hệ Thống Rạp */}
        <div>
          <h1 className="pt-3 text-warning">Danh Sách Rạp Đang Chiếu</h1>
        </div>
        <div className="d-flex justify-content-center pt-2">
          {cinemaSystems.map((cinemaSystem) => {
            return (
              <div key={cinemaSystem.maHeThongRap} className="p-3">
                <img
                  onClick={() => {
                    handleGetCinemaSystem(cinemaSystem.maHeThongRap);
                  }}
                  src={cinemaSystem.logo}
                  width={50}
                  height={50}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        {/* Render Danh Sách Rạp */}
        {cinemas.map((cinema) => {
          return (
            <div>
              <div key={cinema.tenCumRap}>
                <div className="d-flex  justify-content-center p-3">
                  <h3 className="me-4">{cinema.tenCumRap}</h3>
                  {/* Render Danh Sách Rạp */}
                  {cinema.lichChieuPhim.map((showtime) => {
                    const time = dayjs(showtime.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH : mm");
                    // onClick = {()=>navigate(`/tickets/${showtime.maLichChieu}`)}
                    return (
                      <button onClick={() => navigate(`/tickets/${showtime.maLichChieu}`)}>
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
