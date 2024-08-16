/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { logout } from "@/redux/features/auth/auth.slice";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileDropDown = () => {
  const username = useAppSelector((state) => state.auth.user?.name);

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
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none no-focus bg-sky-800 text-sky-50 hover:bg-pink-700 px-3 py-1 rounded-md font-semibold">
        Hi, {username?.split(" ")[0]}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sky-900 border-0 text-sky-50">
        <DropdownMenuItem
          className="cursor-pointer hover:!bg-sky-700 hover:!text-sky-50"
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
