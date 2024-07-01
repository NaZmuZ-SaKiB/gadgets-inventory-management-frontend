/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Spinner from "../shared/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/auth.slice";
import { TUserRole } from "@/types/user.interface";
import { toast } from "sonner";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: TUserRole[];
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.vite_backend_url}/api/users/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && role.includes(data?.data?.role)) {
          dispatch(setUser(data.data));
        } else {
          if (data?.success && user) {
            console.log(data);
            toast.error("You are not allowed to visit this page!");
            navigate("/", { replace: true });
          } else {
            toast.error("Login to visit this page!");
            navigate("/login", { replace: true });
          }
        }
      })
      .catch(() => {
        setLoading(false);
        navigate("/login", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className=" flex justify-center items-center h-[100svh]">
        <div className="size-16">
          <Spinner className="border-y-black" />
        </div>
      </div>
    );
  return <>{children}</>;
};

export default ProtectedRoute;
