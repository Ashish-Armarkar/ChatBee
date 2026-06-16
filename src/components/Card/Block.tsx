import React from "react";
import { Card } from "antd";

interface CardItem {
  id?: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

interface BlockProps {
  cardContent: CardItem[];
  cardWidth?: number;
  handleOnClick?: (item: CardItem) => void;
}

const Block: React.FC<BlockProps> = ({
  cardContent,
  cardWidth = 100,
  handleOnClick,
}) => {
  return (
    <Card
      style={{
        width: `${cardWidth}%`,
        background: "#ffffff24",
        border: "1px solid #d5d5d5",
        margin: "16px 0",
      }}
    >
      {cardContent.map((item, index) => (
        <React.Fragment key={item.id ?? index}>
          <div
            className={`d-flex align-items-center justify-content-between py-2 ${
              handleOnClick ? "cursor_pointer" : ""
            }`}
            onClick={() => handleOnClick?.(item)}
          >
            {item.prefix && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: "40px" }}
              >
                {item.prefix}
              </div>
            )}

            <div className="d-flex flex-column flex-grow-1 px-2">
              <div className="fw-bold">{item.title}</div>

              {item.description && (
                <div
                  style={{
                    color: "#6c757d",
                    fontSize: "13px",
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>

            {item.suffix && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: "40px" }}
              >
                {item.suffix}
              </div>
            )}
          </div>

          {index !== cardContent.length - 1 && (
            <div
              className="w-75 m-auto"
              style={{
                borderTop: "1px solid #dedede",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default Block;
