import React from "react";
import ProfileImage from "../../../Profile/ProfileImage";
import { EllipsisVertical } from "lucide-react";
import { formatMessageDateTime } from "../../../../utilities/DateTimeConvertor";

const UserChatWith = ({ secondPersonData, setIsDrawerOpen }) => {
  console.log({ secondPersonData });

  return (
    <div className="w-100 h-100">
      <div
        className="w-100 d-flex align-items-center px-3 justify-content-between"
        style={{
          height: "80px",
          background: "#f3e7d6",
        }}
      >
        <div className="d-flex gap-3 align-items-center">
          <div
            className=""
            onClick={() =>
              setIsDrawerOpen({ isOpen: true, user: secondPersonData?.user })
            }
            style={{
              cursor: "pointer",
            }}
          >
            <ProfileImage
              profile={secondPersonData?.user?.profileImage[0]}
              size={60}
              status={{
                isStatus: secondPersonData?.user?.isOnline,
                statusSize: 20,
                top: 0,
                left: 70,
              }}
            />
          </div>
          <div
            className=" d-flex flex-column "
            style={{
              color: "#3E2F24",
            }}
          >
            <div className="fw-semibold fs_18">{"Mr. MC"}</div>
            <div className="text_muted fs_12">
              {secondPersonData?.user?.isOnline
                ? "Online"
                : formatMessageDateTime(
                    secondPersonData?.lastMessage?.timestamp,
                  )}
            </div>
          </div>
        </div>
        <div className="">
          <EllipsisVertical />
        </div>
      </div>
    </div>
  );
};

export default UserChatWith;
