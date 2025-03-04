import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@context";
import { ROUTES } from "@constants";

interface ProtectedRouteLayoutProps {
  allowedRoles: string[];
  children: React.ReactElement;
};

export const ProtectedRouteLayout: React.FC<ProtectedRouteLayoutProps> = ({ allowedRoles, children }) => {
  const { userData } = useAuth();

  if (!userData) {
    return <Navigate to={`${ROUTES.auth}/${ROUTES.login}`} />;
  }

  if (allowedRoles.includes(userData.role)) {
    return children;
  }
  return <Navigate to={ROUTES.not_available} />
};

export default ProtectedRouteLayout;
