import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ButtonMovie } from "../../ButtonMovie";

import { Desc, NameMovie } from "./stylesShowList";
import { getMoviesAPI } from "../../../../../apis/movieAPI";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import { Box, Modal } from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import { Container, Row, Col } from "react-grid-system";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "transparent",
};

export default function ShowingList() {
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [open, setOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState("");

  const handleClose = () => setOpen(false);

  const { data: showing = [], isLoading } = useQuery({
    queryKey: ["showingList"],
    queryFn: getMoviesAPI,
  });

  const navigate = useNavigate();

  const handleOpen = (linkDemo) => {
    console.log(linkDemo);
    if (!linkDemo.trailer) {
      navigate(`/movies/${linkDemo.maPhim}`);
    }
    setOpen(true);
    setTrailerMovie(linkDemo.trailer);
  };

  return (
    <>
      <Container>
        <Row sx={{ mt: 4 }}>
          {showing.map((item, index) => {
            const isHovered = index === hoveredSlide;
            return (
              <Col key={item.maPhim} xs={12} sm={6} md={4} lg={3}>
                <SwiperSlide
                  onMouseEnter={() => {
                    setHoveredSlide(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredSlide(null);
                  }}
                  className="swiper-slide2"
                >
                  <img
                    src={item.hinhAnh}
                    alt={item.tenPhim}
                    style={{ width: "100%", height: "400px" }}
                  />
                  <Box
                    onClick={() => handleOpen(item)}
                    sx={{
                      backgroundColor: "#000000a7",
                      color: "#fff",
                      position: "absolute",
                      top: "40px",
                      left: "0",
                      width: "100%",
                      height: "77%",
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
                      fontSize="large"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.5s",
                        "&:hover": {
                          color: "#ffffff81",
                        },
                      }}
                    />
                  </Box>

                  {isHovered ? (
                    <ButtonMovie
                      height="60px"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        width: "95%",
                        transform: "translateX(-50%)",
                        marginBottom: "-5%",
                      }}
                      onClick={() => navigate(`/movies/${item.maPhim}`)}
                    >
                      mua vé
                    </ButtonMovie>
                  ) : (
                    <>
                      <NameMovie
                        pauseOnHover="true"
                        speed={30}
                        gradientWidth={200}
                        gradientColor={[211, 47, 47]}
                      >
                        {item.tenPhim}
                      </NameMovie>
                      <Desc>{item.moTa}</Desc>
                    </>
                  )}
                </SwiperSlide>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "#0000001d" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
          }}
        >
          <ReactPlayer url={trailerMovie} width="60vw" height="60vh" controls={true} />
        </Box>
      </Modal>
    </>
  );
}
