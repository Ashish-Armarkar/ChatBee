import React from "react";
import Carousel from "../components/Carousel";
import authStyle from "./AuthLayout.module.css";

const AuthLayout = ({ children }) => {
  return (
    <div className={authStyle.authContainer}>
      <div className="w-50">
        <Carousel />
      </div>
      <div className={authStyle.right}>{children}</div>
    </div>
  );
};

export default AuthLayout;
