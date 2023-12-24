import { useQuery } from "@tanstack/react-query";
import ShowingList from "./ShowingList/ShowingList";
import { Box, Container } from "@mui/material";
import ShowingSelect from "./ShowingSelect/ShowingSelect";
import { getMoviesAPI } from "../../../../apis/movieAPI";
export default function Movie() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMoviesAPI,
  });

  return (
    <Box id="showing">
      <Container maxWidth="md" style={{ position: "relative", padding: "0" }}>
        <ShowingSelect movies={data}></ShowingSelect>
        <ShowingList />
      </Container>
    </Box>
  );
}
