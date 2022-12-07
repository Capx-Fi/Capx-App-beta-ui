import React,{useEffect, useState} from "react";
import { CardCoinIcon } from "../../../../assets/svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { Constants } from "../../../../constants/constants";
import Modal from "../../../../components/Modal/Modal";


const handleDragStart = (e) => e.preventDefault();

const ConsTasks = ({quests}) => {
  const dailytaskdata = [
    ...quests
  ];
  console.log(dailytaskdata)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questId,setQuestId] = useState(null);
  const auth = useSelector((state)=>state.auth.user)
  const [url,setUrl] = useState('https://capx-gateway-cnfe7xc8.uc.gateway.dev')
  const { isError,isPending, postData,  data } = useApi(url,'POST');

  const handleClick = (e,questId) => {
    e.preventDefault();
    console.log(questId);
    setQuestId(questId)
    const apiDataObject = {data:{questId:questId}}
		postData(apiDataObject,'/registerUserForQuest');
    
  }

  useEffect(()=>{
    if(data && data.result.success && (data.result.success === true)){
      console.log(data);
      dispatch(setQuestOrderId({questId:data.result.quest_order_id}))
      navigate('/quest')
    }else if(data && data.result.success === false && data.result.message === Constants.QUEST_REGISTERED_ERROR ){
      console.log(data.result);
      dispatch(setQuestOrderId({questId:questId+"|"+auth.uid}))
      navigate('/quest')
    }
  },[data])

  return (
    <div className="constcards">
      <div className="constcards-wrapper flex flex-col gap-8 pr-8 md:flex-row">
        {dailytaskdata.map((data, ind) => {
          return (
            <div
              className={`constcards-main justify-between px-4 pb-8 pt-3 basis-1/3 border-2 w-72 rounded-3xl flex flex-col gap-32 row${
                ind + 1
              }`}
              key={data.key+String(ind)}
            >
              <div className="taskchip fs-14 font-black text-cgreen-600 self-end rounded-xl">
                {data.taskchip}
              </div>
              <div className="">
                <div className="tasktitle fs-22 font-black text-cgreen-600 user text-start">
                  {data.tasktitle}
                </div>
                <button className="taskbtn w-full bg-cgreen-500 py-3 px-4 rounded-xl flex flex-row font-extrabold text-cgreen-100 task items-center place-content-between"  onClick={(e)=>{handleClick(e,data.id)}}>
                {data && data.status !== "COMPLETED" && <div className="reward-icon flex flex-row gap-2 items-center">
                    <img src={CardCoinIcon} className="w-5" />
                    <p className="fs-15">{data.taskreward+ " xCapx"}</p>
                  </div>}
                  {data && data.status !== "COMPLETED" ?<p>{data.taskbtntext}</p>:<p>Details</p>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isPending && <Modal/>}
    </div>
  );
};

export default ConsTasks;
