import React from "react";
import ProfileImage from "./Profile/ProfileImage";
import { Pencil } from "lucide-react";

const UserInfo = () => {
  return (
    <div className="">
      <div className="">
        <ProfileImage
          profile="https://res.cloudinary.com/djw5fw1xp/image/upload/v1775902424/main-sample.png"
          size={128}
        />
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
          <div className="fw-bold fs-6">Ashish Armarkar</div>
        </div>
        <div className="text-muted">+91 7709931178</div>
      </div>
    </div>
  );
};

export default UserInfo;
