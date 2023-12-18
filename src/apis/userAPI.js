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
