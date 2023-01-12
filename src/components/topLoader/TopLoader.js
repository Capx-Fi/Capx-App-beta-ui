import React from "react";
import Lottie from "react-lottie";

import LoaderDesktop from "../../assets/lottie/PandaLoaderDesktop.json";
import LoaderPhone from "../../assets/lottie/PandaLoaderPhone.json";

const TopLoader = () => {
  const loaderDesktopOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderDesktop,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const loaderPhoneOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderPhone,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-10">
      <div className="md:block hidden">
        <Lottie options={loaderDesktopOptions} height={120} width="100vw" />
      </div>
      <div className="md:hidden block">
        <Lottie options={loaderPhoneOptions} height={75} width="100vw" />
      </div>
    </div>
  );
};

export default TopLoader;
