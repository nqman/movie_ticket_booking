import React from "react";
import Movie from "../components/MovieShowing/Movie";
import Banner from "../components/Banner";
import Cinema from "../components/Cinema";
import App from "../components/Application/App";
import GoToTop from "../components/Scroll/GoToTop";

export default function Home() {
  return (
    <div>
      <Banner />
      <Movie />
      <Cinema />
      <App />
      <GoToTop />
    </div>
  );
}
