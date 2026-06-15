import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Spinner = ({ color = "#fff", size = 24 }) => (
  <Flex align="center" gap="medium">
    <Spin
      indicator={
        <LoadingOutlined spin style={{ color: color, fontSize: size }} />
      }
    />
  </Flex>
);

export default Spinner;
