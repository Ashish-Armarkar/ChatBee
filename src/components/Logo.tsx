import React from "react";

const Logo = ({
  width = "100",
  height = "100",
}: {
  width: string;
  height: string;
}) => {
  return (
    <img
      src="https://res.cloudinary.com/djw5fw1xp/image/upload/v1781328296/ChatBeeLogo_qm5wo0.png"
      alt=""
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Logo;
