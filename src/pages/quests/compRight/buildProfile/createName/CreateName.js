import React, { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { InputCheckSvg } from "../../../../../assets/svg";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";
import { useFirestoreCollection } from "../../../../../hooks/useFirestoreCollection";

const CreateName = ({ actionData }) => {
  console.log(actionData);
  const [showClaimBtn, setShowClaimBtn] = useState(false);
  const [varified, setVarified] = useState(false);
  const [profileNameInput, setProfileNameInput] = useState("");
  const [showActionCompleteDialog, setShowActionCompleteDialog] = useState(false);

  const [actionDetails, setActionDetails] = useState(null);

  const { isPending, data, error } = useFirestoreCollection(
    "xquest_order/" + actionData.questID + "/action_order/",
    [
      "action_order_id",
      "==",
      String(actionData.questID + "-" + actionData.action_id),
    ]
  );

  const [ regex , setRegex ] = useState(new RegExp(/^[a-zA-Z ]*$/));

  useEffect(() => {
    if (data) {
      console.log(data[0]);
      setActionDetails(data[0]);
      if(data[0].action_order_status === 'COMPLETED'){
        setShowClaimBtn(true);
        setVarified(true);
      }
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleShowClaimBtn = () => {
    setShowClaimBtn((prev) => (prev ? false : true));
    setVarified(true);
  };

  const handleInputChange = (e) => {
    if(e.target.value.trim().length > 0 && e.target.value.trim().match(regex) ){
      setProfileNameInput(e.target.value);
      console.log(e.target.value)
    }
    setVarified(false);
    setShowClaimBtn(false);
    
  };

  const handleActionCompleteDialog = () => {
    setShowActionCompleteDialog((prev) => (prev ? false : true));
  };

  const handleSubmit = (e) => {
    let input = {
      type: 'buildProfileName',
      value: profileNameInput.trim()
    }
    actionData.handleCompleteAction(e,input)
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
              disabled = {(actionDetails?.action_order_status === 'COMPLETED')}
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
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
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
