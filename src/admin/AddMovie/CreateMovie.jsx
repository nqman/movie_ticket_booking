import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { createMovieAPI } from "../../apis/movieAPI";
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
    <div>
      <h1>CreateMovie</h1>
      <form onSubmit={handleSubmit(handleCreateMovie)}>
        <div>
          <label>Movie's name</label>
          <input {...register("tenPhim")} />
        </div>
        <div>
          <label> Movies's nickname</label>
          <input {...register("biDanh")} />
        </div>
        <div>
          <label>Description</label>
          <textarea {...register("moTa")} />
        </div>
        <div>
          <label>Imgae</label>
          <input
            type="file"
            {...register("hinhAnh", {
              onChange: handleChangeImage,
            })}
          />
          {imgPreview && <img src={imgPreview} alt="preview" width={200} height={200} />}
        </div>
        <div>
          <label>Trailer</label>
          <input {...register("trailer")} />
        </div>
        <div>
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
        <button className="btn btn-success">Add Movie</button>
      </form>
    </div>
  );
}
