import React, { useEffect, useState } from "react";
import { CardCoinIcon } from "../../../../assets/svg";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { config } from "../../../../config";
import { DailyRewardPng } from "../../../../assets/images";
import Slider from "react-slick";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import TopLoader from "../../../../components/topLoader/TopLoader";

const SliderArrow = ({ style, onClick, direction }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`slider-cust-arrow ${direction}-arrow`}
    >
      {direction === "right" && <ImArrowRight2 />}
      {direction === "left" && <ImArrowLeft2 />}
    </button>
  );
};

const OldTasks = ({ quests }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questId, setQuestId] = useState(null);
  const auth = useSelector((state) => state.auth.user);
  const [url, setUrl] = useState(config.API_URL);
  const { isError, isPending, postData, data } = useApi(url, "POST");

  const handleClick = (e, quest) => {
    e.preventDefault();
    setQuestId(quest.id);
    if (quest.status === "new") {
      const apiDataObject = { data: { questId: quest.id } };
      postData(apiDataObject, "/registerForQuest");
    } else {
      dispatch(setQuestOrderId({ questId: questId + "|" + auth.uid }));
      navigate(`/quest/${quest.id + "|" + auth.uid}`);
    }
  };

  useEffect(() => {
    if (data && data.result.success && data.result.success === true) {
      dispatch(setQuestOrderId({ questId: data.result.quest_order_id }));
      navigate(`/quest/${data.result.quest_order_id}`);
    } else if (
      data &&
      data.result.success === false &&
      (data.result.quest_status === "REGISTERED" ||
        data.result.quest_status === "IN_PROGRESS" ||
        data.result.quest_status === "COMPLETED")
    ) {
      dispatch(setQuestOrderId({ questId: questId + "|" + auth.uid }));
      navigate(`/quest/${data.result.quest_order_id}`);
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
        {quests &&
          quests.length > 0 &&
          quests.map((data, ind) => {
            return (
              <div key={ind} className="oldtasks-card flex pr-5">
                <div className="wrapper flex flex-col items-stretch bg-white rounded-xl p-3 gap-3">
                  <div className="img-box rounded-xl overflow-hidden">
                    <img
                      src={
                        data.image_url.trim().length > 0
                          ? data.image_url
                          : DailyRewardPng
                      }
                      alt="rewards"
                    />
                    <div className="card-chip flex items-center">
                      <img src={CardCoinIcon} alt="coin" />
                      <span>{data.taskreward + " xCapx"}</span>
                    </div>
                  </div>
                  <p className="card-title px-3">{data.tasktitle}</p>
                  <button
                    onClick={(e) => {
                      handleClick(e, data);
                    }}
                    className="card-btn contained-effect flex justify-between items-center rounded-xl"
                  >
                    {data.status === "COMPLETED" ? (
                      <span>{"Claim"}</span>
                    ) : (
                      <span>
                        {data.status === "IN_PROGRESS" ||
                        data.status === "REGISTERED"
                          ? "Resume"
                          : "Begin Quest"}
                      </span>
                    )}
                    <ImArrowRight2 className="text-white" />
                  </button>
                </div>
              </div>
            );
          })}
      </Slider>
      {isPending && <TopLoader />}
    </div>
  );
};

export default OldTasks;
