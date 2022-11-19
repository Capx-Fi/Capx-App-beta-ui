import { useFormik } from "formik";

import Input from "../../components/Input/Input";
import * as Yup from "yup";
import Stepper from "../../components/stepper/Stepper";
import { signupWithEmail } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  CongratulationSvg,
  CreateunameStickermMob,
  OnboardSvg,
} from "../../assets/svg";

const Congratulaions = () => {
  const navigate = useNavigate();
  const handleFormSubmit = (values, { resetForm }) => {
    resetForm();
    navigate("/invite-code");
  };

  const formik = useFormik({
    initialValues: { username: "" },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Password is required")
        .min(6, "6 letters required"),
    }),
    onSubmit: handleFormSubmit,
  });
  console.log(formik.values);

  return (
    <>
      <main className="congratulation-page min-h-screen">
        <div className="flex min-h-screen">
          <div className="left-content-box-wrapper  p-6 flex-col  flex justify-center items-stretch md:items-center bg-white-transparent min-h-screen relative">
            <div className="left-content-box flex flex-col items-center justify-center">
              <Stepper
                step1={"checked"}
                step2={"checked"}
                step3={"checked"}
                className="hidden md:block"
              />
              <div>
                <img src={CongratulationSvg} alt="Congratulation" />
              </div>
              <p className="underline text-primary-800 font-black fs-30">
                All set!
              </p>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-10">
                Let’s learn, build <br />& grow together
              </h2>

              <button
                type="submit"
                className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 mb-4 bg-gredient-2`}
              >
                Start
              </button>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
              {!!formik.values.username && !formik.errors.username && (
                <img
                  src={CreateunameStickermMob}
                  alt="sticker"
                  className="block md:hidden absolute bottom-0 mb-3"
                />
              )}
            </div>
          </div>
          <div className="flex-1 md:min-h-screen py-8 hidden md:block">
            <div className="h-full w-full flex items-end justify-center px-6">
              <img className="width-90p" src={OnboardSvg} alt="dummy" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Congratulaions;
