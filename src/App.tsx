import React from "react";
import AuthRoutes from "./routes/AuthRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppToast } from "./components/Toast";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AppToast />
      <AuthRoutes />
      <AppRoutes />
    </>
  );
};

export default App;
