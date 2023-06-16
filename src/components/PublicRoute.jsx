import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLogined = !!window.localStorage.getItem('token')
  return isLogined ? <Navigate to="/todo" /> : children;
};

export default PublicRoute;
