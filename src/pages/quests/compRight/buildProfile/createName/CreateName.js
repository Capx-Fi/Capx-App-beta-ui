import React, { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { InputCheckSvg } from "../../../../../assets/svg";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";
import { useFirestoreCollection } from "../../../../../hooks/useFirestoreCollection";
import { config } from "../../../../../config";

const CreateName = ({ actionData }) => {
  const [showClaimBtn, setShowClaimBtn] = useState(false);
  const [varified, setVarified] = useState(false);
  const [profileNameInput, setProfileNameInput] = useState("");

  const [actionDetails, setActionDetails] = useState(null);

  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` + actionData.questID + `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    [
      "__name__",
      "==",
      String(actionData.questID + "-" + actionData.action_id),
    ]
  );

  const [ regex , setRegex ] = useState(new RegExp(/^[a-zA-Z ]*$/));

  useEffect(() => {
    setShowClaimBtn(false);
    setVarified(false);
    if (data) {
      console.log(data[0]);
      setActionDetails(data[0]);
      if(data[0].action_order_status.toLowerCase() === 'completed'){
        setShowClaimBtn(true);
        setVarified(true);
      }
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleInputChange = (e) => {
    if(e.target.value.trim().length >= 0 ){
      setProfileNameInput(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    if(profileNameInput.length > 0 && profileNameInput.trim().match(regex) ){
      let input = {
        type: 'buildProfileName',
        value: profileNameInput.trim()
      }
      actionData.handleCompleteAction(e,input)
    }
  }


  return (
    <>
      <div className="create-profile flex flex-col gap-3">
        <p className="reward-title action-heading ">
          {actionDetails?.action_order_title}
        </p>
        <div className="create-profile-wrapper flex flex-col gap-1">
          <label className="label" htmlFor="name">
            ENTER YOUR PROFILE NAME*
          </label>
          <div className="input-wrapper flex flex-col  mb-4 relative">
            <input
              value={profileNameInput}
              onChange={handleInputChange}
              className="name-input"
              type="text"
              name="name"
              id="name"
              disabled = {(actionDetails?.action_order_status.toLowerCase() === 'completed')}
            />
            {varified && (
              <img
                className="check-icon absolute"
                src={InputCheckSvg}
                alt="check"
              />
            )}
          </div>

          {!showClaimBtn && (
            <button
              onClick={handleSubmit}
              disabled={profileNameInput.trim().length===0}
              className={`action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
                profileNameInput.trim().length===0 ? "disabled" : "bg-gredient-2"
              }`}
            >
              Submit <HiArrowRight className="text-xl " />
            </button>
          )}

          {showClaimBtn && (
            <button
              onClick={(e) =>
                // actionData.handleCompleteAction(e, { type: "profile", value: "" })
                actionData?.claimRewardHandler()
              }
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
            >
              Claim 1 xCapx <HiArrowRight className="text-xl " />
            </button>
          )}
        </div>
      </div>
      
    </>
  );
};

export default CreateName;
