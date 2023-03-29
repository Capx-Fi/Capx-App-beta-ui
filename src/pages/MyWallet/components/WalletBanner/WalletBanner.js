import React from "react";
import { ImArrowRight2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WalletBanner = () => {
  const userData = useSelector((state) => state.user);
  console.log(userData);

  return (
    <div className="wallet-banner rounded-2xl w-full md:rounded-3xl">
      <div className="flex flex-col items-start  gap-6">
        {/* <h2>
          Congratulations, You have <br className="md:hidden block" /> earned
          <br className="md:block hidden" /> {userData.earned_rewards} xCapx so
          far!
        </h2>
        <Link to="/">
          <button className="flex outlined-effect items-center text-white justify-between ">
            <span className="fs-16 font-black mr-3">Explore Quests</span>
            <ImArrowRight2 />
          </button>
        </Link> */}
        <div className="flex md:gap-6 gap-3">
          <div className="balance-wrapper flex flex-col md:gap-3 gap-2">
            <h4 className="text-center mt-2">{userData.earned_rewards}</h4>
            <p className="text-center">xCapx</p>
          </div>
          <div className="balance-wrapper flex flex-col md:gap-3 gap-2">
            <h4 className="text-center mt-2">
              {userData.comdex_earned_rewards}
            </h4>
            <p className="text-center">XCMDX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBanner;
