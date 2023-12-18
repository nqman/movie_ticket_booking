import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Overview from "../components/Overview";
import Showtimes from "../components/Showtimes";
import { getMovieDetailsAPI } from "../../../apis/cinemaAPI";

export default function Detail() {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movie = await getMovieDetailsAPI(params.movieId);
        setMovie(movie);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { heThongRapChieu: showtimes, ...movieDetails } = movie;
  return (
    <div>
      <Overview movie={movieDetails} />
      <Showtimes showtimes={showtimes} />
    </div>
  );
}
