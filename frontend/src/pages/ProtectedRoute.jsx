import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthState } from "../features/authSlice";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector(selectAuthState);

  if (!userInfo) {
    return <Navigate to="/landing" />;
  }

  return children;
};

export default ProtectedRoute;
