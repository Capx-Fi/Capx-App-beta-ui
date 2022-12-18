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
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const [dailyQuests, setDailyQuests] = useState([]);
  const [prevQuests, setPrevQuests] = useState([]);
  const [specialQuests,setSpecialQuests] = useState([]);
  const user = useSelector((state) => state.user);
  const { data, error, isPending } = useFirestoreCollection(
    "xorgs/f7ILwJaAwQ+2n4D8euNpQ0lVuFJJAYLvw9O2niisDZM=/quests",
    ["docType", "==", "Aggregate"]
  );

  useEffect(() => {
    if (data && !isPending) {
      console.log(data);
      console.log(user);
      const questData = data[0];
      let result = [];
      Object.keys(data[0].quests).forEach((val) => {
        const dataObject = {
          id: val,
          tasktitle: questData.quests[val].title,
          tags: questData.quests[val].tags,
          rewards_type: questData.quests[val].rewards_type,
          taskreward: questData.quests[val].max_rewards,
          expiry: questData.quests[val].expiry,
          taskbtntext: user.questData.some((obj) => val === obj.questID)
            ? "Resume"
            : "Claim now",
          taskchip: "Daily Reward",
          taskCategory: questData.quests[val].quest_type,
          created_on: formatDate(
            new Date(
              (Number(user.registered_on) +
                Number(questData.quests[val].launch_day_period)) *
                1000
            )
          ),
          completed_by: questData.quests[val].completed_by,
          status: user.questData.some((obj) => val === obj.questID)
            ? user.questData.filter((obj) => {
                return obj.questID === val;
              })[0].status
            : "new",
        };
        result.push(dataObject);
      });
      let todaysDate = formatDate(new Date());
      dispatch(setQuestsData({ allQuests: result }));
      setDailyQuests(
        result.filter((val) => {
          return (val.taskCategory.toLowerCase() === 'dailyreward' || (val.created_on === todaysDate && val.taskCategory.toLowerCase() !== 'special'));
        })
      );
      setSpecialQuests(
        result.filter((val) => {
          return val.taskCategory.toLowerCase() === 'special';
        })
      );
      setPrevQuests(
        result.filter((val) => {
          return val.created_on !== todaysDate && val.status !== "COMPLETED" && val.taskCategory.toLowerCase() === 'normal' ;
        })
      );
      if(result.filter((val)=>{return val.created_on !== todaysDate && val.status !== "COMPLETED"}).length !== 0){
        var element = document.getElementById("home-container");
        element.classList.add("flex-wrap");
        var secondEle = document.getElementById("scroll-container")
        secondEle.classList.remove("md:w-3/5")
      }
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
    <div
      className={"home flex flex-col md:flex-row md:p-8 p-5 gap-8"}
      id="home-container"
    >
      <div
        className="home-wrapper-1 flex flex-col gap-8 w-full"
        id="scroll-container"
      >
        <HomeBanner />
        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={DailyQuestsIcon} className="w-8" alt="quest" />
            <p className="fs-16 font-black">Daily Quests</p>
          </div>
          <div className="home-tasks flex flex-row 11/12">
            <ConsTasks quests={dailyQuests} />
          </div>
        </div>

        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={DailyQuestsIcon} className="w-8" />
            <p className="fs-16 font-black">Special Quests</p>
          </div>

          <div className="home-tasks">
            <SpecialTasks quests={specialQuests} />
            {/* <DailyTasks quests={dailyQuests} /> */}
          </div>
        </div>
      </div>
      {/* prevQuests && prevQuests.length > 0 && */}
      { prevQuests && prevQuests.length > 0 &&
        <div className="home-wrapper-2 w-full">
          <div className="home-wrapper-1-inner flex flex-col gap-5">
            <div className="home-title flex flex-row items-center gap-2">
              <img src={DailyQuestsIcon} className="w-8" alt="quest" />
              <p className="fs-16 font-black">
                Unclaimed{" "}
                {prevQuests.reduce((acc, val) => {
                  return acc + Number(val.taskreward);
                }, 0)}{" "}
                xCapx
              </p>
            </div>
            <OldTasks quests={prevQuests} />
          </div>
        </div>
      }
      {isPending && <Modal></Modal>}
    </div>
  );
};

export default Home;
