import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ childComponent }) => {
  let { isLoggedIn } = useSelector((store) => store.userLogin);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return childComponent;
};

export default PrivateRoutes;