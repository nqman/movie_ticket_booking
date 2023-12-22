import React from "react";
import Movie from "../components/MovieShowing/Movie";
import Banner from "../components/Banner";
import Cinema from "../components/Cinema";
import App from "../components/Application/App";

export default function Home() {
  return (
    <div>
      <Banner />
      <Movie />
      <Cinema />
      <App />
    </div>
  );
}
