import React, { useEffect, useState } from "react";
import { CardCoinIcon } from "../../../../assets/svg";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { config } from "../../../../config";
import Modal from "../../../../components/Modal/Modal";
import { ImArrowRight2 } from "react-icons/im";
import Slider from "react-slick";
import { DailyRewardPng } from "../../../../assets/images";
import SliderArrow from "../../../../components/SliderArrow/SliderArrow";

const ConsTasks = ({ quests }) => {
  const dailytaskdata = [...quests];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questId, setQuestId] = useState(null);
  const auth = useSelector((state) => state.auth.user);
  const [url, setUrl] = useState(config.API_URL);
  const { isError, isPending, postData, data } = useApi(url, "POST");

  const handleClick = (e, questId) => {
    e.preventDefault();
    setQuestId(questId);
    const apiDataObject = { data: { questId: questId } };
    postData(apiDataObject, "/registerForQuest");
  };

  useEffect(() => {
    //to-do:change succcess to success
    if (data && data.result.success && data.result.success === true) {
      dispatch(setQuestOrderId({ questId: data.result.quest_order_id }));
      navigate("/quest");
    } else if (
      data &&
      data.result.success === false &&
      data.result.quest_status === "REGISTERED"
    ) {
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
    <div className="constcards w-full">
      <div className="constcards-wrapper w-full">
        <Slider {...SliderSettings}>
          {dailytaskdata &&
            dailytaskdata.length > 0 &&
            dailytaskdata.map((data, ind) => {
              return (
                <div className="constcards-main flex pr-5" key={data.id}>
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
                        if (data.status !== "CLAIMED") handleClick(e, data.id);
                      }}
                      className="card-btn flex justify-between items-center rounded-xl"
                    >
                      <span>
                        {data.status === "CLAIMED"
                          ? "Completed"
                          : "Begin Quest"}
                      </span>
                      <ImArrowRight2 className="text-white" />
                    </button>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
      {isPending && <Modal />}
    </div>
  );
};

export default ConsTasks;
