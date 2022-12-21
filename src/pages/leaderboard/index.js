import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaderboardSplash } from "../../assets/images";
import { LeaderboardBadge } from "../../assets/svg";
import AlertModal from "../../components/alertModal/AlertModal";
import Banner from "./components/banner/Banner";
import TopUserCard from "./components/topUserCard/TopUserCard";
import TopUsersTable from "./components/topUsersTable/TopUsersTable";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [openAlertModal, setOenAlertModal] = useState(false);

  const handleAlertModalClose = () => {
    setOenAlertModal((prev) => (prev ? false : true));
  };

  const topTen = [
    { name: "@tylerhill", earned: "32", tasks: "12", rank: 1 },
    { name: "@jenniuxt", earned: "28", tasks: "8", rank: 2 },
    { name: "charlesxavier", earned: "24", tasks: "5", rank: 3 },
    { name: "@apollogaskill", earned: "21", tasks: "21", rank: 4 },
    { name: "@barrethenry", earned: "18", tasks: "18", rank: 5 },
    { name: "@evergladepaez", earned: "17", tasks: "17", rank: 6 },
    { name: "@heidipino", earned: "12", tasks: "12", rank: 7 },
    { name: "@kyrieslattery", earned: "8", tasks: "8", rank: 8 },
    { name: "@martintottem", earned: "6", tasks: "6", rank: 9 },
    { name: "@oliviapaicio", earned: "6", tasks: "6", rank: 10 },
  ];

  return (
    <>
      <div className="leaderboard md:px-10 p-6 md:py-11 flex flex-col gap-6">
        <Banner />
        <div className="heading flex items-center pb-3">
          <img src={LeaderboardBadge} alt="Leaderboard" />
          <h3 className="ml-3">Leaderboard</h3>
        </div>
        <div className="top-uses flex md:flex-row flex-col gap-6">
          {topTen.slice(0, 3).map((users, ind) => {
            return <TopUserCard key={users.name + ind} users={users} />;
          })}
        </div>
        <div className="flex">
          <TopUsersTable users={topTen} />
          <div className="splash-img grow md:flex justify-center items-center hidden ">
            <img src={LeaderboardSplash} alt="Trophy" />
          </div>
        </div>
      </div>
      <AlertModal open={openAlertModal} handleClose={handleAlertModalClose} />
    </>
  );
};

export default Leaderboard;
