import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createUser, getUserList, updateUser, deleteUser } from "../../../apis/userAPI";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import adminUserStyles from "./adminUser.module.scss";
import Swal from "sweetalert2";
import { Box, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const userSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự và không được để trống,1 ký tự hoa, 1 ký tự thường và 1 ký tự số "
    ),
  email: string().required("Email không được để trống").email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
  maLoaiNguoiDung: string().required("Mã người dùng không được để trống"),
});

export default function AdminUser() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: "",
    },
    resolver: yupResolver(userSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onSubmit",
  });

  const {
    mutate: handleCreateUser,
    error: errorCreateUser,
    isLoading: isLoadingCreateUser,
  } = useMutation({
    mutationFn: (payload) => createUser(payload),
  });

  const {
    data: userList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userlist"],
    queryFn: getUserList,
  });

  const onSubmit = (values) => {
    if (isUpdating) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success me-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Your changes will be discarded!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update it!",
        reverseButtons: true,
      });
      // Thực hiện hàm cập nhật
      updateUser(values);
      swalWithBootstrapButtons.fire("Updated!", "Your account has been updated", "success");
    } else {
      // Thực hiện hàm thêm mới
      handleCreateUser(values);
    }
    queryClient.invalidateQueries(["userlist"]);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  const selectUser = (user) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-2",
        cancelButton: "btn btn-danger me-2 ",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Your changes will be discarded!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Populate form values from selected user
          setValue("taiKhoan", user.taiKhoan);
          setValue("matKhau", user.matKhau);
          setValue("email", user.email);
          setValue("hoTen", user.hoTen);
          setValue("soDt", user.soDt);
          setValue("maLoaiNguoiDung", user.maLoaiNguoiDung);
          setValue("maNhom", user.maNhom);
          setIsUpdating(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          reset(); // Reset form values
          setIsUpdating(false);
          swalWithBootstrapButtons.fire("Cancelled", "Your account is still there", "error");
        }
      });
  };

  // xóa tài khoản
  const handleDeleteUser = (TaiKhoan) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-2",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUser(TaiKhoan)
            .then(() => {
              console.log("Xóa thành cong");
              queryClient.invalidateQueries(["userlist"]);
            })
            .catch((error) => {
              // Xử lý lỗi nếu có.
              console.error("Lỗi xóa phim:", error);
            });
          swalWithBootstrapButtons.fire("Deleted!", "Your account has been deleted", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Cancelled", "Your account is still there", "error");
        }
      });
  };
  return (
    <div>
      <Box sx={{ display: "flex", paddingLeft: "18%" }}>
        <Grid container>
          <div className={`${adminUserStyles.form}`}>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                  {/* TÀI KHOẢN INPUT  */}
                  <div className={`${adminUserStyles.input_account}`}>
                    <label htmlFor="">Tài khoản</label>
                    <input type="text" placeholder="Tài Khoản" {...register("taiKhoan")} />

                    {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
                  </div>
                  {/* MẬT KHẨU INPUT  */}
                  <div className={`${adminUserStyles.input_password}`}>
                    <label htmlFor="">Mật Khẩu</label>
                    <input type="password" placeholder="Mật khẩu" {...register("matKhau")} />

                    {errors.matKhau && <p>{errors.matKhau.message}</p>}
                  </div>
                  {/* EMAIL INPUT  */}
                  <div className={`${adminUserStyles.input_email}`}>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email" {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>

                  {/* HỌ TÊN INPUT */}
                  <div className={`${adminUserStyles.input_name}`}>
                    <label htmlFor="">Họ tên </label>
                    <input type="text" placeholder="Họ tên" {...register("hoTen")} />
                    {errors.hoTen && <p>{errors.hoTen.message}</p>}
                  </div>

                  {/* SĐT INPUT */}
                  <div className={`${adminUserStyles.input_phone}`}>
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" placeholder="SĐT" {...register("soDt")} />
                    {errors.soDt && <p>{errors.soDt.message}</p>}
                  </div>

                  <div className={`${adminUserStyles.input_usertype}`}>
                    <label htmlFor="">Loại người dùng</label>

                    <select id="cars" {...register("maLoaiNguoiDung")}>
                      <option value="KhachHang">Khách Hàng</option>
                      <option value="QuanTri">Quản trị</option>
                    </select>

                    {errors.maLoaiNguoiDung && <p>{errors.maLoaiNguoiDung.message}</p>}
                  </div>

                  <div className={`${adminUserStyles.input_group}`}>
                    <label htmlFor="">Mã nhóm</label>
                    <input type="text" placeholder="Mã Nhóm" {...register("maNhom")} />
                    {errors.maNhom && <p>{errors.maNhom.message}</p>}
                  </div>

                  {/* button submit */}
                  <div className="text-center mt-2 mb-4">
                    {isUpdating ? (
                      <button className="btn btn-success btn-lg" type="submit" disabled={isLoading}>
                        CẬP NHẬT
                      </button>
                    ) : (
                      <button className="btn btn-success btn-lg" type="submit" disabled={isLoading}>
                        THÊM NGƯỜI DÙNG
                      </button>
                    )}
                    {error && <p>{error}</p>}
                  </div>
                </div>
              </form>
            </Grid>
          </div>

          <Grid item xs={12} md={6} style={{ maxWidth: "100%" }}>
            <div style={{ height: 550, width: "100%" }}>
              <DataGrid
                rows={userList.map((user, index) => ({ ...user, id: index + 1 }))}
                columns={[
                  { field: "hoTen", headerName: "Họ tên", width: 200 },
                  { field: "email", headerName: "Email", width: 200 },
                  { field: "soDT", headerName: "Số Điện Thoại", width: 200 },
                  {
                    field: "maLoaiNguoiDung",
                    headerName: "LOẠI NGƯỜI DÙNG",
                    width: 200,
                    valueGetter: (params) =>
                      params.value === "KhachHang" ? "Khách hàng" : "Quản trị",
                  },
                  {
                    field: "hanhDong",
                    headerName: "HÀNH ĐỘNG",
                    width: 220,
                    renderCell: (params) => (
                      <div>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => handleDeleteUser(params.row.taiKhoan)}
                        >
                          XÓA
                        </button>
                        <button
                          className="btn btn-warning me-3"
                          onClick={() => selectUser(params.row)}
                        >
                          {isUpdating ? <span>Updating</span> : <span>Update</span>}
                        </button>
                      </div>
                    ),
                  },
                ]}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
