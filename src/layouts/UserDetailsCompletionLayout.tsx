import React from "react";
import userDetailsCompletionStyle from "./UserDetailsCompletionLayout.module.css";
import Logo from "../components/Logo";
import UserdetailsCompletion from "../pages/UserdetailsCompletion";
const UserDetailsCompletionLayout = () => {
  return (
    <>
      <div className={userDetailsCompletionStyle.container}>
        <div className={userDetailsCompletionStyle.header}>
          <Logo width="100" height="100" />
        </div>
        <div className={userDetailsCompletionStyle.mainContainer}>
          <UserdetailsCompletion />
        </div>
      </div>
    </>
  );
};

export default UserDetailsCompletionLayout;
