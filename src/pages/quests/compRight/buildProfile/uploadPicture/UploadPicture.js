import React, { useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
  InputCheckSvg,
  ProfileoutlineIconSvg,
} from "../../../../../assets/svg";
import { useUploadProfileImage } from "../../../../../hooks/useUploadProfileImage";
import ErrorModal from "../../errorModal/ErrorModal";

const UploadPicture = ({ actionData }) => {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(false);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeadning, setModalHeadning] = useState("");

  const handleErrorModal = () => {
    SetIsOpenErrorModal(false);
    setImageFile(null);
  };

  const {
    uploadImageToCloud,
    isPending: isUploadImgPending,
    error,
  } = useUploadProfileImage();

  const handleDragover = (event) => {
    event.preventDefault();
    console.log("drop");
  };

  const handleDrop = (event) => {
    console.log("fileUploaded");
    event.preventDefault();
    setImageFile(event.dataTransfer.files);
  };

  const handleImageUpdate = (e) => {
    setImgUrl(false);
    let image = e.target.files[0];
    if (
      (image.type === "image/png" || image.type === "image/jpeg") &&
      image.size <= 5242880
    ) {
      setImageFile(image);
      setImgUrl(true);
    } else {
      setModalHeadning("File type/size not allowed");
      SetIsOpenErrorModal(true);
      e.target.value = "";
    }
  };

  const handleActionSubmit = async (e) => {
    if (imageFile && imageFile.name.trim().length > 0) {
      setImgUrl(false);
      const imageUrl = await uploadImageToCloud(imageFile);
      let input = {
        type: "profileImage",
        value: imageUrl,
      };
      actionData.handleCompleteAction(e, input);
    }
  };

  return (
    <>
      <div className="upload-picture-action flex flex-col gap-3">
        <p className="reward-title action-heading">
          {actionData?.action_title}
        </p>
        <div className="upload-picture-wrapper flex flex-col gap-1">
          <label className="label" htmlFor="picture">
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
                src={
                  actionData.action_order_status === "COMPLETED"
                    ? InputCheckSvg
                    : ProfileoutlineIconSvg
                }
                alt="profile"
              />
              <p className="text hidden md:block">
                {imageFile ? imageFile.name : "Upload a file or Drag & Drop"}
              </p>
              <p className="text block md:hidden">
                {imageFile ? imageFile.name : "Upload a file or Drag & Drop"}
              </p>
              <input
                type="file"
                onChange={(e) => handleImageUpdate(e)}
                hidden
                ref={inputRef}
                accept="image/png,image/jpeg"
                data-size="1"
              />
            </div>
          </div>

          {actionData.action_order_status !== "COMPLETED" && (
            <button
              onClick={handleActionSubmit}
              className={`action-btn contained-effect flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
                !imgUrl ? "disabled" : "bg-gredient-2"
              }`}
              disabled={!imgUrl}
            >
              Submit <HiArrowRight className="text-xl " />
            </button>
          )}

          {actionData.action_order_status === "COMPLETED" && (
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
      <ErrorModal
        heading={ModalHeadning}
        open={isOpenErrorModal}
        handleClose={handleErrorModal}
      />
    </>
  );
};

export default UploadPicture;
