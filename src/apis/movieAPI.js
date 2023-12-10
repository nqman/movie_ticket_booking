import baseAPI from "./baseAPI";

export async function getBannerAPI() {
  try {
    const resp = await baseAPI.get("/QuanLyPhim/LayDanhSachBanner");
    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}

export async function getMoviesAPI() {
  try {
    const resp = await baseAPI.get("/QuanLyPhim/LayDanhSachPhim");
    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}
