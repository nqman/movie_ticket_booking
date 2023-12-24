import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Box, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import dayjs from "dayjs";
import { getMovieDetailsAPI } from "../../../../../apis/cinemaAPI";
import { ButtonMovie } from "../../ButtonMovie";

export default function ShowingSelect({ movies }) {
  const [movie, setMovie] = useState("");
  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState("");
  const [codeTimeCinema, setCodeTimeCinema] = useState("");
  const [errors, setErrors] = useState(false);
  const { data: cinemas = [] } = useQuery({
    queryKey: ["listCinema", movie],
    queryFn: () => getMovieDetailsAPI(movie),
    enabled: !!movie,
  });

  const [dateCinemas, setDateCinemas] = useState([]);
  const navigate = useNavigate();

  const handleChangeMovie = (event) => {
    // console.log(evt.target.value);
    setMovie(event.target.value);
  };

  const handleChangeCinema = (event) => {
    setCinema(event.target.value);
    setDateCinemas(event.target.value.cumRapChieu);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  return (
    <Paper
      style={{
        position: "absolute",
        width: "100%",
        height: "80px",
        zIndex: "1000",
        top: "-40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 80, width: 1 / 4 }} color="warning">
          <InputLabel id="demo-simple-select-autowidth-label">Phim</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={movie}
            onChange={handleChangeMovie}
            error={!!errors}
            autoWidth
            label="Phim"
          >
            <MenuItem value="">
              <em>Chọn phim</em>{" "}
            </MenuItem>
            {movies.map((movieItem) => {
              return (
                <MenuItem key={movieItem.maPhim} value={movieItem.maPhim}>
                  {movieItem.tenPhim}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80, width: 1 / 4 }} color="warning">
          <InputLabel id="demo-simple-select-autowidth-label">Rạp</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={cinema}
            onChange={handleChangeCinema}
            error={!!errors}
            autoWidth
            label="Rạp"
          >
            <MenuItem value="">
              <em>Chọn rạp</em>
            </MenuItem>
            {cinemas.heThongRapChieu?.map((cinemaItem) => {
              return (
                <MenuItem key={cinemaItem.maHeThongRap} value={cinemaItem}>
                  {cinemaItem.tenHeThongRap}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80, width: 1 / 4 }} color="warning">
          <InputLabel id="demo-simple-select-autowidth-label">Ngày giờ chiếu</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={date}
            onChange={handleChangeDate}
            error={!!errors}
            autoWidth
            label="Ngày giờ chiếu"
          >
            <MenuItem value="">
              <em>Chọn ngày giờ chiếu</em>
            </MenuItem>

            {dateCinemas.map((dateCinema) => {
              return (
                <MenuItem key={dateCinema.maCumRap} value={dateCinema.maCumRap}>
                  {dateCinema.lichChieuPhim.map((showtime) => {
                    const time = dayjs(showtime.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH:mm");
                    return (
                      <span
                        key={showtime.maLichChieu}
                        onClick={() => {
                          setCodeTimeCinema(showtime.maLichChieu);
                          console.log(showtime.maLichChieu);
                        }}
                      >
                        {time}
                      </span>
                    );
                  })}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <ButtonMovie
          margin={0}
          height="56px"
          onClick={() => {
            if (!codeTimeCinema) {
              setErrors(true);
              navigate(`/`);
            } else {
              setErrors(false);
              navigate(`/tickets/${codeTimeCinema}`);
            }
          }}
        >
          mua vé ngay
        </ButtonMovie>
      </Box>
    </Paper>
  );
}
