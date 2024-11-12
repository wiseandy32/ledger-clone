import { useEffect } from "react";
import { useAuth } from "../context/auth/use-auth";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

function ProtectedRoutes() {
  const { user } = useAuth();
  const { pathname: from } = useLocation();
  const navigate = useNavigate();
  console.log("p: ", from);
  console.log("p: ", from.substring(1));
  useEffect(() => {
    if (!user) {
      console.log("efe: ", auth?.currentUser);
      navigate("/login", { state: { from } });
    }
  }, [user, navigate, from]);

  return <Outlet />;
}

export default ProtectedRoutes;
