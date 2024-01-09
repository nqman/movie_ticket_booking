import baseAPI from "./baseAPI";

export async function signinAPI(credentials) {
  try {
    const resp = await baseAPI.post("/quanlynguoidung/dangnhap", credentials);
    return resp.data.content;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error.message;
  }
}

export async function signupAPI(credentials) {
  try {
    const resp = await baseAPI.post("/quanlynguoidung/dangky", credentials);
    return resp.data.content;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error.message;
  }
}

export const getUserList = async (payload) => {
  try {
    const response = await baseAPI.get("/QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP02",
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const createUser = async (user) => {
  try {
    const response = await baseAPI.post("/QuanLyNguoiDung/ThemNguoiDung", user);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await baseAPI.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export async function deleteUser(userAccount) {
  try {
    const response = await baseAPI.delete("/QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: userAccount,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
