import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getUserIn4 } from "../../../apis/userAPI";

export default function UserInfo() {
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getUserIn4()); // Gọi API để lấy thông tin cá nhân
        const userInfo = response.data; // Giả sử phản hồi API trả về dữ liệu người dùng

        reset({
          taiKhoan: userInfo?.taiKhoan,
          matKhau: userInfo?.matKhau,
          email: userInfo?.email,
          soDt: userInfo?.soDt,
          hoTen: userInfo?.hoTen,
          maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await dispatch(getUserIn4(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-update">
      <h1 className="user-title">Thông tin người dùng</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            {/* tài khoản */}
            <div className="form-group mb-3">
              <label className="form-label">Tài Khoản</label>
              <input
                className="form-control"
                type="text"
                placeholder="Tài khoản"
                disabled
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Tài khoản không được để trống",
                  },
                })}
              />
              {errors.taiKhoan && <p className="text-danger">{errors.taiKhoan.message}</p>}
            </div>

            {/* mật khẩu */}
            <div className="form-group mb-3">
              <label className="form-label">Mật Khẩu</label>
              <input
                className="form-control"
                type="text"
                placeholder="Mật khẩu"
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                  minLength: {
                    value: 3,
                    message: "Mật khẩu phải từ 4 đến 8 ký tự",
                  },
                  maxLength: {
                    value: 8,
                    message: "Mật khẩu phải từ 4 đến 8 ký tự",
                  },
                })}
              />
              {errors.matKhau && <p className="text-danger">{errors.matKhau.message}</p>}
            </div>

            {/* email */}
            <div className="form-group mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email không được để trống",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email không đúng định dạng",
                  },
                })}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            {/* số điện thoại */}
            <div className="form-group mb-3">
              <label className="form-label">Số Điện Thoại</label>
              <input
                className="form-control"
                type="text"
                placeholder="Số điện thoại"
                {...register("soDt", {
                  required: {
                    value: true,
                    message: "Số điện thoại không được để trống",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Vui lòng nhập số",
                  },
                })}
              />
              {errors.soDt && <p className="text-danger">{errors.soDt.message}</p>}
            </div>

            {/* họ tên */}
            <div className="form-group mb-3">
              <label className="form-label">Họ Tên</label>
              <input
                className="form-control"
                type="text"
                placeholder="Họ tên"
                {...register("hoTen", {
                  required: {
                    value: true,
                    message: "Họ tên không được để trống",
                  },
                })}
              />
              {errors.hoTen && <p className="text-danger">{errors.hoTen.message}</p>}
            </div>
          </div>
        </div>

        <div className="add-user-btn mt-3">
          <button className="btn btn-dark">Cập Nhật</button>
        </div>
      </form>
    </div>
  );
}
