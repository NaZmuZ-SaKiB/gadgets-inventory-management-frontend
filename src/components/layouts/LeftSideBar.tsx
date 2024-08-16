/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

import {
  sideBarRoutesManager,
  commonSideBarRoutes,
  sideBarRoutesAdmin,
} from "@/constants/sidebar.constant";
import { USER_ROLE } from "@/constants/user.constant";
import { cn } from "@/lib/utils";

type TProps = {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const LeftSideBar = ({ hidden, setHidden }: TProps) => {
  const role = useAppSelector((state) => state.auth.user?.role);

  let sideBarItems;
  if (role === USER_ROLE.USER) {
    sideBarItems = commonSideBarRoutes;
  } else if (role === USER_ROLE.MANAGER) {
    sideBarItems = sideBarRoutesManager;
  } else {
    sideBarItems = sideBarRoutesAdmin;
  }

  return (
    <>
      {!hidden && (
        <div
          onClick={() => setHidden(true)}
          className="absolute md:hidden z-20 left-0 right-0 top-0 bottom-0 bg-black bg-opacity-10"
        />
      )}
      <div className={`left-sidebar ${hidden ? "max-md:-left-full" : ""}`}>
        <div className="flex flex-col">
          {sideBarItems.map((item) => (
            <NavLink
              onClick={() => setHidden(true)}
              to={item.path}
              key={item.label}
              className={({ isActive }) =>
                cn("py-3 px-5 font-semibold text-sky-50 hover:bg-sky-800", {
                  "bg-pink-700 hover:bg-pink-700": isActive,
                })
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
