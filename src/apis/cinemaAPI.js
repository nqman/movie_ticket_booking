import baseAPI from "./baseAPI";

export async function getMovieDetailsAPI(movieId) {
  try {
    const resp = await baseAPI.get("QuanLyRap/LayThongTinLichChieuPhim", {
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
        maNhom: "GP09",
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}



export async function getDetailCinemasAPI() {
  try {
    const resp = await baseAPI.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: "GP09",
      },
    });

    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}
