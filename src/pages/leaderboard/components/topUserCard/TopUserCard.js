import React from "react";
import { CardCoinIcon, DailyQuestsIcon } from "../../../../assets/svg";
import Top1Bagde from "../../../../assets/lottie/Rank_01.json";
import Top2Bagde from "../../../../assets/lottie/Rank_02.json";
import Top3Bagde from "../../../../assets/lottie/Rank_03.json";
import Lottie from "react-lottie";

const TopUserCard = ({ userData }) => {
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
          {userData.image_url ? (
            <img
              className="img"
              src={userData.image_url}
              alt={userData.username}
            />
          ) : (
            <div className="img absolute">
              <span className="capitalize">
                {userData.username.slice(0, 1)}
              </span>
            </div>
          )}

          {/* show this if not image avialable */}
        </div>
        <div className="badge absolute flex flex-col justify-center items-center">
          <Lottie options={userMedal(userData.position)} />
        </div>
      </div>
      <div className="text-box flex flex-col gap-3 justify-center">
        <h6 className="name">{userData.username}</h6>
        <div className="flex items-center gap-3">
          <div className="tasks-box flex items-center ">
            <img className="box-icon" src={CardCoinIcon} alt="coin" />
            <span className="text ml-1">{userData.earned_rewards} xCapx</span>
          </div>
          <div className="tasks-box flex items-center ">
            <img className="box-icon" src={DailyQuestsIcon} alt="tasks" />
            <span className="text ml-1">{userData.quests} Tasks</span>
          </div>
          <div className="tasks-box flex items-center md:hidden">
            <Lottie
              options={userMedal(userData.position)}
              height={18}
              width={18}
            />
            <span className="text ml-1">Rank #{userData.position}</span>
          </div>
        </div>
        <div className="rank-box md:flex items-center hidden ">
          <Lottie
            options={userMedal(userData.position)}
            height={18}
            width={18}
          />
          <span className="text ml-1">Rank #{userData.position}</span>
        </div>
      </div>
      <div className="grow hidden md:block" />
    </div>
  );
};

export default TopUserCard;
