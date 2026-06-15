import React from "react";
import { Flex, Steps } from "antd";

const VerticalStepper = ({ items, step }) => {
  console.log(step);

  return (
    <Flex>
      <div style={{ flex: 1 }}>
        <Steps
          orientation="vertical"
          current={step - 1}
          items={items}
          size="middle"
        />
      </div>
    </Flex>
  );
};

export default VerticalStepper;
