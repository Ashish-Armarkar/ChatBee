import { Avatar, Space } from "antd";
import profileImageStyle from "./ProfileImage.module.css";
const statusColorCode = {
  true: "#4caf50",
  false: "#b33535",
};
const ProfileImage = ({
  profile = "",
  size = 128,
  status = {
    isStatus: false,
    statusSize: 16,
    top: 10,
    left: 62,
  },
}) => (
  <div className={profileImageStyle.container}>
    {status?.isStatus && (
      <div
        className={profileImageStyle.status}
        style={{
          backgroundColor: statusColorCode[status.isStatus],
          width: `${status.statusSize}px`,
          height: `${status.statusSize}px`,
          top: `${status.top}%`,
          left: `${status.left}%`,
        }}
      ></div>
    )}
    <div className={profileImageStyle.avatar}>
      <Space wrap size={16}>
        <Avatar
          size={size}
          icon={
            <img
              src={profile}
              alt="Profile"
              style={{ width: "100%", height: "100%" }}
            />
          }
        />
      </Space>
    </div>
  </div>
);

export default ProfileImage;
