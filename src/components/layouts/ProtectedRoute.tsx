/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Spinner from "../shared/Spinner";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/auth.slice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.vite_backend_url}/api/users/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          dispatch(setUser(data.data));
          setLoading(false);
        } else {
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
      <div className="size-16 flex justify-center items-center">
        <Spinner className="border-y-black" />
      </div>
    );
  return <>{children}</>;
};

export default ProtectedRoute;
