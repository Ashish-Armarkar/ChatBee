import React from "react";
import ProfileImage from "./Profile/ProfileImage";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/Store";

const UserInfo = ({ userData }) => {
  return (
    <div className="">
      <div className="">
        <ProfileImage profile={userData?.profileImage[0]} size={128} />
      </div>
      <div className="d-flex flex-column mt-1 text-center">
        <div className="position-relative ">
          <div
            className="position-absolute"
            style={{
              left: "73%",
            }}
          >
            <Pencil size={12} />
          </div>
          <div className="fw-bold fs-6">{userData?.userName}</div>
        </div>
        <div className="text-muted">{userData?.email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
