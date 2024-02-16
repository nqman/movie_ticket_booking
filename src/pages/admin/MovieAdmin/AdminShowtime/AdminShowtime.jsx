import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TitleFunction } from "../../../../utils/TitleFunction";
import { DatePicker, InputNumber, notification } from "antd";
import dayjs from "dayjs";
import useRequest from "../../../../hooks/useRequest";
import "./AdminShowtime.scss";
import { getMovieDetails } from "../../../../apis/movieAPI";
import { createShowTime } from "../../../../apis/TicketAPI";
import { getCinemaTheater, getLogoCinemaAPI } from "../../../../apis/cinemaAPI";

export default function AdminShowtime() {
  TitleFunction("Add Showtimes");

  const dispatch = useDispatch();
  const { movieId } = useParams();

  const { data: movie } = useRequest(() => getMovieDetails(movieId));

  const { cinemaSystem, cinemaTheater } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getLogoCinemaAPI());
  }, []);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      maPhim: movieId,
      maRap: "",
      ngayChieuGioChieu: "",
      giaVe: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await dispatch(createShowTime(values));
      notification.success({
        message: "Thêm lịch chiếu thành công",
      });
    } catch (error) {
      notification.error({
        message: "Thêm lịch chiếu thất bại",
        description: error,
      });
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(getCinemaTheater(value));
  };

  const handleDateTime = (value) => {
    console.log(value);
    setValue("ngayChieuGioChieu", dayjs(value).format("DD/MM/YYYY hh:mm:ss"));
  };

  const handlePrice = (price) => {
    setValue("giaVe", price);
  };

  return (
    <div className="add-showtimes">
      <h1 className="text-danger fs-2">Thêm Lịch Chiếu</h1>

      <div className="d-flex">
        <div className="mt-3 text-center w-100">
          <img src={movie?.hinhAnh} alt={movie?.maPhim} width={250} height={350} />
          <h5 className="text-danger mt-3">{movie?.tenPhim}</h5>
        </div>

        <form className="pt-4 w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* hệ thống rạp */}
          <div className="form-group mb-4">
            <label className="form-label">Hệ Thống Rạp</label>
            <select className="form-select" type="text" onChange={handleChange}>
              {cinemaSystem?.map((cinemaName) => {
                return (
                  <option key={cinemaName.maHeThongRap} value={cinemaName.maHeThongRap}>
                    {cinemaName.tenHeThongRap}
                  </option>
                );
              })}
            </select>
          </div>

          {/* cụm rạp */}
          <div className="form-group mb-4 mb-4">
            <label className="form-label">Cụm Rạp</label>
            <select className="form-select" {...register("maRap")}>
              {cinemaTheater?.map((cinemaAddress) => {
                return (
                  <option key={cinemaAddress.maCumRap} value={cinemaAddress.maCumRap}>
                    {cinemaAddress.tenCumRap}
                  </option>
                );
              })}
            </select>
          </div>

          {/* ngày giờ chiếu */}
          <div className="form-group mb-4">
            <label className="form-label d-block">Ngày Giờ Chiếu</label>
            <DatePicker
              format={"DD/MM/YYYY hh:mm:ss A"}
              placeholder="Chọn ngày giờ"
              showTime
              onChange={handleDateTime}
            />
          </div>

          {/* giá vé */}
          <div className="form-group mb-4">
            <label className="form-label d-block">Giá Vé</label>
            <InputNumber
              className="w-25"
              placeholder="Chọn giá vé"
              min={75000}
              max={200000}
              onChange={handlePrice}
            />
          </div>

          <div className="mt-5">
            <button className="btn-add-theater">Thêm Lịch Chiếu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
