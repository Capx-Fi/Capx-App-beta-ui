import React from "react";

const LayoutSideImg = ({ image }) => {
  console.log(image);
  return (
    <div className="h-full w-full flex items-end justify-center px-6">
      <img className="width-90p" src={image} alt="image" />
    </div>
  );
};

export default LayoutSideImg;
