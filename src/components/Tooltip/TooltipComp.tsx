import React from "react";
import { Tooltip } from "antd";
import { Info } from "lucide-react";

const TooltipComp = ({ info, size = 12 }) => (
  <Tooltip
    title={info}
    className="d-flex justify-content-center align-items-center"
  >
    <span className="ps-1">
      <Info size={size} />
    </span>
  </Tooltip>
);

export default TooltipComp;
