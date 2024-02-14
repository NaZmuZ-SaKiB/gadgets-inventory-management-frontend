import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "@/redux/hooks";

type TProp = {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const TopBar = ({ hidden, setHidden }: TProp) => {
  const username = useAppSelector((state) => state.auth.user?.name);

  return (
    <div className="bg-white fixed top-0 z-30 flex w-full justify-between items-center gap-3 px-6 py-2 max-sm:px-3 shadow">
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
          <h1 className="font-bold text-xl">Admin Panel</h1>
        </Link>
      </div>
      {username && <div>Hi, {username}</div>}
    </div>
  );
};

export default TopBar;
