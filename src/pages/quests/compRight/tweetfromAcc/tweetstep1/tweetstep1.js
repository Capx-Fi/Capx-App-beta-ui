import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import ErrorModal from "../../errorModal/ErrorModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Tweetstep1 = ({ actionData }) => {
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const [errorModalHeading, setErrorModalHeading] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalBtnText, setErrorModalBtnText] = useState("");
  const [textForTweet, setTextForTweet] = useState(
    "I just earned 5 xCapx tokens on #CapxApp Beta 🫶\n\nYou can join too - capx.fi/waitlist\n\n@CapxFi"
  );
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const handleCopyTextButton = () => {
    navigator.clipboard.writeText(textForTweet);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  const handleErrorModal = () => {
    if (userData?.socials?.twitter_username) {
      setIsErrorModalOpen(false);
    } else {
      navigate("/profile");
    }
  };

  const handleActionComplete = (e) => {
    if (userData?.socials?.twitter_username) {
      actionData.handleCompleteAction(e, {
        type: "video",
        value: "twitterCopy",
      });
    } else {
      setErrorModalHeading(
        "Please connect your twitter account before continuing"
      );
      setErrorModalBtnText("Navigate to profile");
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="createtweet relative flex flex-col gap-3">
      <p className="createtweet-title action-heading ">
        Action #1 : Let's Tell the World about Capx App
      </p>
      {showCopiedBox && <p className="copied-box ">Copied!</p>}

      <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
        <div className="createtweet-1 flex flex-col gap-1">
          <p className="heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15">
            Click the below block to copy Tweet
          </p>
          <button
            onClick={handleCopyTextButton}
            className="copy-tweet p-4 items-start text-left"
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

        <div className="createtweet-2 flex flex-col gap-1 fs-15">
          <p className=" heading text-cgreen-700 opacity-50 font-medium pl-2">
            NOTE
          </p>
          <p className="copy-tweet p-4">
            Use Hashtags :<span className="font-bold">#CapxApp</span>
            <br />
            Tag us on the tweet: <span className="font-bold">@CapxFi</span>
          </p>
        </div>

        <div className="btns flex justify-between">
          <button
            onClick={handleCopyTextButton}
            className="btn-outlined outlined-effect"
          >
            Copy
          </button>
          <button
            className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl"
            onClick={handleActionComplete}
          >
            Next Action
            <HiArrowRight className="text-xl ml-4" />
          </button>
        </div>
      </div>
      <ErrorModal
        heading={errorModalHeading}
        open={isErrorModalOpen}
        handleClose={handleErrorModal}
        BtnText={errorModalBtnText}
      />
    </div>
  );
};

export default Tweetstep1;
