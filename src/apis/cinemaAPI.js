import baseAPI from "./baseAPI";

export async function getMovieDetailsAPI(movieId) {
  try {
    const resp = await baseAPI.get("quanlyrap/laythongtinlichchieuphim", {
      params: {
        maPhim: movieId,
      },
    });
    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}
export async function getLogoCinemaAPI() {
  try {
    const resp = await baseAPI.get("quanlyrap/LayThongTinHeThongRap");
    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await baseAPI.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getTickets(showtimeId) {
  try {
    const response = await baseAPI.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        maLichChieu: showtimeId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function bookingTickets(showtimeId, danhSachVe) {
  try {
    const response = await baseAPI.post("/QuanLyDatVe/DatVe", {
      maLichChieu: showtimeId,
      danhSachVe: danhSachVe,
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addMovie(movie) {
  try {
    const response = await baseAPI.post("/QuanLyPhim/ThemPhimUpLoadHinh", movie);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}


export async function getCinemaTheater(cinemaId) {
  try {
    const response = await baseAPI.get("/QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap: cinemaId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getCinemaShowTimes(cinemaId) {
  try {
    const response = await baseAPI.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maHeThongRap: cinemaId,
        maNhom: "GP02",
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function createShowTime(movie) {
  try {
    const response = await baseAPI.post("/QuanLyDatVe/TaoLichChieu", movie);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
