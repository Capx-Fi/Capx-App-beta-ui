import React from "react";
import { BrandLogoSvg } from "../../assets/svg";

const SideNav = () => {
  return (
    <div className="sidenav flex flex-col items-center min-h-screen hidden md:flex border-primary-200">
      <img className="brand-logo" src={BrandLogoSvg} alt="Capx" />
    </div>
  );
};

export default SideNav;
