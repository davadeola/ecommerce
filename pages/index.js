import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <div className="products-heading">
        <h2>Food Shoop Online</h2>
        <p>Something for everyone</p>
      </div>

      <div className="products-container"></div>

      <FooterBanner />
    </div>
  );
};

export default Home;
