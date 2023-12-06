import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
export default function Carousel() {
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
        <div>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <iframe
                autoPlay
                loop
                muted
                poster="https://www.youtube.com/embed/lV1OOlGwExM?si=Mms3V-5TL4DUHRCe"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/lV1OOlGwExM?si=Mms3V-5TL4DUHRCe"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </CardCover>
            <CardContent>
              <Typography level="body-lg" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 80 }}>
                Video
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/xWh0g4rKGjI?si=rmguZyuHTcf1bMAG"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </CardCover>
            <CardContent>
              <Typography level="body-lg" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 80 }}>
                Video
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/NQ_HvTBaFoo?si=tE2wtkVsm3Tnro23"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </CardCover>
            <CardContent>
              <Typography level="body-lg" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 80 }}>
                Video
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/waJKJW_XU90?si=38L2S921nmwYJav0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </CardCover>
            <CardContent>
              <Typography level="body-lg" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 80 }}>
                Video
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/leZABQZcyh0?si=Jj19ZQpq_x8S3MvY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </CardCover>
            <CardContent>
              <Typography level="body-lg" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 80 }}>
                Video
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Slider>
    </div>
  );
}
