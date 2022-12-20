import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { TwitterNegative } from "../../../../../assets/svg";
import Input from "../../../../../components/Input/Input";

const Tweetstep2 = ({ actionData }) => {
  const [tweetUrl,setTweetUrl] = useState('');
  const [enableVerify,setEnableVerify] = useState(false)
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  const handleInputChange = (e) => {
    if(e.target.value && e.target.value.length>0 &&  e.target.value.trim().match(regex)){
        setTweetUrl(e.target.value)
    }
  }
  useEffect(()=>{
    if(tweetUrl && tweetUrl.trim().length>9){
      setEnableVerify(true)
    }else{
      setEnableVerify(false);
    }
  },[tweetUrl])

  return (
    <div className="createtweet flex flex-col gap-3">
      <p className="createtweet-title action-heading ">
        Action #1 : Let’s Tell the World about Capx App
      </p>

      <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
        <div className="createtweet-1 flex flex-col gap-1">
          <p className="heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15">
            Click the below block to copy Tweet
          </p>
          <button
            className="copy-tweet p-4 items-start text-left"
            onClick={() => {
              navigator.clipboard.writeText(
                "Excited to be part of Capx App Private Beta, and you can become an early member too! 🫶 #CapxApp #CapxFi @CapxFi. To get your special invite code apply on - app.capx.fi"
              );
            }}
          >
            Excited to be part of Capx App Private Beta, and you can become an
            early member too! 🫶 #CapxApp #CapxFi @CapxFi <br />
            <br /> To get your special invite code apply on - app.capx.fi
          </button>
        </div>

        <input
          className="createtweet-2 flex flex-col gap-1 fs-15"
          placeholder="https://twitter.com/xyz/post"
          onChange={(e)=>handleInputChange(e)}
        />

        <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl"
          onClick={(e) =>
            actionData.handleCompleteAction(e, {
              type: "twitterVerify",
              value: tweetUrl,
            })
          }
          disabled={!enableVerify}
        >
          Verify
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
    </div>
  );
};

export default Tweetstep2;
