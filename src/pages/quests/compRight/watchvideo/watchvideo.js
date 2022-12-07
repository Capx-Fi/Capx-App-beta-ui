import React,{useState} from "react";
import { HiArrowRight } from "react-icons/hi";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";

const WatchVideo = ({actionData}) => {
  console.log(actionData)
  const [actionDetails,setActionDetails] = useState(null);
  const {isPending,data,error} = useFirestoreCollection("quest_order/"+actionData.questID+"/action_order/",["action_order_id","==",String(actionData.questID+'-'+actionData.action_id)])
  return (
    <div className="watch-video flex-col md:ml-20 px-5 md:px-0">
      <p className="action-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : What is Capx App?</p>
      <div className="video-wrapper p-2 pb-5 bg-slate-50 w-full rounded-3xl border-2 mb-10">
        <iframe src='https://www.youtube.com/embed/GvhWAIFosF8'
        frameBorder='0' allow='autoplay; encrypted-media'
        allowFullScreen title='video' className="rounded-2xl"/>
      </div>
        <button id="videoClick" className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full" onClick={(e)=>actionData.handleCompleteAction(e,{type:"video",value:""})}>
            Complete Action
            <HiArrowRight className="text-xl ml-4" />
          </button>
    </div>
  );
};

export default WatchVideo;
