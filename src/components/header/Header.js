import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { ActiveProfiletIcon, CoinSvg } from "../../assets/svg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ userAction }) => {
  const location = useLocation();
  const userData = useSelector((state) => state.user);
  const pathname = location.pathname.replace("/", "").replace("-", " ");

  const handleLogout = (e) => {
    userAction.handleLogout(e);
  };

  return (
    <header className="header flex items-center border-primary-200 fixed top-0 w-full md:px-7 px-4">
      <h3 className="page-name capitalize">{pathname ? pathname : "Home"}</h3>
      <div className="flex-grow" />
      <div className="btn">
        <img src={CoinSvg} alt="coin" />
        <span className="ml-2">{userData.earned_rewards} xCapx</span>
      </div>

      <button className="btn logout-btn md:hidden" onClick={handleLogout}>
        <MdOutlineLogout className="fs-22" />
      </button>

      <Menu as="div" className="relative hidden md:inline-block text-left">
        <div>
          <Menu.Button className="">
            <button className="btn">
              <img src={ActiveProfiletIcon} alt="Logout" />
              <BiMenu className="fs-22 ml-2" />
            </button>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="menu-popup absolute right-0 z-10 mt-2 w-60 origin-top-right ">
            <div className="py-1 flex flex-col gap-2">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/profile"
                    className={classNames(
                      active ? "active" : "",
                      "menu-tab block px-4 py-2"
                    )}
                  >
                    <span> My Profile</span>
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    href="#"
                    onClick={handleLogout}
                    className={classNames(
                      active ? "active" : "",
                      "menu-tab block px-4 py-2 text-sm flex items-center"
                    )}
                  >
                    <span>Logout</span>
                    <MdOutlineLogout className="fs-22 ml-2" />
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
};

export default Header;
