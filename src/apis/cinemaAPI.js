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

export async function getDetailCinemasAPI() {
  try {
    const resp = await baseAPI.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maNhom: "GP02",
        },
      }
    );

    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}
