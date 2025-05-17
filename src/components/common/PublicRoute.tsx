import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { JSX } from "react";

type PublicRouteProps = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // If user is already authenticated, redirect to Home page
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
  
};

export default PublicRoute;
