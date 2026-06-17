import React from "react";

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
  console.log({ cardContent });

  return (
    <div
      style={{
        width: `${cardWidth}%`,
        background: "#ffffff24",
        border: "1px solid #d5d5d5",
        borderRadius: "4px",
        backdropFilter: "blur(10px)",
        overflow: "hidden",
        margin: "12px 0",
      }}
    >
      {cardContent?.map((item, index) => (
        <React.Fragment key={item.id ?? index}>
          <div
            className={`d-flex align-items-center justify-content-between p_12 ${
              handleOnClick ? "cursor_pointer" : ""
            }`}
            onClick={() => handleOnClick?.(item)}
            style={{
              transition: "all 0.2s ease",
            }}
          >
            {item.prefix && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  minWidth: "40px",
                }}
              >
                {item.prefix}
              </div>
            )}

            <div className="d-flex flex-column flex-grow-1 px-2">
              <div
                className="fw_600 fs_14"
                style={{
                  color: item.textColor ? item.textColor : "#3E2F24",
                }}
              >
                {item.title}
              </div>

              {item.description && (
                <div
                  className="fs_12"
                  style={{
                    color: "#6D5D4F",
                    marginTop: "2px",
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>

            {item.suffix && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  minWidth: "40px",
                }}
              >
                {item.suffix}
              </div>
            )}
          </div>

          {index !== cardContent.length - 1 && (
            <div
              style={{
                width: "85%",
                margin: "0 auto",
                borderTop: "1px solid #e5e5e5",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Block;
