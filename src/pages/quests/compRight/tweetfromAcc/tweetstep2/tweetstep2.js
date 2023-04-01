import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import TopLoader from "../../../../../components/topLoader/TopLoader";
import { config } from "../../../../../config";
import { useFirestoreCollection } from "../../../../../hooks/useFirestoreCollection";
import ErrorModal from "../../errorModal/ErrorModal";
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Tweetstep2 = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [tweetUrl, setTweetUrl] = useState("");
  const [enableVerify, setEnableVerify] = useState(false);
  const userData = useSelector((state) => state.user);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeadning, setModalHeadning] = useState("");
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const [errorModalBtnText, setErrorModalBtnText] = useState("");
  const [textForTweet, setTextForTweet] = useState(
    "I just earned 5 xCapx tokens on #CapxApp Beta 🫶\n\nYou can join too - capx.fi/waitlist\n\n@CapxFi"
  );

  const navigate = useNavigate();

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  const handleInputChange = (e) => {
    if (e.target.value && e.target.value.length >= 0) {
      setTweetUrl(e.target.value);
    }
  };

  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` +
      actionData.questID +
      `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    ["__name__", "==", String(actionData.action_order_id)]
  );

  useEffect(() => {
    if (data) {
      setActionDetails(data[0]);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (tweetUrl && tweetUrl.trim().length >= 0) {
      setEnableVerify(true);
    } else {
      setEnableVerify(false);
    }
  }, [tweetUrl]);

  const handleErrorModal = () => {
    if (actionDetails?.action_order_subtype === "checkUserTweet") {
      if (!regex.test(tweetUrl.trim())) {
        SetIsOpenErrorModal(false);
      } else {
        navigate("/profile");
        SetIsOpenErrorModal(false);
      }
    } else {
      if (!userData.socials.twitter_username) {
        navigate("/profile");
        SetIsOpenErrorModal(false);
      }
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(textForTweet);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  const handleActionComplete = (e) => {
    if (actionDetails?.action_order_subtype === "checkUserTweet") {
      if (
        regex.test(tweetUrl.trim()) &&
        userData &&
        userData.socials &&
        userData.socials.twitter_username
      ) {
        actionData.handleCompleteAction(e, {
          type: "verifyTweet",
          value: tweetUrl,
        });
      } else {
        if (!regex.test(tweetUrl.trim())) {
          setModalHeadning("Please enter a valid tweet link");
          setErrorModalBtnText("");
          SetIsOpenErrorModal(true);
        } else {
          setModalHeadning(
            "Please connect your twitter account before continuing"
          );

          setErrorModalBtnText("Navigate to profile");
          SetIsOpenErrorModal(true);
        }
      }
    } else {
      if (userData && userData.socials && userData.socials.twitter_username) {
        actionData.handleCompleteAction(e, {
          type: "twitterVerify",
        });
      } else {
        setModalHeadning(
          "Please connect your twitter account before continuing"
        );
        setErrorModalBtnText("Navigate to profile");
        SetIsOpenErrorModal(true);
      }
    }
  };

  return (
    <div className="createtweet relative flex flex-col gap-3">
      <p className="createtweet-title action-heading ">
        {actionDetails?.action_order_title}
      </p>
      {showCopiedBox && <p className="copied-box ">Copied!</p>}
      <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
        {actionDetails &&
        actionDetails?.action_order_subtype &&
        actionDetails?.action_order_subtype === "checkUserTweet" ? (
          <>
            <div className="createtweet-1 flex flex-col gap-1">
              <p className="heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15">
                Click the below block to copy Tweet
              </p>
              <button
                className="copy-tweet p-4 items-start text-left"
                onClick={handleCopyText}
              >
                {textForTweet.split("\n\n").map((line, ind) => {
                  return (
                    <>
                      {ind !== 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      {line}
                    </>
                  );
                })}
              </button>
            </div>
            <input
              className="createtweet-2 flex flex-col gap-1 fs-15"
              placeholder="https://twitter.com/xyz/post"
              onChange={(e) => handleInputChange(e)}
            />
          </>
        ) : (
          <div className="createtweet-1 flex flex-col gap-1">
            <p className="heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15">
              {actionDetails?.action_order_subtype &&
              actionDetails?.action_order_subtype === "checkIfUserFollows"
                ? "Follow on twitter"
                : "Retweet the below"}
            </p>
            <button
              className="url-box p-4 flex items-center justify-between underline outlined-effect"
              onClick={() => {
                if (
                  Object.values(actionDetails?.action_order_details).length > 0
                ) {
                  window.open(
                    Object.values(actionDetails?.action_order_details)[0]
                  );
                  setEnableVerify(true);
                }
              }}
            >
              {/* <p>{actionDetails?.action_order_details?.tweet_url}</p> */}
              {actionDetails &&
                Object.values(actionDetails?.action_order_details).length >
                  0 && (
                  <p>{Object.values(actionDetails?.action_order_details)[0]}</p>
                )}

              <button className="ml-3">
                <GoLinkExternal />
              </button>
            </button>
          </div>
        )}

        <button
          className={`${
            !enableVerify ? "disabled" : "bg-gredient-2 contained-effect"
          } action-btn self-stretch flex justify-center items-center p-3 rounded-2xl`}
          onClick={handleActionComplete}
          disabled={!enableVerify}
        >
          Verify
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
      <ErrorModal
        heading={ModalHeadning}
        open={isOpenErrorModal}
        handleClose={handleErrorModal}
        BtnText={errorModalBtnText}
      />
      {isPending && <TopLoader />}
    </div>
  );
};

export default Tweetstep2;
