import React,{useEffect,useState} from "react";
import { CardCoinIcon, PeopleIcon } from "../../../../assets/svg";
// import { goldcoin, peopleicon } from "../../../../assets/images/home";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestOrderId } from "../../../../store/slices/questSlice";
import { Constants } from "../../../../constants/constants";
import Modal from "../../../../components/Modal/Modal";

const handleDragStart = (e) => e.preventDefault();

const OldTasks = ({quests}) => {
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
    if(data && data.result.status && (data.result.status === true || data.result.status.toLowerCase() === "success")){
      console.log(data);
      dispatch(setQuestOrderId({questId:data.result.quest_order_id}))
      navigate('/quest')
    }else if(data && data.result === Constants.QUEST_REGISTERED_ERROR ){
      console.log(data.result);
      dispatch(setQuestOrderId({questId:questId+"|"+auth.uid}))
      navigate('/quest')
    }
  },[data])


  return (
    <div className="oldtasks">
      <div className="oldtasks-wrapper flex flex-col gap-12 pr-8 md:flex-col">
        {quests.map((data, ind) => {
          return (
            <div
              className={`oldtasks-card text-cgreen-600 border-x-2 border-t-2 border-b-8 rounded-2xl fs-14 font-semibold w-full p-5 flex flex-col gap-4 row${
                ind + 1
              }`}
              key = {ind}
              style={{cursor:"pointer"}}
              onClick={(e)=>{handleClick(e,data.id)}}
            >
              <div className="oldtask-row-1 flex flex-col gap-3 md:flex-row w-full justify-between">
                <div className="oldtask-chip flex flex-row py-1 px-2 gap-1 items-center rounded-xl border-2">
                  <img src={CardCoinIcon} className="w-5"></img>
                  <p className="fs-13">{data.taskreward+ " xCapx"}</p>
                </div>

                <div className="oldtask-chip flex flex-row p-2 gap-1 items-center rounded-xl border-2">
                  <p className="fs-13">Completed by {data.completed_by}</p>
                  <img src={PeopleIcon} className="w-5"></img>
                </div>
              </div>
              <p className="oldtask-title fs-21 px-2 pt-4">{data.tasktitle}</p>
            </div>
          );
        })}
      </div>
      {isPending && <Modal/>}
    </div>
  );
};

export default OldTasks;
