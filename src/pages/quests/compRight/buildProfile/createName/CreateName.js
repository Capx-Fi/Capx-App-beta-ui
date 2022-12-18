import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { InputCheckSvg } from "../../../../../assets/svg";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";

const CreateName = ({ actionData }) => {
  const [showClaimBtn, setShowClaimBtn] = useState(false);
  const [varified, setVarified] = useState(false);
  const [profileNameInput, setProfileNameInput] = useState("");
  const [showActionCompleteDialog, setShowActionCompleteDialog] =
    useState(false);

  const handleShowClaimBtn = () => {
    setShowClaimBtn((prev) => (prev ? false : true));
    setVarified(true);
  };

  const handleInputChange = (e) => {
    setProfileNameInput(e.target.value);
    setVarified(false);
    setShowClaimBtn(false);
  };

  const handleActionCompleteDialog = () => {
    setShowActionCompleteDialog((prev) => (prev ? false : true));
  };

  console.log(showClaimBtn);

  return (
    <>
      <div className="create-profile flex flex-col gap-3">
        <p className="reward-title action-heading ">
          Action #1 : Complete your Profile
        </p>
        <div className="create-profile-wrapper flex flex-col gap-1">
          <label className="label" for="name">
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
              onClick={handleShowClaimBtn}
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
            >
              Submit <HiArrowRight className="text-xl " />
            </button>
          )}

          {showClaimBtn && (
            <button
              onClick={(e) =>
                // actionData.handleCompleteAction(e, { type: "profile", value: "" })
                handleActionCompleteDialog()
              }
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
            >
              Claim 1 xCapx <HiArrowRight className="text-xl " />
            </button>
          )}
        </div>
      </div>
      <ActionCompleteModal
        open={showActionCompleteDialog}
        handleClose={handleActionCompleteDialog}
      />
    </>
  );
};

export default CreateName;
