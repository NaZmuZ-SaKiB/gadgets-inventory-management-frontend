/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { logout } from "@/redux/features/auth/auth.slice";

import {
  sideBarRoutesManager,
  commonSideBarRoutes,
  sideBarRoutesAdmin,
} from "@/constants/sidebar.constant";
import { Button } from "../ui/button";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { USER_ROLE } from "@/constants/user.constant";

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

  const dispatch = useAppDispatch();
  const [logoutFromServer] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.loading("logging out...");
    try {
      await logoutFromServer(undefined);
      dispatch(logout());
      dispatch(clearCart());
      toast.success("logged out");
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error(error?.data?.message || "something went wrong");
    }
  };

  return (
    <>
      {!hidden && (
        <div
          onClick={() => setHidden(true)}
          className="absolute md:hidden z-20 left-0 right-0 top-0 bottom-0 bg-black bg-opacity-10"
        />
      )}
      <div className={`left-sidebar ${hidden ? "max-md:-left-full" : ""}`}>
        <div className="flex flex-col gap-2">
          {sideBarItems.map((item) => (
            <NavLink
              onClick={() => setHidden(true)}
              to={item.path}
              key={item.label}
              className={({ isActive }) =>
                `py-3 px-5 hover:bg-gray-100 hover:text-black rounded-lg ${
                  isActive ? "bg-black text-white" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <Button
          onClick={() => handleLogout()}
          className="hover:bg-black hover:text-white"
          variant="outline"
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default LeftSideBar;
