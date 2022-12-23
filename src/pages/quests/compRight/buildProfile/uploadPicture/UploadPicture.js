import React, { useEffect, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
  InputCheckSvg,
  ProfileoutlineIconSvg,
} from "../../../../../assets/svg";
import AlertModal from "../../../../../components/alertModal/AlertModal";
import { useUploadProfileImage } from "../../../../../hooks/useUploadProfileImage";
import ErrorModal from "../../errorModal/ErrorModal";

const UploadPicture = ({ actionData }) => {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeadning, setModalHeadning] = useState("");

  const handleErrorModal = () => {
    SetIsOpenErrorModal(false);
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
    let image = e.target.files[0];
    console.log(e.target.files[0]);
    if (
      (image.type === "image/png" || image.type === "image/jpeg") &&
      image.size <= 100000
    ) {
      console.log(image);
      setImageFile(image);
    } else {
      setModalHeadning("File type/size not allowed");
      SetIsOpenErrorModal(true);
    }
  };

  const handleActionSubmit = (e) => {
    let input = {
      type: "profileImage",
      value: imgUrl,
    };
    actionData.handleCompleteAction(e, input);
  };

  const uploadImge = async () => {
    const imageUrl = await uploadImageToCloud(imageFile);
    setImgUrl(imageUrl);
    console.log(imageUrl);
  };

  useEffect(() => {
    if (imageFile && imageFile.name.trim().length > 0) {
      uploadImge();
    }
  }, [imageFile]);

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
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
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
