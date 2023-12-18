import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../slices/authSlice";
import { Navigate, useSearchParams } from "react-router-dom";
import formStyles from "../components/formStyles.module.scss";
export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onSubmit",
  });
  const [searchParams] = useSearchParams();

  const { currentUser, isLoading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignin = async (values) => {
    try {
      await dispatch(signin(values)).unwrap();
      alert("Đăng nhập thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  if (currentUser) {
    // Nếu có thông tin đăng nhập của user => điều hướng về trang home
    const url = searchParams.get("from") || "/";
    return <Navigate to={url} replace />;
  }

  return (
    <div className={`${formStyles.form}`}>
      <div>
        <form
          onSubmit={handleSubmit(handleSignin, handleError)}
          className={`${formStyles.form_background}`}
        >
          <div className={`${formStyles.form_container}`}>
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Tài Khoản</label>
              <input
                placeholder="Tài Khoản"
                {...register("taiKhoan")}
                className={`${formStyles.input_taiKhoan}`}
              />
              {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Mật Khẩu</label>
              <input
                className={`${formStyles.input_matKhau}`}
                type="password"
                placeholder="Mật Khẩu"
                {...register("matKhau")}
              />
              {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-success btn-lg" type="submit" disabled={isLoading}>
                Đăng Nhập
              </button>
              {error && <p>{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
