import React from "react";
import { useParams } from "react-router-dom";
import MovieProfile from "../components/MovieProfile/MovieProfile";
import ShowTimes from "../components/ShowTimes";

export default function Details() {
  const { movieId } = useParams();
  console.log("Mã phim đang chọn :", movieId);
  return (
    <div>
      <MovieProfile movieId={movieId} />
      <ShowTimes movieId={movieId} />
    </div>
  );
}
