import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLogoCinemaAPI } from "../../../../apis/cinemaAPI";

export default function Cinema() {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getLogoCinema = async () => {
      try {
        const cinemas = await getLogoCinemaAPI();
        setCinemas(cinemas);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getLogoCinema();
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box id="cinema">
      <Container maxWidth={"md"} style={{ border: "solid 2px black" }}>
        <Grid spacing={2}>
          <Grid>
            <ul>
              {cinemas.map((cinema) => (
                <li style={{ listStyle: "none" }}>
                  <Button>
                    <img
                      src={cinema.logo}
                      width={"50px"}
                      style={{ display: "block" }}
                    />
                  </Button>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
