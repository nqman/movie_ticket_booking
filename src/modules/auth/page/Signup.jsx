import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { signupAPI } from "../../../apis/userAPI";
import formStyles from "../components/formStyles.module.scss";
import { Button } from "@mui/base";
const validationSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu phải có ít nhất 8 kí tự, gồm 1 kí tự hoa, 1 kí tự thường và 1 kí tự số"
    ),
  email: string().required("Email không được để trống").email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      await signupAPI(values);
      navigate("/sign-in");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${formStyles.form}`}>
      <form
        noValidate
        onSubmit={handleSubmit(handleSignup)}
        className={`${formStyles.form_background}`}
      >
        <div className={`${formStyles.form_container}`}>
          {/* TÀI KHOẢN INPUT  */}
          <div className={`${formStyles.form_input}`}>
            <label>Tài Khoản</label>
            <input
              className={`${formStyles.input_taiKhoan}`}
              type="text"
              placeholder="Tài Khoản"
              {...register("taiKhoan")}
            />
            {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
          </div>
          {/* MẬT KHẨU INPUT  */}
          <div className={`${formStyles.form_input}`}>
            <label>Mật Khẩu</label>
            <input
              className={`${formStyles.input_matKhau}`}
              type="password"
              placeholder="Mật khẩu"
              {...register("matKhau")}
            />
            {errors.matKhau && <span>{errors.matKhau.message}</span>}
          </div>
          {/* EMAIL INPUT  */}
          <div className={`${formStyles.form_input}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`${formStyles.input_email}`}
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          {/* HỌ TÊN INPUT */}
          <div className={`${formStyles.form_input}`}>
            <label>Họ Tên</label>
            <input
              type="text"
              placeholder="Họ tên"
              className={`${formStyles.input_hoTen}`}
              {...register("hoTen")}
            />
            {errors.hoTen && <span>{errors.hoTen.message}</span>}
          </div>
          {/* SĐT INPUT */}
          <div className={`${formStyles.form_input}`}>
            <label>Số Điện Thoại</label>
            <input
              type="text"
              placeholder="SĐT"
              className={`${formStyles.input_sdt}`}
              {...register("soDt")}
            />
            {errors.soDt && <span>{errors.soDt.message}</span>}
          </div>

          {error && <p>{error}</p>}
          {/* button submit */}

          <Button type="submit" disabled={isLoading}>
            Đăng Ký
          </Button>
        </div>
      </form>
    </div>
  );
}
