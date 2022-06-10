import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <div className="footer-container">
        <p>2022 JSM Headphones All rights reserverd</p>
        <p className="icons">
          <AiFillInstagram />
          <AiOutlineTwitter />
        </p>
      </div>
    </div>
  );
};

export default Footer;
