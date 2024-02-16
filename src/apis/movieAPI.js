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
        maNhom: "GP09",
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
    formData.append("maNhom", "GP09");
    const resp = await baseAPI.post("/quanlyphim/themphimuploadhinh", formData);
    return resp.data.content;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error.message;
  }
}

// LẤY DANH SÁCH PHIM PHÂN TRANG
export async function getMoviesPanigation() {
  try {
    const response = await baseAPI.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP09",
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function deleteMovie(movieId) {
  try {
    const response = await baseAPI.delete("/QuanLyPhim/XoaPhim", {
      params: {
        maPhim: movieId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function updateMovie(movieId) {
  try {
    const response = await baseAPI.post("/QuanLyPhim/CapNhatPhimUpload", movieId);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// LẤY CHI TIẾT CỦA MỘT BỘ PHIM
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
