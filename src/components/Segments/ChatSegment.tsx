import React, { useState } from "react";
import { Badge, Tag } from "antd";

const ChatSegment = ({ options, handleOnChange }) => {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div
        className="d-flex gap-2 p-2"
        style={{
          width: "100%",
          height: "40px",
          overflowX: "auto",
        }}
      >
        {options?.map((ele, index) => (
          <Tag
            key={index}
            style={{
              background: selected == index ? "#B7791F" : "#FECE92",
              color: selected == index ? "#ffffff" : "#B7791F",
              fontSize: "14px",
              height: "1.7em",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelected(index);
              handleOnChange(ele.label);
            }}
          >
            <div className="d-flex gap-2">
              {ele.label}
              <div className="">
                <Badge
                  size={"small"}
                  style={{
                    background: selected == index ? "#FECE92" : "#B7791F",
                    fontSize: ".8em",
                    color: selected == index ? "#B7791F" : "#ffffff",
                    width: "2.2rem",
                  }}
                  count={ele.pending}
                />
              </div>
            </div>
          </Tag>
        ))}
      </div>
    </>
  );
};

export default ChatSegment;
