import React from "react";
import { BrandSvgLogo } from "../assets/svg";

const DesktopFooter = () => {
  return (
    <div className=" bg-slate-100 flex justify-center items-center py-6">
      <img src={BrandSvgLogo} alt="Capx" />
    </div>
  );
};

export default DesktopFooter;
