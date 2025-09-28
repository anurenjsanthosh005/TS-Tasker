import { Navigate } from "react-router-dom";
import { type PropsWithChildren } from "react";
import { useAuth } from "../context/contextHooks";

const ProtectedRoute = ({ children }:PropsWithChildren) => {
  const { login } = useAuth()

  if (!login) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
