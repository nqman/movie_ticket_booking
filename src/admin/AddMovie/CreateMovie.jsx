import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { createMovieAPI, getMoviesAPI, deleteMovie, updateMovie } from "../../apis/movieAPI.js";
import { useQuery } from "@tanstack/react-query";
import adminMovieStyles from "./adminMovie.module.scss";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./adminMovie.module.scss";
import { Box, Grid } from "@mui/material";

const movieFormSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  // hinhAnh: string().required("Hình ảnh không được để trống"),
  trailer: string().required("Trailer không được để trống"),
  ngayKhoiChieu: string().required("Ngày khởi chiếu không được để trống"),
});

export default function CreateMovie() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //SweetAlert
  const MySwal = withReactContent(Swal);

  // lấy danh sách phim
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getMoviesAPI"],
    queryFn: getMoviesAPI,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
    resolver: yupResolver(movieFormSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const picture = watch("hinhAnh");

  const [imgPreview, setImgPreview] = useState("");
  const handleCreateMovie = async (values) => {
    try {
      const payload = { ...values, hinhAnh: values.hinhAnh?.[0] };
      await createMovieAPI(payload);
      // Navigate vè trang danh sách hoăc tắt model và goi lai API get
    } catch (error) {
      console.log(error);
    } finally {
      // cap nhat state loading thanh false
    }
  };
  const [formValues, setFormValues] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    moTa: "",
    hinhAnh: "",
    trailer: "",
    ngayKhoiChieu: "",
  });
  const handleChangeImage = (evt) => {
    console.log(evt.target.files);
    const file = evt.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue); // In ra giá trị mỗi khi người dùng gõ

    // Lưu giá trị vào state
    setValue(inputValue);
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    console.log(formValues);
  };

  const onSubmit = (values) => {
    if (isUpdating) {
      // Thực hiện hàm cập nhật
      handleUpdateMovie(values);
    } else {
      // Thực hiện hàm thêm mới
      handleCreateMovie(values);
    }
    queryClient.invalidateQueries(["movies"]);
  };
  useEffect(() => {
    // chạy vào useEffect call back khi giá trị của hinhAnh bị thay đổi
    const file = picture?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [picture]);

  // xóa phim
  const handleDeleteMovie = (maPhim) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMovie(maPhim)
            .then(() => {
              console.log("thành công xóa");
            })
            .catch((error) => {
              // Xử lý lỗi nếu có.
              console.error("Lỗi xóa phim:", error);
            });
          swalWithBootstrapButtons.fire("Deleted!", "PHIM BỊ XÓA RỒI HUHU :<.", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Cancelled", "PHIM CỦA BẠN VẪN AN TOÀN =))", "error");
        }
      });
  };

  const selectMovie = (movie) => {
    // console.log(movie.hinhAnh);
    setValue("maPhim", movie.maPhim);
    setValue("tenPhim", movie.tenPhim);
    setValue("biDanh", movie.biDanh);
    setValue("moTa", movie.moTa);
    // setValue("hinhAnh", movie.hinhAnh);
    setValue("trailer", movie.trailer);
    setValue("ngayKhoiChieu", movie.ngayKhoiChieu);
    setIsUpdating(!isUpdating);
    setImgPreview(movie.hinhAnh);
  };

  const handleUpdateMovie = (movie) => {
    const formData = new FormData();
    formData.append("maPhim", movie.maPhim);
    formData.append("tenPhim", movie.tenPhim);
    formData.append("biDanh", movie.biDanh);
    formData.append("moTa", movie.moTa);
    formData.append("hinhAnh", movie.hinhAnh[0]);
    formData.append("trailer", movie.trailer);
    formData.append("ngayKhoiChieu", movie.ngayKhoiChieu);
    formData.append("maNhom", "GP09");
    return updateMovie(formData);
  };

  return (
    <Box sx={{ display: "flex", paddingLeft: "20%" }}>
      <Grid container>
        <div className={`${adminMovieStyles.movieAdmin}`}>
          <div className={`${adminMovieStyles.container}`}>
            <div className={`row ${adminMovieStyles.form}`}>
              <div className="col-6">
                <Grid item xs={12} md={6}>
                  <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className={`row ${adminMovieStyles.input_container}`}>
                      <input
                        type="text"
                        placeholder="Tên Phim"
                        {...register("tenPhim")}
                        className={`${adminMovieStyles.form_input}`}
                        onChange={handleChange}
                      />
                      {errors.tenPhim && <p>{errors.tenPhim.message}</p>}
                    </div>
                    <div className={`row ${adminMovieStyles.input_container}`}>
                      <input
                        placeholder="Bí Danh"
                        name="biDanh"
                        type="text"
                        {...register("biDanh")}
                        className={`${adminMovieStyles.form_input}`}
                      />
                      {errors.biDanh && <p>{errors.biDanh.message}</p>}
                    </div>
                    <div className={`row ${adminMovieStyles.input_container}`}>
                      <input
                        placeholder="Mô Tả"
                        type="text"
                        {...register("moTa")}
                        className={`${adminMovieStyles.form_input}`}
                      />
                      {errors.moTa && <p>{errors.moTa.message}</p>}
                    </div>
                    <div className={`row ${adminMovieStyles.input_img}`}>
                      <input
                        type="file"
                        {...register("hinhAnh", {
                          onChange: handleChangeImage,
                        })}
                      />
                    </div>
                    <div className={`row ${adminMovieStyles.input_container}`}>
                      <input
                        placeholder="Trailer"
                        type="text"
                        {...register("trailer")}
                        className={`${adminMovieStyles.form_input}`}
                      />
                      {errors.trailer && <p>{errors.trailer.message}</p>}
                    </div>
                    <div className={`row ${adminMovieStyles.input_container}`}>
                      <input
                        placeholder="Ngày Khởi Chiếu"
                        type="date"
                        {...register("ngayKhoiChieu", {
                          setValueAs: (value) => {
                            return dayjs(value).format("DD/MM/YYYY");
                          },
                        })}
                        className={`${adminMovieStyles.form_input}`}
                      />
                      {errors.ngayKhoiChieu && <p>{errors.ngayKhoiChieu.message}</p>}
                    </div>

                    <div className="text-center mb-2">
                      {isUpdating ? (
                        <button
                          className="btn btn-success btn-lg"
                          type="submit"
                          disabled={isLoading}
                        >
                          CẬP NHẬT
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-lg"
                          type="submit"
                          disabled={isLoading}
                        >
                          THÊM PHIM
                        </button>
                      )}
                      {error && <p>{error}</p>}
                    </div>
                  </form>
                </Grid>
              </div>

              <Grid item xs={12} md={6}>
                <div className={`col-6 ${adminMovieStyles.image_input}`}>
                  {imgPreview && (
                    <div>
                      <img width={300} height={300} src={imgPreview} alt="" />
                    </div>
                  )}
                </div>
              </Grid>
            </div>
            <Grid item xs={12} style={{ height: 550, width: "100%", marginRight: "50px" }}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">MÃ PHIM</th>
                    <th scope="col">TÊN PHIM</th>
                    <th scope="col">NGÀY KHỞI CHIẾU</th>
                    <th scope="col" style={{ width: 234 }}>
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((movie) => {
                    const day = dayjs(movie.ngayKhoiChieu).format("DD-MM-YYYY");
                    return (
                      <tr>
                        <th scope="row">{movie.maPhim}</th>
                        <td>{movie.tenPhim}</td>
                        <td>{day}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteMovie(movie.maPhim)}
                            className="btn btn-danger me-3"
                          >
                            XÓA
                          </button>
                          <button
                            onClick={() => selectMovie(movie)}
                            className="btn btn-warning me-3"
                          >
                            {isUpdating ? <span>Hủy lựa Phim</span> : <span> Lựa Phim</span>}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Grid>
          </div>
        </div>
      </Grid>
    </Box>
  );
}
