/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Spinner from "../shared/Spinner";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setUser } from "@/redux/features/auth/auth.slice";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: ("user" | "manager")[];
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.vite_backend_url}/api/users/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && role.includes(data?.data?.role)) {
          dispatch(setUser(data.data));
          setLoading(false);
        } else {
          dispatch(logout());
          navigate("/login", { replace: true });
        }
      })
      .catch(() => {
        setLoading(false);
        navigate("/login", { replace: true });
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
