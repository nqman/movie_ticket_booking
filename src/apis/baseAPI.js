import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NSIsIkhldEhhblN0cmluZyI6IjI0LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjUwODgwMDAwMCIsIm5iZiI6MTY4Nzg4NTIwMCwiZXhwIjoxNzE2NjU2NDAwfQ.HsoestvkIN5Kub3jnAr8UddrPugJcxCsAm4QfMi4ZbU",
  },
});
baseAPI.interceptors.request.use(
  (request) => {
    // Làm cái gì đó trước khi request được gửi đi
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      request.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }
    return request;
  },
  (error) => {
    // Làm cái gì đó khi request bị lỗi
    return Promise.reject(error);
  }
);

baseAPI.interceptors.response.use(
  (response) => {
    // Chạy vào đây nếu trả về response status trong khoảng 200-299
    // Làm gì đó với kết quả trả về
    return response;
  },
  (error) => {
    // Chạy vào đây nếu trả về response status KHÔNG trong khoảng 200-299
    // Làm gì đó với lỗi trả về

    // Kiểm tra nếu mã lỗi là 401 => token hết hạn => đăng xuất
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/sign-in");
    }
    return Promise.reject(error);
  }
);

export default baseAPI;
