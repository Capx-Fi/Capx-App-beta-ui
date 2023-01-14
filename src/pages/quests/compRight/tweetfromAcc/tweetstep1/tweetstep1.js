import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useRef } from "react";

const Tweetstep1 = ({ actionData }) => {
  const [showCopiedBox, setShowCopiedBox] = useState(false);

  const handleCopyTextButton = () => {
    navigator.clipboard.writeText(
      "I just earned 5 xCapx tokens on #CapxApp Beta 🫶\n\nYou can join too - capx.fi/waitlist\n\n@CapxFi"
    );
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  return (
    <div className="createtweet relative flex flex-col gap-3">
      <p className="createtweet-title action-heading ">
        Action #1 : Let’s Tell the World about Capx App
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
            I just earned 5 xCapx tokens on #CapxApp Beta 🫶<br />
            <br /> You can join too - capx.fi/waitlist <br/>
            <br/> @CapxFi
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
            onClick={(e) =>
              actionData.handleCompleteAction(e, {
                type: "video",
                value: "twitterCopy",
              })
            }
          >
            Next Action
            <HiArrowRight className="text-xl ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweetstep1;
