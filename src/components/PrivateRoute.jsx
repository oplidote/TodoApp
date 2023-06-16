import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogined = !!window.localStorage.getItem('token');
  return isLogined ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
