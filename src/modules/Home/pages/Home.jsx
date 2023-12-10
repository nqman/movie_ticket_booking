import React from "react";
import Header from "../../../components/Header";
import Movie from "../components/MovieShowing/Movie";
import Banner from "../components/Banner";
import Cinema from "../components/Cinema";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Movie />
      <Cinema />
    </div>
  );
}
