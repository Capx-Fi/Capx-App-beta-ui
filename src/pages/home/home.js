import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertIcon, DailyQuestsIcon } from "../../assets/svg";
import ConsTasks from "./components/ConsTasks/ConsTasks";
import DailyTasks from "./components/DailyTasks/DailyTasks";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import OldTasks from "./components/OldTasks/OldTasks";
import SpecialTasks from "./components/SpecialTasks/SpecialTasks";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import { setQuestsData } from "../../store/slices/questSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [dailyQuests, setDailyQuests] = useState([]);
  const [prevQuests, setPrevQuests] = useState([]);
  const user = useSelector((state) => state.user);
  //const { data,error,isPending } = useFirestoreCollection("orgs");
  const { data, error, isPending } = useFirestoreCollection(
    "orgs/f7ILwJaAwQ+2n4D8euNpQ0lVuFJJAYLvw9O2niisDZM=/quests",
    ["docType", "==", "Aggregate"]
  );

  useEffect(() => {
    if (data && !isPending) {
      let result = [];
      console.log(user.registered_on);
      Object.keys(data[0].quests).forEach((val) => {
        const dataObject = {
          id: val,
          tasktitle: data[0].quests[val].title,
          tags: data[0].quests[val].tags,
          rewards_type: data[0].quests[val].rewards_type,
          taskreward: data[0].quests[val].max_rewards,
          expiry: data[0].quests[val].expiry,
          taskbtntext: "Claim now",
          taskchip: "Daily Reward",
          taskcategory: "constant",
          created_on: formatDate(
            new Date(
              (Number(user.registered_on) +
                Number(data[0].quests[val].launch_day_period)) *
                1000
            )
          ),
          completed_by: data[0].quests[val].completed_by,
        };
        result.push(dataObject);
      });
      console.log(result);
      let todaysDate = formatDate(new Date());
      console.log(todaysDate);
      dispatch(setQuestsData({ allQuests: result }));
      setDailyQuests(
        result.filter((val) => {
          return val.created_on === todaysDate;
        })
      );
      setPrevQuests(
        result.filter((val) => {
          return val.created_on !== todaysDate;
        })
      );
    }
  }, [data]);

  const formatDate = (date) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  return (
    <div className="home flex flex-col md:flex-row p-8 gap-16 flex-wrap">
      <div className="home-wrapper-1 flex flex-col gap-8 w-full ">
        <HomeBanner />
        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={DailyQuestsIcon} className="w-8" />
            <p className="fs-16 font-black">Daily Rewards</p>
          </div>
          <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
            <ConsTasks quests={dailyQuests} />
          </div>
        </div>

        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={DailyQuestsIcon} className="w-8" />
            <p className="fs-16 font-black">Daily Quests</p>
          </div>
          <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
            <DailyTasks quests={dailyQuests} />
          </div>
        </div>
      </div>
      {/* <div className="home-wrapper-2 w-full md:w-2/5">
        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={AlertIcon} className="w-8" />
            <p className="fs-16 font-black">
              Unclaimed{" "}
              {prevQuests.reduce((acc, val) => {
                return acc + Number(val.taskreward);
              }, 0)}
              xCapx
            </p>
          </div>
          {prevQuests && prevQuests.length > 0 && (
            <OldTasks quests={prevQuests} />
          )}
        </div>
      </div> */}
    </div>
    // <div className="home p-8">
    //   <HomeBanner />
    //   <div className="home-wrapper-1-inner flex flex-col gap-5">
    //     <div className="home-title flex flex-row items-center gap-2">
    //       <img src={DailyQuestsIcon} className="w-8" alt="" />
    //       <p className="fs-16 font-black">Daily Rewards</p>
    //     </div>
    //     <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
    //       <ConsTasks quests={dailyQuests} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
