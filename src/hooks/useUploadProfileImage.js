import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { auth, storage } from "../firebase/firebase";
import { useApi } from "./useApi";

export const useUploadProfileImage = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(0);
  const {
    error: ApiError,
    isPending: isAPiPending,
    postData,
  } = useApi(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev/updateUserProfileImg",
    "POST"
  );
  console.log(isAPiPending);
  const uploadImageToCloud = async (image) => {
    if (image) {
      setError(null);
      setIsPending(true);

      const storageRef = ref(storage, `images/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
        },

        (error) => {
          setError(error);
          console.log(error);
          setIsPending(false);
        },

        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const apiDataObject = { data: { image_url: downloadURL } };
            await postData(apiDataObject);
            setIsPending(false);
            if (ApiError) setError(ApiError);
          } catch (error) {
            setError(error);
            console.log(error);
            setIsPending(false);
          }
        }
      );
    }
  };

  return { uploadImageToCloud, error, isPending, uploadProgress, imageUrl };
};
