import React, { useEffect, useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { InviteFriends } from "../../../../assets/images";
import { CardCoinIcon } from "../../../../assets/svg";
import SliderArrow from "../../../../components/SliderArrow/SliderArrow";
import { useApi } from "../../../../hooks/useApi";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { Constants } from "../../../../constants/constants";

const SpecialTasks = ({ quests }) => {
  const dailytaskdata = [...quests];
  console.log(dailytaskdata);
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
    variableWidth: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <SliderArrow direction="left" />,
    nextArrow: <SliderArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 490,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="special-quests bg-green-12">
      <div className="wrapper ">
        <Slider {...SliderSettings}>
          {dailytaskdata.map((data, ind) => {
            return (
              <div
                onClick={(e) => {
                  handleClick(e, data.id);
                }}
                key={"unique" + ind}
                className="specialcards-main flex pr-5"
              >
                <div className="wrapper flex flex-col items-stretch rounded-xl p-3 gap-3">
                  <div className="img-box rounded-xl overflow-hidden">
                    <img
                      className="w-full h-fit card-img"
                      src={InviteFriends}
                      alt="invite"
                    />
                    <div className="card-chip md:hidden flex items-center">
                      <img src={CardCoinIcon} alt="coin" />
                      <span>{data.taskreward + " xCapx"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="card-title">{data.tasktitle}</p>
                    <div className="card-chip md:flex hidden items-center ml-10">
                      <img src={CardCoinIcon} alt="coin" />
                      <span className="ml-1">{data.taskreward + " xCapx"}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialTasks;