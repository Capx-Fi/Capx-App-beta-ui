import ReactDOM from "react-dom";
import Lottie from "react-lottie";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import failureData from "../../assets/lottie/failedCross.json";
import { HiArrowRight } from "react-icons/hi";
import { LoaderGit } from "../../assets/gif";

const Modal = ({ actions }) => {
  
  const cancelButtonRef = useRef(null);
  const defaultOptionsFailure = {
    loop: true,
    autoplay: true,
    animationData: failureData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleClose = ()=>{

  }
  return ReactDOM.createPortal(
    
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="error-dialog fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="dialog-box  flex flex-col gap-3 relative transform overflow-hidden rounded-lg  shadow-xl transition-all  sm:w-full sm:max-w-lg">

                {!(actions && actions.error) ? (<div className="">
                  <img src={LoaderGit} alt="Panda" />
                </div>):
                <>
                <div className="flex flex-col px-10 py-5 gap-5 h-fit">
             <Lottie options={defaultOptionsFailure} height={240} width={240} />

             <div className="codestep2-congrats-1 flex flex-col items-center">
               <p className="codestep2-congratstitle fs-30 font-bold">Uh oh!</p>
               <p className="fs-18 font-medium">
                 {actions.error && actions.error}
                 <br /> Try again!{" "}
               </p>
             </div>
           <button
              onClick={(e) => actions.showModalFunc()}
              className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 mb-5 rounded-2xl text-white font-semibold fs-16 w-full"
            >
              Try Again
              <HiArrowRight className="text-xl ml-4" />
            </button>
          </div>
                </>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>,
    document.body
  );
};

export default Modal;
