import React, { useState } from "react";
import { Button, Drawer } from "antd";

const DrawerComp = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      <Drawer
        title={title}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={isOpen}
        style={{ background: "#f3e7d6" }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComp;
