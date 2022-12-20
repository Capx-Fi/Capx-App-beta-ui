import React from "react";
import { BrandLogoSvg } from "../../assets/svg";

const Footer = () => {
  return (
    <footer className="footer p-4 md:p-8">
      <div className="flex justify-between px-8 py-4 items-center rounded-2xl">
        <img src={BrandLogoSvg} alt="Xcapx" />
        <p>All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
