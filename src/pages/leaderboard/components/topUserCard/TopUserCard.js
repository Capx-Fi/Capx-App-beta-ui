import React from "react";
import {
  CardCoinIcon,
  DailyQuestsIcon,
  TopUser1,
  TopUser2,
  TopUser3,
} from "../../../../assets/svg";
import Top1Bagde from "../../../../assets/lottie/Rank_01.json";
import Top2Bagde from "../../../../assets/lottie/Rank_02.json";
import Top3Bagde from "../../../../assets/lottie/Rank_03.json";
import Lottie from "react-lottie";

const TopUserCard = ({ users }) => {
  const top1Options = {
    loop: true,
    autoplay: true,
    animationData: Top1Bagde,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const top2Options = {
    loop: true,
    autoplay: true,
    animationData: Top2Bagde,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const top3Options = {
    loop: true,
    autoplay: true,
    animationData: Top3Bagde,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const userMedal = (ind) => {
    console.log(ind);
    if (ind === 1) return top1Options;
    if (ind === 2) return top2Options;
    if (ind === 3) return top3Options;
  };
  return (
    <div className="top-user-card flex  gap-6 grow">
      <div className="grow hidden md:block" />
      <div className="img-box relative bg-gredient-2 self-center">
        <div className="img-wrapper">
          {/* show this if image avialable */}
          <img
            className="img"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt="profile"
          />

          {/* show this if not image avialable */}
          {/* <div className="img absolute">
                    <span className="">D</span>
                  </div> */}
        </div>
        <div className="badge absolute flex flex-col justify-center items-center">
          <Lottie options={userMedal(users.rank)} />
        </div>
      </div>
      <div className="text-box flex flex-col gap-3 justify-center">
        <h6 className="name">{users.name}</h6>
        <div className="flex items-center gap-3">
          <div className="tasks-box flex items-center ">
            <img className="box-icon" src={CardCoinIcon} alt="coin" />
            <span className="text ml-1">{users.earned} xCapx</span>
          </div>
          <div className="tasks-box flex items-center ">
            <img className="box-icon" src={DailyQuestsIcon} alt="tasks" />
            <span className="text ml-1">{users.tasks} Tasks</span>
          </div>
          <div className="tasks-box flex items-center md:hidden">
            <Lottie options={userMedal(users.rank)} height={18} width={18} />
            <span className="text ml-1">Rank #{users.rank}</span>
          </div>
        </div>
        <div className="rank-box md:flex items-center hidden ">
          <Lottie options={userMedal(users.rank)} height={18} width={18} />
          <span className="text ml-1">Rank #{users.rank}</span>
        </div>
      </div>
      <div className="grow hidden md:block" />
    </div>
  );
};

export default TopUserCard;
