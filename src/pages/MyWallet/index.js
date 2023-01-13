import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WalletSplash } from "../../assets/images";
import { TaskListIcon } from "../../assets/svg";
import AlertModal from "../../components/alertModal/AlertModal";
import { config } from "../../config";
import { useApi } from "../../hooks/useApi";
import ErrorModal from "../quests/compRight/errorModal/ErrorModal";
import QuestTable from "./components/questTable/QuestTable";
import WalletBanner from "./components/WalletBanner/WalletBanner";
import dayjs from "dayjs";
import TopLoader from "../../components/topLoader/TopLoader";

function MyWallet() {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [sortedQuestsData, setSortedQuestsData] = useState([]);

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
      if (15 <= userData.earned_rewards) {
        getData(null, "/fetchWallet");
      } else {
        setOpenAlertModal(true);
      }
    } else {
      if (error) {
        setOpenErrorModal(true);
      }
    }
  }, [userData, error]);

  useEffect(() => {
    if (questsData) {
      const sortData = questsData?.result.wallet.sort((a, b) => {
        return dayjs(b.date).unix() - dayjs(a.date).unix();
      });
      setSortedQuestsData(sortData);
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
        <div className="heading flex items-center pb-3">
          <img src={TaskListIcon} alt="Leaderboard" />
          <h3 className="ml-3">Quests Report</h3>
        </div>
        <div className="flex">
          {sortedQuestsData.length > 0 && (
            <QuestTable quests={sortedQuestsData} />
          )}

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
      <ErrorModal open={openErrorModal} handleClose={handleErrorModalClose} />
    </>
  );
}

export default MyWallet;
