import React from "react";
import DrawerComp from "./Drawer/DrawerComp";
import UserInfo from "./UserInfo";
import Block from "./Card/Block";

const UserRightDrawer = ({ isDrawerOpen, setIsDrawerOpen, userData }) => {
  return (
    <DrawerComp
      isOpen={isDrawerOpen}
      onClose={setIsDrawerOpen}
      title="User Profile"
    >
      <div className="">
        <UserInfo
          userData={{ ...userData.userInfo, editable: userData.editable }}
        />
      </div>
      <div className="">
        {userData?.activities.map((ele, i) => (
          <Block cardWidth={100} cardContent={ele} />
        ))}
      </div>
    </DrawerComp>
  );
};

export default UserRightDrawer;
