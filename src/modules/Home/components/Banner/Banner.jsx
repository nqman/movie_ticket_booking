import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ReactPlayer from "react-player/lazy";
import ClearIcon from "@mui/icons-material/Clear";
import { getBannerAPI } from "../../../../apis/movieAPI";
import useRequest from "../../../../hook/useRequest";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styleBanner from "./banner.module.scss";
import { Box } from "@mui/material";

const TRAILERS = [
  "https://www.youtube.com/watch?v=uoKSzOuPcfY",
  "https://www.youtube.com/watch?v=kBY2k3G6LsM&t",
  "https://www.youtube.com/watch?v=Eu9G8nO5-Ug",
];

export default function Banner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState("");
  const [playVideo, setPlayVideo] = useState(false);

  const showModal = (trailer) => {
    setIsModalOpen(true);
    setVideo(trailer);
    setPlayVideo(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideo("");
  };

  const { data: banners, isLoading } = useRequest(getBannerAPI);

  const bannersMapped = banners?.map((banner, index) => {
    return { ...banner, trailer: TRAILERS[index] };
  });

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bannersMapped?.map((banner, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styleBanner.bannerimg}>
                <img width="100%" height="550" src={banner.hinhAnh} />
              </div>

              <Box
                sx={{
                  backgroundColor: "#000000a7",
                  color: "#fff",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  zIndex: "1201",
                  opacity: "0",
                  borderRadius: "10px",
                  cursor: "pointer",

                  transition: "all 0.5s",

                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <PlayCircleOutlineIcon
                  className="banner-icon-play"
                  onClick={() => showModal(banner.trailer)}
                  fontSize="large"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "100px",
                    height: "100px",
                    transform: "translate(-50%, -50%)",
                    transition: "all 0.5s",
                    "&:hover": {
                      color: "#ffffff81",
                    },
                  }}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={styleBanner.main} style={{ display: isModalOpen ? "block" : "none" }}>
        <div className={styleBanner.overlay} onClick={closeModal}></div>

        <div className={styleBanner.modal}>
          <div className="model-close" onClick={closeModal}>
            <div className={styleBanner.icon}>
              <ClearIcon />
            </div>
          </div>
          <ReactPlayer playing={playVideo} controls url={video} />
        </div>
      </div>
    </div>
  );
}
