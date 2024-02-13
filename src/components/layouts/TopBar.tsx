import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type TProp = {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const TopBar = ({ hidden, setHidden }: TProp) => {
  return (
    <div className="bg-white fixed top-0 z-30 flex w-full items-center gap-3 px-6 py-2 max-sm:px-3 shadow">
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
        <h1 className="font-bold text-xl">Admin Panel</h1>
      </Link>
    </div>
  );
};

export default TopBar;
