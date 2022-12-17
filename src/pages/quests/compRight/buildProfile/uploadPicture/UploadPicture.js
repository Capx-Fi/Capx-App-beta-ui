import React, { useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
  InputCheckSvg,
  ProfileIconSvg,
  ProfileoutlineIconSvg,
} from "../../../../../assets/svg";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";

const UploadPicture = ({ actionData }) => {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [showClaimBtn, setShowClaimBtn] = useState(false);
  const [showActionCompleteDialog, setShowActionCompleteDialog] =
    useState(false);

  const handleShowClaimBtn = () => {
    setShowClaimBtn((prev) => (prev ? false : true));
  };

  const handleActionCompleteDialog = () => {
    setShowActionCompleteDialog((prev) => (prev ? false : true));
  };

  const handleDragover = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImageFile(event.dataTransfer.files);
  };
  if (imageFile) {
    console.log(imageFile[0].name);
  }
  return (
    <>
      <div className="upload-picture-action flex flex-col gap-3">
        <p className="reward-title action-heading">
          Action #2 : Update your Profile Picture to earn 1 xCapx
        </p>
        <div className="upload-picture-wrapper flex flex-col gap-1">
          <label className="label" for="picture">
            UPLOAD YOUR PROFILE PICTURE*
          </label>
          <div className="input-wrapper flex flex-col  mb-4 relative">
            <div
              onDragOver={handleDragover}
              onDrop={handleDrop}
              onClick={(e) => inputRef.current.click()}
              className="dropzone flex flex-col items-center gap-3"
            >
              <img
                src={imageFile ? InputCheckSvg : ProfileoutlineIconSvg}
                alt="profile"
              />
              <p className="text hidden md:block">
                {imageFile ? imageFile[0].name : "Upload a file or Drag & Drop"}
              </p>
              <p className="text block md:hidden">
                {imageFile ? imageFile[0].name : "Upload a file or Drag & Drop"}
              </p>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files)}
                hidden
                ref={inputRef}
              />
            </div>
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

export default UploadPicture;
