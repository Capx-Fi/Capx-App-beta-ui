import Stepper from "../../components/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { CongratulationSvg, OnboardSvg } from "../../assets/svg";
import { useDispatch } from "react-redux";
import { setUserProfileComplete } from "../../store/slices/authSlice";

//

const Congratulaions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(setUserProfileComplete());
  }
  
  

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
                Congratulaions!
              </p>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-10">
                Welcome to the<br />Capx experience
              </h2>

              <button
                type="submit"
                className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 mb-4 bg-gredient-2`}
                onClick={() => {
                  handleClick();
                }}
              >
                LFG
              </button>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
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
