import { useState } from "react";
import dayjs from "dayjs";

export default function Showtimes({ showtimes }) {
  const [cinemas, setCinemas] = useState([]);

  const handleSelectCinemaSystem = (id) => {
    const cinemas = showtimes.find((item) => item.maHeThongRap === id)?.cumRapChieu;

    setCinemas(cinemas);
  };

  return (
    <div>
      {/* Hiển thị hệ thống rạp */}
      {showtimes.map((cinemaSystem) => {
        return (
          <div key={cinemaSystem.maHeThongRap}>
            <img
              src={cinemaSystem.logo}
              alt={cinemaSystem.tenHeThongRap}
              width={50}
              height={50}
              onClick={() => handleSelectCinemaSystem(cinemaSystem.maHeThongRap)}
            />
          </div>
        );
      })}

      {/* Hiển thị cụm rạp và lịch chiếu */}
      {cinemas.map((cinema) => {
        return (
          <div key={cinema.maCumRap}>
            <h3>{cinema.tenCumRap}</h3>
            {cinema.lichChieuPhim.map((item) => {
              return (
                <button key={item.maLichChieu}>
                  {dayjs(item.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm")}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
