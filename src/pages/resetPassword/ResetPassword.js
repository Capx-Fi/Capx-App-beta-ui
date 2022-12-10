import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OnboardMobBg } from "../../assets/images";
import { ChipCapxSvg, OnboardSvg } from "../../assets/svg";
import Input from "../../components/Input/Input";
import * as Yup from "yup";
import { useFirebaseResetPassword } from "../../hooks/useFirebaseResetPassword";
import Modal from "../../components/Modal/Modal";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const ResetPassword = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { error, isPending, resetPassword } = useFirebaseResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const showModalFunc = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    if (!query.get("oobCode")) {
      navigate("/forgot-password");
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true));
  };

  const handleFormSubmit = (values, { resetForm }) => {
    try {
      resetPassword(query.get("oobCode"), values.password);

      if (error) {
        setShowModal(true);
      } else {
        navigate("/signin/email");
      }
    } catch (err) {
      console.log(err);
    }
    resetForm();
  };

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <main className="emaillogin-page min-h-screen">
        <div className="flex min-h-screen">
          <div className="left-content-box-wrapper  p-6 flex-col  flex md:justify-center justify-start md:mt-0 mt-14 items-stretch md:items-center bg-white-transparent min-h-screen relative">
            <div className="left-content-box flex flex-col items-center justify-center">
              <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-6 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-3">
                Reset Password
              </h2>

              <form
                className="w-full flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-full mb-4">
                  <Input
                    placeholder="Create a storng password"
                    label="enter new password"
                    type="password"
                    error={!!formik.errors.password}
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-full  mb-4">
                  <Input
                    placeholder="Re-enter new password"
                    label="re-enter new password"
                    type={showPassword ? "text" : "password"}
                    error={!!formik.errors.confirmPassword}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="self-stretch flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox accent-pink-500 rounded-xl"
                      id="checkbox"
                      value={showPassword}
                      onChange={handleShowPassword}
                    />
                    <label
                      className="fs-12 text-primary-800 font-bold ml-1 cursor-pointer"
                      htmlFor="checkbox"
                    >
                      Show Password
                    </label>
                  </div>
                  <Link
                    to="/signin/email"
                    className="text-primary-900 fs-12 font-bold underline"
                  >
                    Back to Login
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 mb-4 ${
                    formik.errors.confirmPassword || formik.errors.password
                      ? "disabled"
                      : "bg-gredient-2"
                  }`}
                  disabled={
                    !!formik.errors.confirmPassword || !!formik.errors.password
                  }
                >
                  Reset Password
                </button>
              </form>

              <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <div className="h-full w-full flex items-end justify-center px-6">
              <img className="width-90p" src={OnboardSvg} alt="dummy" />
            </div>
          </div>
        </div>
      </main>
      {isPending && <Modal />}
      {showModal && error && (
        <Modal
          actions={{
            error: error.message,
            showModalFunc: showModalFunc,
          }}
        />
      )}
    </>
  );
};

export default ResetPassword;
