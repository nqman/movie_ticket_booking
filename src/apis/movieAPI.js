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
    const resp = await baseAPI.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP02",
      },
    });

    return resp.data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
}
export async function createMovieAPI(movie) {
  try {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP02");
    const resp = await baseAPI.post("/quanlyphim/themphimuploadhinh", formData);
    return resp.data.content;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error.message;
  }
}
