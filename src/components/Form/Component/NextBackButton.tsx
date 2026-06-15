import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import Spinner from "../../Loaders/Spinner";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  direction: "back" | "next";
  size: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleOnClick?: any;
  styleType?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
}

const NextBackButton = ({
  type = "button",
  direction,
  styleType = "primary",
  size = 40,
  isLoading = false,
  isDisabled,
  handleOnClick,
}: ButtonProps) => {
  const colorCode = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
  };

  const directionIcon = {
    next: <ArrowRight />,
    back: <ArrowLeft />,
  };

  return (
    <button
      type={type}
      className={`btn ${colorCode[styleType]} d-flex justify-content-center align-items-center`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
      }}
      disabled={isDisabled || isLoading}
      onClick={type !== "submit" ? () => handleOnClick?.() : undefined}
    >
      {isLoading ? <Spinner /> : directionIcon[direction]}
    </button>
  );
};

export default NextBackButton;
