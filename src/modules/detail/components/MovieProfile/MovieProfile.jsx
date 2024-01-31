import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../../../apis/cinemaAPI";

import movieDetailStyles from "./movieDetail.module.scss";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MovieModal from "./MovieModle";

export default function MovieProfile({ movieId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieShowtimes"],
    queryFn: () => getMovieDetails(movieId),
    // nếu giá trị movieId là null hay undefined thì không gọi
    enabled: !!movieId,
  });
  const movie = data;
  console.log("Phim đã được chọn", data);
  const time = dayjs(data.ngayKhoiChieu).format("DD-MM-YYYY");
  return (
    <div>
      <div className={`${movieDetailStyles.movie_detail}`}>
        <div className={`${movieDetailStyles.movie_container}`}>
          <div
            style={{ backgroundImage: "url(" + data.hinhAnh + ")" }}
            className={`${movieDetailStyles.movie_background}`}
          ></div>
          <div className={`${movieDetailStyles.movie_row} row`}>
            <div className={`${movieDetailStyles.movie_pic} col-md-8 col-xs-12`}>
              <div className={`${movieDetailStyles.movie_pic_container} col-md-8 col-xs-12`}>
                <img src={data.hinhAnh} alt="" />
              </div>
            </div>
            <div className={`${movieDetailStyles.movie_text} col-md-4 col-xs-12`}>
              <p>Tên Phim</p>
              <h2>{data.tenPhim}</h2>
              <hr />
              <p>Ngày khởi chiếu</p>
              <h2>{time}</h2>
              <hr />
              <p>Thời lượng</p>
              <h2>
                <span className={movieDetailStyles.movie_text_duration}>120 phút</span> - 10 Tix -
                2D/Digital
              </h2>
              <div className="text-center mt-4">
                <Button variant="success" onClick={handleShow}>
                  Hiển Thị Thêm Thông Tin
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thông tin chi tiết phim</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <MovieModal
                      hinhAnh={data.hinhAnh}
                      ngayKhoiChieu={data.ngayKhoiChieu}
                      tenPhim={data.tenPhim}
                      moTa={data.moTa}
                      danhGia={data.danhGia}
                    />
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
