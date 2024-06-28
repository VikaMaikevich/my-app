import React from "react";
import { Navigate } from "react-router-dom";

const NotAuthUser = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default NotAuthUser;