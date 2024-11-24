/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";

function ProtectedRoutes({ children }) {
  return <>{!children ? <Outlet /> : children}</>;
}

export default ProtectedRoutes;
