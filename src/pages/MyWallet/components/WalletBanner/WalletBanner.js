import React from "react";
import { ImArrowRight2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WalletBanner = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="wallet-banner rounded-2xl w-full md:rounded-3xl">
      <div className="flex flex-col items-start  gap-6">
        <h2>
          Congratulations, You have <br className="md:hidden block" /> earned
          <br className="md:block hidden" /> {userData.earned_rewards} xCapx so
          far!
        </h2>
        <Link to="/">
          <button className="flex items-center text-white justify-between ">
            <span className="fs-16 font-black mr-3">Explore Quests</span>
            <ImArrowRight2 />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WalletBanner;
