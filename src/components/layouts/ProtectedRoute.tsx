import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.vite_backend_url}/api/users/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
        } else {
          navigate("/login", { replace: true });
        }
      })
      .catch(() => {
        setLoading(false);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  if (isLoading) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
