import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { getBannerAPI } from "../../../../apis/movieAPI";

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
    <div>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.maBanner}>
            <Card component="li" sx={{ minWidth: 300, flexGrow: 1, overflow: "hidden" }}>
              <CardCover>
                <img style={{ width: "2000" }} src={banner.hinhAnh} alt="" />
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
    </div>
  );
}
