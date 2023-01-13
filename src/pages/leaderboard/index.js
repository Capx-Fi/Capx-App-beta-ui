import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeaderboardSplash } from "../../assets/images";
import { LeaderboardBadge } from "../../assets/svg";
import AlertModal from "../../components/alertModal/AlertModal";
import TopLoader from "../../components/topLoader/TopLoader";
import { config } from "../../config";
import { useApi } from "../../hooks/useApi";
import ErrorModal from "../quests/compRight/errorModal/ErrorModal";
import Banner from "./components/banner/Banner";
import TopUserCard from "./components/topUserCard/TopUserCard";
import TopUsersTable from "./components/topUsersTable/TopUsersTable";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const {
    error,
    isPending,
    data: topUsersData,
    getData,
  } = useApi(config.API_URL);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (!error) {
      if (15 <= userData.earned_rewards) {
        getData(null, "/fetchLeaderboard");
      } else {
        setOpenAlertModal(true);
      }
    } else {
      if (error) {
        setOpenErrorModal(true);
      }
    }
  }, [userData, error]);
  console.log(error);

  const handleAlertModalClose = () => {
    setOpenAlertModal((prev) => (prev ? false : true));
    navigate("/");
  };

  const handleErrorModalClose = () => {
    setOpenErrorModal((prev) => (prev ? false : true));
  };

  return (
    <>
      <div className="leaderboard md:px-10 p-6 md:py-11 flex flex-col gap-6">
        <Banner />
        <div className="heading flex items-center pb-3">
          <img src={LeaderboardBadge} alt="Leaderboard" />
          <h3 className="ml-3">Leaderboard</h3>
        </div>
        <div className="top-uses flex md:flex-row flex-col gap-6">
          {topUsersData !== null &&
            topUsersData?.result.leaderboard
              .slice(0, 3)
              .map((userData, ind) => {
                return (
                  <TopUserCard key={userData.name + ind} userData={userData} />
                );
              })}
        </div>
        <div className="flex">
          {topUsersData !== null && (
            <TopUsersTable userData={topUsersData?.result.leaderboard} />
          )}

          <div className="splash-img grow md:flex justify-center items-center hidden ">
            <img src={LeaderboardSplash} alt="Trophy" />
          </div>
        </div>
      </div>
      <AlertModal
        open={openAlertModal}
        page={"Leaderboard"}
        handleClose={handleAlertModalClose}
      />
      {isPending && <TopLoader />}
      <ErrorModal open={openErrorModal} handleClose={handleErrorModalClose} />
    </>
  );
};

export default Leaderboard;
