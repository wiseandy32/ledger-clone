/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuth } from "../context/auth/use-auth";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { uid } = useAuth();
  const { pathname: from } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      navigate("/login", { state: { from } });
    }
  }, [uid, navigate, from]);

  return <>{!children ? <Outlet /> : children}</>;
}

export default ProtectedRoutes;
