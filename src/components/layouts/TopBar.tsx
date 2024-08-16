import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import ProfileDropDown from "../shared/ProfileDropDown";
import GlobalSerchbar from "./GlobalSerchbar";

type TProp = {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const TopBar = ({ hidden, setHidden }: TProp) => {
  return (
    <div className="bg-sky-900 fixed top-0 z-30 flex w-full justify-between items-center gap-3 px-6 py-2 max-sm:px-3 shadow text-white">
      <div className="flex gap-3 items-center">
        {hidden ? (
          <img
            src="/assets/icons/menu-icon.svg"
            alt="menu"
            className="sidebar-toggle-icon"
            onClick={() => setHidden(false)}
          />
        ) : (
          <img
            src="/assets/icons/close.svg"
            alt="close menu"
            className="sidebar-toggle-icon"
            onClick={() => setHidden(true)}
          />
        )}
        <Link to={"/"}>
          <h1 className="font-semibold text-sky-50 text-xl">Admin Panel</h1>
        </Link>
      </div>

      <GlobalSerchbar />

      <ProfileDropDown />
    </div>
  );
};

export default TopBar;
