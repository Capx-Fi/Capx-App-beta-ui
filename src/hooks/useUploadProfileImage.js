import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../firebase/firebase";
import { analytics } from "../firebase/firebase";
import { logEvent } from "firebase/analytics";

export const useUploadProfileImage = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const Uid = useSelector((state) => state.auth.user.uid);

  const uploadImageToCloud = async (image) => {
    let imageUrl = null;
    if (image) {
      setError(null);
      setIsPending(true);
      logEvent(analytics, 'IMAGEUPLOAD_ATTEMPT' , {user:Uid})
      try {
        const storageRef = ref(storage, `images/profileImage/${Uid}`);
        const uploadTask = await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        logEvent(analytics, 'IMAGEUPLOAD_SUCCESS' , {user:Uid,url:downloadURL})
        imageUrl = downloadURL;
      } catch (error) {
        console.log(error);
        setError(error);
      }

      setIsPending(false);
    }
    return imageUrl;
  };

  return { uploadImageToCloud, error, isPending };
};
