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
import SliderArrow from "../../../../components/SliderArrow/SliderArrow";

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

  console.log(quests);

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
    prevArrow: <SliderArrow direction="left" />,
    nextArrow: <SliderArrow direction="right" />,
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
      <Slider {...SliderSettings}>
        {quests.map((data, ind) => {
          return (
            <div
              key={ind}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                handleClick(e, data.id);
              }}
              className="oldtasks-card flex pr-5"
            >
              <div className="wrapper bg-blue-600 flex flex-col items-stretch bg-white rounded-xl p-3 gap-3">
                <div className="img-box rounded-xl overflow-hidden">
                  <img src={DailyRewardPng} alt="rewards" />
                  <div className="card-chip flex items-center">
                    <img src={CardCoinIcon} alt="coin" />
                    <span>{data.taskreward} xCapx</span>
                  </div>
                </div>
                <p className="card-title px-3">{data.tasktitle}</p>
              </div>
            </div>
          ) 
        })}
      </Slider>
      {isPending && <Modal />}
    </div>
  );
};

export default OldTasks;
