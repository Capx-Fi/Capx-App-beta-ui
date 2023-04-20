import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SpecialCardImage } from "../../../../assets/images";
import { CardCoinIcon } from "../../../../assets/svg";
import SliderArrow from "../../../../components/SliderArrow/SliderArrow";
import { useApi } from "../../../../hooks/useApi";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { config } from "../../../../config";
import TopLoader from "../../../../components/topLoader/TopLoader";
import { analytics } from "../../../../firebase/firebase";
import { logEvent } from "firebase/analytics";

const SpecialTasks = ({ quests }) => {
  const dailytaskdata = [...quests];

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
      logEvent(analytics, "QUEST_REGISTRATION_ATTEMPT", {
        questID: quest.id,
        user: auth.uid,
      });
      const apiDataObject = { data: { questId: quest.id } };
      postData(apiDataObject, "/registerForQuest");
    } else {
      logEvent(analytics, "QUEST_RESUME", {
        questID: quest.id,
        user: auth.uid,
        questOrderId: quest.id + "|" + auth.uid,
      });
      dispatch(setQuestOrderId({ questId: quest.id + "|" + auth.uid }));
      navigate(`/quest/${quest.id + "|" + auth.uid}`);
    }
  };

  useEffect(() => {
    if (data && data.result.success && data.result.success === true) {
      logEvent(analytics, "QUEST_REGISTRATION_SUCCESS", {
        questID: questId,
        user: auth.uid,
        questOrderId: data.result.quest_order_id,
      });
      dispatch(setQuestOrderId({ questId: data.result.quest_order_id }));
      navigate(`/quest/${data.result.quest_order_id}`);
    } else if (
      data &&
      data.result.success === false &&
      (data.result.quest_status === "REGISTERED" ||
        data.result.quest_status === "IN_PROGRESS" ||
        data.result.quest_status === "CLAIMED" ||
        data.result.quest_status === "COMPLETED")
    ) {
      logEvent(analytics, "QUEST_RESUME", {
        questID: questId,
        user: auth.uid,
        questOrderId: data.result.quest_order_id,
      });
      dispatch(setQuestOrderId({ questId: data.result.quest_order_id }));
      navigate(`/quest/${data.result.quest_order_id}`);
    }
  }, [data]);

  const SliderSettings = {
    dots: false,
    infinite: false,
    accessibility: true,
    variableWidth: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
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
          {dailytaskdata &&
            dailytaskdata.length > 0 &&
            dailytaskdata.map((data, ind) => {
              return (
                <div
                  onClick={(e) => {
                    handleClick(e, data);
                  }}
                  key={"unique" + ind}
                  className={`specialcards-main flex pr-5 `}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`wrapper flex flex-col items-stretch rounded-xl p-3 gap-3 ${
                      data.quest_category === "OG_Invite_Code" ? "og-card" : ""
                    }`}
                  >
                    <div className="img-box rounded-xl overflow-hidden">
                      <img
                        className="w-full card-img"
                        src={
                          data.image_url.trim().length > 0
                            ? data.image_url
                            : SpecialCardImage
                        }
                        alt="invite"
                      />
                      {data.taskreward > 0 && (
                        <div className="card-chip md:hidden flex items-center">
                          <img src={CardCoinIcon} alt="coin" />
                          <span>{data.taskreward + " xCapx"}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="card-title">{data.tasktitle}</p>
                      {data.taskreward > 0 && (
                        <div className="card-chip md:flex hidden items-center ml-5">
                          <img src={CardCoinIcon} alt="coin" />
                          <span className="ml-1">
                            {data.taskreward + " xCapx"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
      {isPending && <TopLoader />}
    </div>
  );
};

export default SpecialTasks;
