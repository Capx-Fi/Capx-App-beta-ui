import { useFormik } from "formik";
import {
  ChipCapxSvg,
  CreateunameSticker,
  CreateunameStickermMob,
  GetStatedSvg,
} from "../../assets/svg";
import Input from "../../components/Input/Input";
import * as Yup from "yup";
import Stepper from "../../components/stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { setUserName } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { config } from "../../config";
import TopLoader from "../../components/topLoader/TopLoader";

const CreateUsername = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const { error, isPending, getData, data } = useApi(config.API_URL, "GET");
  const [showModal, setShowModal] = useState(true);

  const showModalFunc = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setShowModal(true);
    setUsernameExists(false);
    setUsername(values.username);
    const apiDataObject = { username: values.username.split("@")[1] };
    getData(apiDataObject, "/checkIfUsernameAvailable");
    resetForm();
  };

  const formik = useFormik({
    initialValues: { username: "@" },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Password is required")
        .min(6, "6 letters required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (data) {
      if (data.result.success) {
        dispatch(setUserName({ username }));
        navigate("/invite-code", {
          state: { username, referer: "/create-username" },
        });
      } else {
        setUsernameExists(true);
      }
    }
  }, [data]);

  return (
    <>
      <main className="create-username-page min-h-screen">
        <div className="flex min-h-screen">
          <div className="left-content-box-wrapper  p-6 flex-col  flex md:justify-center justify-start items-stretch md:items-center min-h-screen relative">
            <div className="left-content-box flex flex-col items-center justify-center md:mt-0 mt-20">
              <Stepper step1={"checked"} step2={"active"} step3={"disable"} />
              <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-6 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-3">
                Choose a username
              </h2>

              <form
                className="w-full flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-full md:mb-4 mb-8">
                  <Input
                    placeholder="Choose a unique and cool username"
                    label="USERNAME"
                    type="text"
                    error={!!formik.errors.username}
                    value={formik.values.username}
                    name="username"
                    onChange={formik.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 md:mb-4 mb-8 ${
                    formik.errors.username
                      ? "disabled"
                      : "bg-gredient-2 contained-effect"
                  }`}
                  disabled={!!formik.errors.username}
                >
                  Continue
                </button>
              </form>

              <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
              {!!formik.values.username && !formik.errors.username && (
                <img
                  src={CreateunameStickermMob}
                  alt="sticker"
                  className="block md:hidden absolute bottom-0 mb-12"
                />
              )}
            </div>
          </div>
          <div className="flex-1 md:min-h-screen py-8 hidden md:block">
            <div className="h-full w-full flex items-end justify-end relative">
              <img
                className="width-90p"
                src={
                  !!formik.values.username && !formik.errors.username
                    ? CreateunameSticker
                    : GetStatedSvg
                }
                alt="dummy"
              />
            </div>
          </div>
        </div>
        {isPending && <TopLoader />}
        {showModal && !isPending && usernameExists && (
          <Modal
            actions={{
              error: "Username already taken",
              showModalFunc: showModalFunc,
            }}
          />
        )}
      </main>
    </>
  );
};

export default CreateUsername;
