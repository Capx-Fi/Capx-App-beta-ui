import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { BrandSvgLogo, CoinSvg } from "../../../assets/svg";
import { ImCross } from "react-icons/im";
import { BiMenuAltRight } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <>
      <Popover className="relative bg-slate-100">
        <div className="mx-auto px-8">
          <div className="flex items-center justify-between  border-gray-100 py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="#">
                <span className="sr-only">Your Company</span>
                <img className="w-auto " src={BrandSvgLogo} alt="Capx" />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900">
                <span className="sr-only">Open menu</span>
                <BiMenuAltRight />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Link
                href="#"
                className="fs-14 text-base font-medium text-gray-500 hover:text-green-500"
              >
                Quests
              </Link>
              <Link
                href="#"
                className="fs-14 text-base font-medium text-gray-500 hover:text-green-500"
              >
                Community
              </Link>
            </Popover.Group>
            <div className="hidden items-stretch justify-end md:flex md:flex-1 lg:w-0">
              <button class="bg-white flex fs-15 mr-2 hover:bg-gray-100 text-gray-800 font-semibold p-3 border border-gray-400 rounded-lg shadow">
                <img src={CoinSvg} alt="coin" />
                <span>5 xCapx</span>
              </button>
              <button class="bg-white mr-2 hover:bg-gray-100 text-gray-800 px-4 font-semibold p-3 border border-gray-400 rounded-lg shadow">
                <CgProfile />
              </button>
              <button class="bg-white hover:bg-gray-100 text-gray-800 px-4 font-semibold p-3 border border-gray-400 rounded-lg shadow">
                <BsBell />
              </button>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="w-auto" src={BrandSvgLogo} alt="Capx" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900">
                      <span className="sr-only">Close menu</span>
                      <ImCross />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8"></nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                  <Link
                    href="#"
                    className="fs-14 text-base font-medium text-gray-900 hover:text-green-700"
                  >
                    Quests
                  </Link>
                  <Link
                    href="#"
                    className="fs-14 text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Community
                  </Link>
                </div>
                <div>
                  <Link
                    href="#"
                    className="contained-btn flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm"
                  >
                    Sign up
                  </Link>
                  <p className="fs-14 mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link
                      href="#"
                      className="fs-14 text-gray-600 hover:text-gray-900"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
