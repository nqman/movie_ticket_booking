import React, { useState, useEffect } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { getLogoCinemaAPI } from "../../../../apis/cinemaAPI";
import { getDetailCinemasAPI } from "../../../../apis/cinemaAPI";

export default function Capacity() {
  const [value, setValue] = useState("1");
  const handleChange = (evt, newValue) => {
    return setValue(newValue);
  };
  const [detailCinemas, setDetailCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getDetailCinema = async () => {
      try {
        const cinemas = await getDetailCinemasAPI();
        setDetailCinemas(cinemas);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDetailCinema();
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <Box display={"flex"}>
        <TabContext value={value}>
          <Box>
            <TabList orientation="vertical" onChange={handleChange}>
              {detailCinemas.map((cinema, index) => (
                <Tab
                  label={
                    <Button>
                      <img
                        src={cinema.logo}
                        width={"50px"}
                        style={{ display: "block" }}
                      />
                    </Button>
                  }
                  value={`${index + 1}`}
                />
              ))}
            </TabList>
          </Box>

          {detailCinemas.map((cinema, index) => (
            <TabPanel value={`${index + 1}`}>
              {cinema.lstCumRap.map((cumRap, i) => (
                <div>
                  <Button
                    variant="outlined"
                    sx={{
                      display: "block",
                      textAlign: "left",
                      height: "90px",
                      width: "250px",
                    }}
                    key={i + 1}
                  >
                    <h5
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        padding: "0",
                      }}
                      className="text-dark"
                    >
                      {cumRap.tenCumRap}
                    </h5>
                    <h6
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        padding: "0",
                        whiteSpace: "nowrap",
                      }}
                      className="text-dark"
                    >
                      {cumRap.diaChi}
                    </h6>
                  </Button>
                </div>
              ))}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  );
}
