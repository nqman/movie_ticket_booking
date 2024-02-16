import baseAPI from "./baseAPI";
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

export async function bookingTickets(booking) {
  try {
    const response = await baseAPI.post("/QuanLyDatVe/DatVe", booking);

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
