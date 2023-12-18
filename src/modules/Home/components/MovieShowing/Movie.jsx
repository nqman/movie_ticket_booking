import { useState, useEffect } from "react";
import { getMoviesAPI } from "../../../../apis/movieAPI";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getMoviesAPI();
        setMovies(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>MovieShowing</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.maPhim}>
            <span>{movie.tenPhim}</span>
            <button onClick={() => setTrailer(movie.trailer)}>Trailer</button>

            {/* <Link to={`/details/${movie.maPhim}`}>Mua vé</Link> */}

            <button onClick={() => navigate(`/details/${movie.maPhim}`)}>Mua vé</button>
          </li>
        ))}
      </ul>
      <ReactPlayer url={trailer} playing controls />
    </div>
  );
}
