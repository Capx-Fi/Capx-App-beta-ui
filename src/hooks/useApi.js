import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Constants } from "../constants/constants";

export const useApi = (url, method = Constants.GET) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [path, setPath] = useState("");

  const postData = (postData, path = "") => {
    setOptions({
      method: Constants.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(postData),
    });
    setPath(path);
  };

  const getData = (getData, path="") =>{
    setOptions({
      method: Constants.GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Headers": "*",
      },
    });
    let urlPath = path + '?' + ( new URLSearchParams( getData ) ).toString();
    setPath(urlPath);
  }

  useEffect(() => {
    setData(null);
    setError(null);
    setIsPending(false);
    const controller = new AbortController();
    const apiCall = async (options) => {
      setIsPending(true);
      try {
        const res = await fetch(url + path.trim(), {
          ...options,
          signal: controller.signal,
        });
        if (!res.ok) {
          console.log(res);
          const errorResponse = await res.json()
          setData(errorResponse)
          throw new Error(res.statusText);
        }
        const response = await res.json();
        console.log(response);
        setIsPending(false);
        setData(response);
      } catch (error) {
        console.log(error.toString());
        if (error?.name === Constants.ABORT_ERROR) {
          console.log("the fetch was aborted");
        }else if(error.toString()==='TypeError: Failed to fetch'){
          console.log('some error');
          setError("unexpected_error");
          setIsPending(false);
        }else {
          setError("Error in api call");
          setIsPending(false);
        }
      }
    };

    if (method === Constants.GET && options) {
      apiCall(options);
    } else if (method === Constants.POST && options) {
      apiCall(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data: data, isPending: isPending, error: error, postData: postData ,getData:getData };
};
