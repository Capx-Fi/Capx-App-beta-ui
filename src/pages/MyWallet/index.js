import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletSplash } from "../../assets/images";
import { GetStatedSvg, QuestReportIcon, TaskListIcon } from "../../assets/svg";
import AlertModal from "../../components/alertModal/AlertModal";
import QuestTable from "./components/questTable/QuestTable";
import MyWalletData from "./components/questTable/QuestTable";
import WalletBanner from "./components/WalletBanner/WalletBanner";

function MyWallet() {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const navigate = useNavigate();

  const handleAlertModalClose = () => {
    setOpenAlertModal((prev) => (prev ? false : true));
    navigate("/");
  };

  useEffect(()=>{
    setOpenAlertModal(true);
  },[])

  const dummyQuestData = [
    { date: "10 Dec 2022", name: "What is Capx App ?", earnings: 2 },
    { date: "11 Dec 2022", name: "How to earn xCapx ?", earnings: 2 },
    {
      date: "12 Dec 2022",
      name: "Register for Capx Affiliate Program",
      earnings: 2,
    },
    { date: "13 Dec 2022", name: "Daily Sign-in Reward", earnings: 2 },
    { date: "14 Dec 2022", name: "Generate Invite Code", earnings: 2 },
    { date: "15 Dec 2022", name: "Tweet from your account", earnings: 2 },
    { date: "16 Dec 2022", name: "Build your profile", earnings: 2 },
  ];

  return (
    <>
      <div className="my-wallet md:px-10 p-6 md:py-11 flex flex-col gap-6">
        <WalletBanner />
        <div className="heading flex items-center pb-3">
          <img src={TaskListIcon} alt="Leaderboard" />
          <h3 className="ml-3">Quests Report</h3>
        </div>
        <div className="flex">
          <QuestTable quests={dummyQuestData} />
          <div className="splash-img grow md:flex justify-center items-center hidden ">
            <img src={WalletSplash} alt="Trophy" />
          </div>
        </div>
      </div>
      <AlertModal open={openAlertModal} page={'Wallet'} handleClose={handleAlertModalClose} />
    </>
  );
}

export default MyWallet;
