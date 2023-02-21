import React, { useEffect, useState } from "react";
import { DailyQuestsIcon } from "../../assets/svg";
import ConsTasks from "./components/ConsTasks/ConsTasks";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import OldTasks from "./components/OldTasks/OldTasks";
import SpecialTasks from "./components/SpecialTasks/SpecialTasks";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import { setQuestOrderId, setQuestsData } from "../../store/slices/questSlice";
import { config } from "../../config";
import TopLoader from "../../components/topLoader/TopLoader";
import Skeleton from "./components/skeleton/Skeleton";
import { DailyRewardPanda } from "../../assets/images";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { analytics } from "../../firebase/firebase";
import { logEvent } from "firebase/analytics";
import CongratulationModal from "../quests/compRight/congratulationModal/CongratulationModal";

const Home = () => {
  const dispatch = useDispatch();
  const [dailyQuests, setDailyQuests] = useState([]);
  const [dailyReward, setDailyReward] = useState([]);
  const [prevQuests, setPrevQuests] = useState([]);
  const [specialQuests, setSpecialQuests] = useState([]);
  const [openCongratulationModal, setOpenCongratulationModal] = useState(false);
  const [congratulationModalText, setCongratulationModalText] = useState("");
  const [congratulationModalHeading, setCongratulationModalHeading] =
    useState("");
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const {
    isError,
    isPending: isApiPending,
    postData,
    data: Apidata,
  } = useApi(config.API_URL, "POST");

  const { data, error, isPending, reFetchData } = useFirestoreCollection(
    `${config.ORG_COLLECTION}/${config.ORG_ID}/${config.ORG_QUEST_COLLECTION}`,
    ["__name__", "==", "quest_agg_1"]
  );

  useEffect(() => {
    if (data && !isPending) {
      const questData = data[0];
      let result = [];
      Object.keys(data[0].quests).forEach((val) => {
        const dataObject = {
          allowed_users: questData.quests[val].allowed_users,
          quest_category: questData.quests[val].quest_category,
          task_no: val.split("=")[1].split("_")[1],
          id: val,
          tasktitle: questData.quests[val].title,
          tags: questData.quests[val].tags,
          rewards_type: questData.quests[val].rewards_type,
          taskreward: questData.quests[val].max_rewards,
          expiry: questData.quests[val].expiry,
          image_url: questData.quests[val].image_url,
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

      setDailyReward(
        result.filter((val) => {
          return val.taskCategory.toLowerCase() === "dailyreward";
        })
      );

      setDailyQuests(
        result
          .filter((val) => {
            if (
              val.created_on === todaysDate &&
              val.taskCategory.toLowerCase() !== "special" &&
              val.status === "new" &&
              val.taskCategory.toLowerCase() !== "dailyreward"
            ) {
              if (val.allowed_users.length > 0) {
                return val.allowed_users.includes(user.username);
              } else {
                return true;
              }
            } else {
              return false;
            }
          })
          .sort((a, b) => (a.task_no > b.task_no ? 1 : -1))
      );
      setSpecialQuests(
        result
          .filter((val) => {
            if (val.taskCategory.toLowerCase() === "special") {
              if (
                val.quest_category === "Alpha_AirDrop" &&
                val.status === "CLAIMED"
              ) {
                return false;
              } else {
                if (val.allowed_users.length > 0) {
                  return val.allowed_users.includes(user.username);
                } else {
                  return true;
                }
              }
            } else {
              return false;
            }
          })
          .sort((a, b) => (a.task_no > b.task_no ? 1 : -1))
      );
      setPrevQuests(
        result
          .filter((val) => {
            if (
              (val.created_on !== todaysDate ||
                val.status === "IN_PROGRESS" ||
                val.status === "REGISTERED" ||
                val.status === "COMPLETED") &&
              val.status !== "CLAIMED" &&
              val.taskCategory.toLowerCase() === "normal"
            ) {
              if (val.allowed_users.length > 0) {
                return val.allowed_users.includes(user.username);
              } else {
                return true;
              }
            } else {
              return false;
            }
          })
          .sort((a, b) => (a.task_no > b.task_no ? 1 : -1))
      );
      if (
        result.filter((val) => {
          return val.created_on !== todaysDate && val.status !== "COMPLETED";
        }).length !== 0
      ) {
        var element = document.getElementById("home-container");
        element.classList.add("flex-wrap");
        var secondEle = document.getElementById("scroll-container");
        secondEle.classList.remove("md:w-3/5");
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

  const handleClaimDailyReward = (e) => {
    e.preventDefault();
    if (dailyReward[0].status === "new") {
      logEvent(analytics, "QUEST_REGISTRATION_ATTEMPT", {
        questID: dailyReward[0].id,
        user: auth.uid,
      });
      logEvent(analytics, "QUEST_REGISTRATION_DAILY_REWARD_ATTEMPT", {
        questID: dailyReward[0].id,
        user: auth.uid,
      });
      const apiDataObject = { data: { questId: dailyReward[0].id } };
      postData(apiDataObject, "/registerForQuest");
    } else {
      logEvent(analytics, "QUEST_RESUME", {
        questID: dailyReward[0].id,
        user: auth.uid,
        questOrderId: dailyReward[0].id + "|" + auth.uid,
      });
      logEvent(analytics, "QUEST_DAILY_REWARD_RESUME", {
        questID: dailyReward[0].id,
        user: auth.uid,
        questOrderId: dailyReward[0].id + "|" + auth.uid,
      });
      dispatch(
        setQuestOrderId({ questId: dailyReward[0].id + "|" + auth.uid })
      );
      const apiDataObject = {
        data: { action_order_id: dailyReward[0].id + "|" + auth.uid + "-1" },
      };
      postData(apiDataObject, "/completeAction");
    }
  };

  useEffect(() => {
    //to-do:change succcess to success
    if (Apidata && Apidata.result.success && Apidata.result.success === true) {
      if (Apidata.result.quest_order_id) {
        logEvent(analytics, "QUEST_REGISTRATION_SUCCESS", {
          questID: dailyReward[0].id,
          user: auth.uid,
          questOrderId: Apidata.result.quest_order_id,
        });
        logEvent(analytics, "QUEST_REGISTRATION_DAILY_REWARD_SUCCESS", {
          questID: dailyReward[0].id,
          user: auth.uid,
          questOrderId: Apidata.result.quest_order_id,
        });

        dispatch(setQuestOrderId({ questId: Apidata.result.quest_order_id }));
        navigate(`/quest/${Apidata.result.quest_order_id}`);
      } else {
        if (Apidata.result.message.includes("|")) {
          const modalData = Apidata.result.message.split("|");
          setCongratulationModalHeading(modalData[0]);
          setCongratulationModalText(modalData[1]);
        }
        setOpenCongratulationModal(true);
        reFetchData({
          status: true,
          data: ["__name__", "==", "quest_agg_1"],
        });
      }
    } else if (
      Apidata &&
      Apidata.result.success === false &&
      (Apidata.result.quest_status === "REGISTERED" ||
        Apidata.result.quest_status === "IN_PROGRESS")
    ) {
      logEvent(analytics, "QUEST_RESUME", {
        questID: dailyReward[0].id,
        user: auth.uid,
        questOrderId: Apidata.result.quest_order_id,
      });
      logEvent(analytics, "QUEST_DAILY_REWARD_RESUME", {
        questID: dailyReward[0].id,
        user: auth.uid,
        questOrderId: Apidata.result.quest_order_id,
      });
      dispatch(
        setQuestOrderId({ questId: dailyReward[0].id + "|" + auth.uid })
      );
      navigate(`/quest/${Apidata.result.quest_order_id}`);
    }
  }, [Apidata]);

  return (
    <div
      className={"home flex flex-col flex-wrap md:flex-row md:p-8 p-5 gap-8"}
      id="home-container"
    >
      <div
        className="home-wrapper-1 flex flex-col gap-8 w-full"
        id="scroll-container"
      >
        <HomeBanner />
        {isPending ? (
          <Skeleton />
        ) : (
          <>
            {dailyQuests.length !== 0 && (
              <div className="home-wrapper-1-inner flex flex-col gap-5">
                <div className="home-title flex flex-row items-center gap-2">
                  <img src={DailyQuestsIcon} className="w-8" alt="quest" />
                  <p className="fs-16 font-black">Daily Rewards</p>
                </div>
                <div className="home-tasks flex flex-row 11/12">
                  <ConsTasks quests={dailyQuests} />
                </div>
              </div>
            )}

            <div className="home-wrapper-1-inner flex flex-col gap-5">
              <div className="home-title flex flex-row items-center gap-2">
                <img src={DailyQuestsIcon} className="w-8" />
                <p className="fs-16 font-black">Special Quests</p>
              </div>
              <div className="home-tasks ">
                <SpecialTasks quests={specialQuests} />
              </div>
            </div>
          </>
        )}
      </div>

      {prevQuests && prevQuests.length > 0 && (
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
      )}
      {dailyReward.length > 0 && dailyReward[0].status !== "CLAIMED" && (
        <button
          onClick={handleClaimDailyReward}
          className="fixed-daily-reward fixed flex items-center outlined-effect text-start"
        >
          <img src={DailyRewardPanda} alt="panda" />
          <p className="ml-2">
            Claim your
            <br />
            Daily Streak!
          </p>
        </button>
      )}
      {openCongratulationModal && (
        <CongratulationModal
          open={openCongratulationModal}
          // open={true}
          heading={congratulationModalHeading}
          modalText={congratulationModalText}
          leftButton={{
            text: "Go To Home",
            handler: () => {
              setOpenCongratulationModal(false);
              navigate("/");
            },
          }}
          rightButton={{
            text: "Go To Wallet",
            handler: () => {
              navigate("/my-wallet");
            },
          }}
        />
      )}
      {(isPending || isApiPending) && <TopLoader />}
    </div>
  );
};

export default Home;
