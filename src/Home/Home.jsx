import React from "react";
import Header from "../Header/Header";
import Carousel from "../Carousel/Carousel";
import Application from "../Application/Application";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <Application />
      <Footer />
    </div>
  );
}
