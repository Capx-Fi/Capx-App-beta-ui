import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import TopLoader from "../../../../../components/topLoader/TopLoader";
import { config } from "../../../../../config";
import { useFirestoreCollection } from "../../../../../hooks/useFirestoreCollection";
import ErrorModal from "../../errorModal/ErrorModal";

const Tweetstep2 = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [tweetUrl, setTweetUrl] = useState("");
  const [enableVerify, setEnableVerify] = useState(false);
  const userData = useSelector((state) => state.user);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeadning, setModalHeadning] = useState("");
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const [textForTweet, setTextForTweet] = useState(
    "I just earned 5 xCapx tokens on #CapxApp Beta 🫶\n\nYou can join too - capx.fi/waitlist\n\n@CapxFi"
  );

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
    SetIsOpenErrorModal(false);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(textForTweet);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  const handleActionComplete = (e) => {
    if (tweetUrl.trim().match(regex)) {
      if (
        userData &&
        userData.socials &&
        userData.socials.twitter_id.trim().length > 0 &&
        userData.socials.twitter_username.trim().length > 0
      ) {
        actionData.handleCompleteAction(e, {
          type: "twitterVerify",
          value: tweetUrl,
        });
      } else {
        setModalHeadning(
          "Please connect your twitter account before continuing"
        );
        SetIsOpenErrorModal(true);
      }
    } else {
      setModalHeadning("Please enter a valid tweet link");
      SetIsOpenErrorModal(true);
    }
  };

  return (
    <div className="createtweet relative flex flex-col gap-3">
      <p className="createtweet-title action-heading ">
        {actionDetails?.action_order_title}
      </p>
      {showCopiedBox && <p className="copied-box ">Copied!</p>}
      <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
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
        {actionDetails?.action_order_details?.tweet_url && (
          <div className="thread-box">
            <p className="text">
              Please go to this thread and retweet the text
            </p>
            <p
              onClick={() => {
                window.open(actionDetails?.action_order_details.tweet_url);
              }}
              className="thread underline cursor-pointer break-all"
            >
              {actionDetails?.action_order_details.tweet_url}
            </p>
          </div>
        )}

        <input
          className="createtweet-2 flex flex-col gap-1 fs-15"
          placeholder="https://twitter.com/xyz/post"
          onChange={(e) => handleInputChange(e)}
        />

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
      />
      {isPending && <TopLoader />}
    </div>
  );
};

export default Tweetstep2;
