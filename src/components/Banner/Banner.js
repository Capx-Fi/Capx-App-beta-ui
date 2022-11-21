import React from "react";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import { homeIconact } from "../../assets/images/nav";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
];

function Banner() {
  return (
    <div className="flex flex-row h-screen ">
        <LeftNavigation />
    <div className="flex flex-col w-screen">
        <TopNavigation pagename="Home"/>

    <div className="home-wrapper flex flex-row p-10">
      <div className="flex flex-column basis-8/12 items-center border-r-2 h-full">
        
        
      </div>
      <div className="flex flex-column basis-4/12 items-center">
      </div>
    </div>
    
    </div>
    </div>
      );
};

export default Banner;

