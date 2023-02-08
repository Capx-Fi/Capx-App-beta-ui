import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WalletSplash } from "../../assets/images";
import {
  TaskListIcon,
  StreakFireIcon,
  streakCheck,
  StreakFire,
} from "../../assets/svg";
import AlertModal from "../../components/alertModal/AlertModal";
import { config } from "../../config";
import { useApi } from "../../hooks/useApi";
import ErrorModal from "../quests/compRight/errorModal/ErrorModal";
import QuestTable from "./components/questTable/QuestTable";
import WalletBanner from "./components/WalletBanner/WalletBanner";
import dayjs from "dayjs";
import TopLoader from "../../components/topLoader/TopLoader";
import Skeleton from "./components/skeleton/Skeleton";

function MyWallet() {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorModalHeading, setErrorModalHeading] = useState("");
  const [sortedQuestsData, setSortedQuestsData] = useState([]);
  const [streak, setStreak] = useState(0);

  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    error,
    isPending,
    data: questsData,
    getData,
  } = useApi(config.API_URL);

  useEffect(() => {
    if (!error) {
      // if (15 <= userData.earned_rewards) {
      getData(null, "/fetchWallet");
      // } else {
      //   setOpenAlertModal(true);
      // }
    } else {
      if (error) {
        setOpenErrorModal(true);
      }
    }
  }, [userData, error]);

  useEffect(() => {
    if (questsData?.result.success === true) {
      const sortData = questsData?.result.wallet.sort((a, b) => {
        return dayjs(b.date).unix() - dayjs(a.date).unix();
      });
      questsData?.result.wallet.forEach((element) => {
        if (element.streak) {
          setStreak(element.streak);
        }
      });
      setSortedQuestsData(sortData);
    } else if (questsData?.result.success === false) {
      setErrorModalHeading(questsData?.result.message.toString());
    }
  }, [questsData]);

  const handleAlertModalClose = () => {
    setOpenAlertModal((prev) => (prev ? false : true));
    navigate("/");
  };

  const handleErrorModalClose = () => {
    setOpenErrorModal((prev) => (prev ? false : true));
  };

  return (
    <>
      <div className="my-wallet md:px-10 p-6 md:py-11 flex flex-col gap-6">
        <WalletBanner />
        {streak > 0 && (
          <>
            <div className="heading flex items-center pb-3">
              <img src={StreakFireIcon} alt="Leaderboard" />
              <h3 className="ml-3">Daily Streak</h3>
            </div>
            <div className="streak-wrapper flex md:ml-10 ml-0">
              {Array(7)
                .fill("")
                .map((el, ind) => {
                  if (streak <= 3 && ind < streak) {
                    return (
                      <div
                        className={`streak ${
                          ind === streak ? "current-streak" : ""
                        } flex flex-col items-center mb-4 gap-1 relative`}
                      >
                        <img
                          className="check-img"
                          src={streakCheck}
                          alt="check"
                        />
                        <p>Day {streak < 3 ? ind + 1 : ind + streak - 2}</p>
                      </div>
                    );
                  } else if (streak > 3 && ind <= 2) {
                    return (
                      <div
                        className={`streak ${
                          (ind + streak - 2) % 7 == 0 ? "current-streak" : ""
                        } flex flex-col items-center mb-4 gap-1 relative`}
                      >
                        {(ind + streak - 2) % 7 == 0 ? (
                          <img
                            className="check-img"
                            src={StreakFire}
                            alt="check"
                          />
                        ) : (
                          <img
                            className="check-img"
                            src={streakCheck}
                            alt="check"
                          />
                        )}

                        <p>Day {streak < 3 ? ind + 1 : ind + streak - 2}</p>
                      </div>
                    );
                  } else if (streak > 3) {
                    return (
                      <div
                        className={`streak ${
                          (ind + streak - 2) % 7 == 0 ? "current-streak" : ""
                        } flex flex-col items-center mb-4 gap-1 relative`}
                      >
                        {(ind + streak - 2) % 7 == 0 ? (
                          <img
                            className="fire-img"
                            src={StreakFire}
                            alt="check"
                          />
                        ) : (
                          ""
                        )}
                        <span>-</span>
                        <p>Day {streak < 3 ? ind + 1 : ind + streak - 2}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={`streak ${
                          (ind + 1) % 7 == 0 ? "current-streak" : ""
                        } flex flex-col items-center mb-4 gap-1 relative`}
                      >
                        {(ind + 1) % 7 == 0 ? (
                          <img
                            className="fire-img"
                            src={StreakFire}
                            alt="check"
                          />
                        ) : (
                          ""
                        )}
                        <span>-</span>
                        <p>Day {streak < 3 ? ind + 1 : ind + streak - 2}</p>
                      </div>
                    );
                  }
                })}
            </div>
          </>
        )}

        <div className="heading flex items-center pb-3">
          <img src={TaskListIcon} alt="Leaderboard" />
          <h3 className="ml-3">Quests Report</h3>
        </div>
        <div className="flex">
          {isPending ? <Skeleton /> : <QuestTable quests={sortedQuestsData} />}

          <div className="splash-img grow md:flex justify-center items-center hidden ">
            <img src={WalletSplash} alt="Trophy" />
          </div>
        </div>
      </div>
      <AlertModal
        open={openAlertModal}
        page={"Wallet"}
        handleClose={handleAlertModalClose}
      />
      {isPending && <TopLoader />}
      <ErrorModal
        heading={errorModalHeading}
        open={openErrorModal}
        handleClose={handleErrorModalClose}
      />
    </>
  );
}

export default MyWallet;
