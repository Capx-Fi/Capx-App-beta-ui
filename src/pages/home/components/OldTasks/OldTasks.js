import React, { useEffect, useState } from "react";
import { CardCoinIcon, PeopleIcon } from "../../../../assets/svg";
// import { goldcoin, peopleicon } from "../../../../assets/images/home";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { Constants } from "../../../../constants/constants";
import Modal from "../../../../components/Modal/Modal";
import { DailyRewardPng, InviteFriends } from "../../../../assets/images";
import Slider from "react-slick";

const handleDragStart = (e) => e.preventDefault();

const OldTasks = ({ quests }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questId, setQuestId] = useState(null);
  const auth = useSelector((state) => state.auth.user);
  const [url, setUrl] = useState(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev"
  );
  const { isError, isPending, postData, data } = useApi(url, "POST");

  const handleClick = (e, questId) => {
    e.preventDefault();
    console.log(questId);
    setQuestId(questId);
    const apiDataObject = { data: { questId: questId } };
    postData(apiDataObject, "/registerUserForQuest");
  };

  useEffect(() => {
    if (data && data.result.success && data.result.success === true) {
      console.log(data);
      dispatch(setQuestOrderId({ questId: data.result.quest_order_id }));
      navigate("/quest");
    } else if (
      data &&
      data.result.success === false &&
      data.result.message === Constants.QUEST_REGISTERED_ERROR
    ) {
      console.log(data.result);
      dispatch(setQuestOrderId({ questId: questId + "|" + auth.uid }));
      navigate("/quest");
    }
  }, [data]);

  const SliderSettings = {
    dots: false,
    infinite: false,
    accessibility: true,

    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1382,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          variableWidth: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 490,
        settings: {
          variableWidth: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="oldtasks">
      <div className="oldtasks-wrapper flex flex-col gap-12 pr-8 md:flex-col">
        {quests.map((data, ind) => {
          return (
            <div
              className={`oldtasks-card text-cgreen-600 border-x-2 border-t-2 border-b-8 rounded-2xl fs-14 font-semibold w-full p-5 flex flex-col gap-4 row${
                ind + 1
              }`}
              key={ind}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                handleClick(e, data.id);
              }}
            >
              <div className="oldtask-row-1 flex flex-col gap-3 md:flex-row w-full justify-between">
                <div className="oldtask-chip flex flex-row py-1 px-2 gap-1 items-center rounded-xl border-2">
                  <img src={CardCoinIcon} className="w-5"></img>
                  <p className="fs-13">{data.taskreward + " xCapx"}</p>
                </div>

                <div className="oldtask-chip flex flex-row p-2 gap-1 items-center rounded-xl border-2">
                  <p className="fs-13">Completed by {data.completed_by}</p>
                  <img src={PeopleIcon} className="w-5"></img>
                </div>
              </div>
              <p className="oldtask-title fs-21 px-2 pt-4">{data.tasktitle}</p>
            </div>
          );
        })}
      </div>
      <Slider {...SliderSettings}>
        <div className="oldtasks-card flex px-3">
          <div className="wrapper bg-blue-600 flex flex-col items-stretch bg-white rounded-xl p-3 gap-3">
            <div className="img-box rounded-xl overflow-hidden">
              <img src={DailyRewardPng} alt="rewards" />
              <div className="card-chip flex items-center">
                <img src={CardCoinIcon} alt="coin" />
                <span>4 xCapx</span>
              </div>
            </div>
            <p className="card-title px-3">this is our acrd title</p>
          </div>
        </div>
      </Slider>
      {isPending && <Modal />}
    </div>
  );
};

export default OldTasks;
