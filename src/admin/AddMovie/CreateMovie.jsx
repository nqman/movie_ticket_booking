import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { createMovieAPI } from "../../apis/movieAPI";
import adminMovie from "./adminMovie.module.scss";
import { Box, Grid } from "@mui/material";

export default function CreateMovie() {
  const [imgPreview, setImgPreview] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
  });
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

  return (
    <Box sx={{ display: "flex", paddingLeft: "12%" }}>
      <div className={`${adminMovie.form}`}>
        <h1 className="create pb-4">CreateMovie</h1>
        <form onSubmit={handleSubmit(handleCreateMovie)}>
          <div className={`${adminMovie.input_name}`}>
            <label>Movie's name</label>
            <input {...register("tenPhim")} />
          </div>

          <div className={`${adminMovie.input_nickname}`}>
            <label> Movies's nickname</label>
            <input {...register("biDanh")} />
          </div>

          <div className={`${adminMovie.input_description}`}>
            <label>Description</label>
            <textarea {...register("moTa")} />
          </div>

          <div className={`${adminMovie.input_trailer}`}>
            <label>Trailer</label>
            <input {...register("trailer")} />
          </div>

          <div className={`${adminMovie.input_date}`}>
            <label>Movie opening date</label>
            <input
              type="date"
              {...register("ngayKhoiChieu", {
                setValueAs: (value) => {
                  console.log(value);
                  return dayjs(value).format("DD/MM/YYYY");
                },
              })}
            />
          </div>

          <div className={`${adminMovie.input_img}`}>
            <label>Image</label>
            <input
              type="file"
              {...register("hinhAnh", {
                onChange: handleChangeImage,
              })}
            />
            {imgPreview && <img src={imgPreview} alt="preview" width={150} height={200} />}
          </div>
          <button className="btn btn-success">Add Movie</button>
        </form>
      </div>
    </Box>
  );
}
