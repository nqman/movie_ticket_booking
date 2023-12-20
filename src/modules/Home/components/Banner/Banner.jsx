import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { getBannerAPI } from "../../../../apis/movieAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Navigation, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const banners = await getBannerAPI();
        setBanners(banners);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBanners();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {banners.map((banner) => (
        <div key={banner.maBanner}>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <img style={{ width: "100%", height: "600px" }} src={banner.hinhAnh} alt="" />
            </CardCover>
            <CardContent>
              <Typography
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 12, sm: 75 }}
              ></Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </Slider>
    // <div>
    //   <Swiper
    //     autoplay={{
    //       delay: 3000,
    //       disableOnInteraction: false,
    //     }}
    //     centeredSlides={true}
    //     slidesPerView={1}
    //     spaceBetween={30}
    //     loop={true}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     navigation={true}
    //     modules={[Navigation, Autoplay]}
    //     className="mySwiper"
    //   >
    //     {banners.map((banner) => {
    //       return (
    //         <SwiperSlide key={banner.maBanner}>
    //           <img width="100%" height="600px" src={banner.hinhAnh} alt="" />
    //           <Box
    //             sx={{
    //               backgroundColor: "#000000a7",
    //               color: "#fff",
    //               position: "absolute",
    //               top: "0",
    //               left: "0",
    //               width: "100%",
    //               height: "100%",
    //               zIndex: "1201",
    //               opacity: "0",
    //               borderRadius: "10px",
    //               cursor: "pointer",

    //               transition: "all 0.5s",

    //               "&:hover": {
    //                 opacity: 1,
    //               },
    //             }}
    //           >
    //             <PlayCircleOutlineIcon
    //               fontSize="large"
    //               sx={{
    //                 position: "absolute",
    //                 top: "50%",
    //                 left: "50%",
    //                 width: "100px",
    //                 height: "100px",
    //                 transform: "translate(-50%, -50%)",
    //                 transition: "all 0.5s",
    //                 "&:hover": {
    //                   color: "#ffffff81",
    //                 },
    //               }}
    //             />
    //           </Box>
    //         </SwiperSlide>
    //       );
    //     })}
    //   </Swiper>
    // </div>
  );
}
