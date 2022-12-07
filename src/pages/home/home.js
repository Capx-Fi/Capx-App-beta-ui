import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertIcon, DailyQuestsIcon, homeInfoSVG } from "../../assets/svg";
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
    console.log(data);
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
      // let todaysDate = formatDate(new Date());
      let todaysDate = "2022-12-06";
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

  const unclaimed = true;

  const quests = [
    { taskreward: 5, completed_by: 72, tasktitle: "How to earn xCapx?" },
    { taskreward: 5, completed_by: 72, tasktitle: "Generate invite code" },
    { taskreward: 5, completed_by: 72, tasktitle: "Tweet from your account" },
    { taskreward: 5, completed_by: 72, tasktitle: "How to earn xCapx?" },
  ];

  return (
    <>
      <div className="home flex">
        <div
          className={`home-wrapper-1 p-8 flex flex-col gap-8 w-full ${
            unclaimed ? "w-2/3" : ""
          }`}
        >
          <HomeBanner />
          <div
            className={`home-wrapper-1-inner flex ${
              unclaimed ? "flex-col" : ""
            } gap-5`}
          >
            <div className={`${unclaimed ? "" : "w-1/2"} pr-5`}>
              <div className="home-title flex flex-row items-center gap-2">
                <img src={DailyQuestsIcon} className="w-8" alt="" />
                <p className="fs-16 font-black">Special Quests</p>
              </div>
              <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
                <ConsTasks quests={dailyQuests} />
              </div>
            </div>
            <div className={`${unclaimed ? "" : "w-1/2"} pr-5`}>
              <div className="home-title flex flex-row items-center gap-2">
                <img src={DailyQuestsIcon} className="w-8" alt="" />
                <p className="fs-16 font-black">Ongoing Quests</p>
              </div>
              <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
                <ConsTasks quests={dailyQuests} />
              </div>
            </div>
          </div>

          <div className="home-wrapper-1-inner flex flex-col gap-5">
            <div className="home-title flex flex-row items-center gap-2">
              <img src={DailyQuestsIcon} className="w-8" alt="" />
              <p className="fs-16 font-black">Daily Quests</p>
            </div>
            <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
              <DailyTasks quests={dailyQuests} />
            </div>
          </div>
        </div>
        {unclaimed && (
          <div className="unclaimed-main flex flex-col w-1/3 border-l-2 p-8">
            <div className="info flex items-center mb-8">
              <img src={homeInfoSVG} alt="" />
              <span className="ml-2">
                Complete your profile & earn 4 xCapx{" "}
              </span>
            </div>
            <div className="heading flex items-center mb-8">
              <img src={AlertIcon} alt="" />
              <p className="ml-2">Unclaimed 16 xCapx</p>
            </div>
            <OldTasks quests={quests} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
