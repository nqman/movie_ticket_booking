import React from "react";
import Movie from "../components/MovieShowing/Movie";
import Banner from "../components/Banner";
import Cinema from "../components/Cinema";

export default function Home() {
  return (
    <div>
      <Banner />
      <Movie />
      <Cinema />
    </div>
  );
}
