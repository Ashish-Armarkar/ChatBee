import React from "react";
import AuthRoutes from "./routes/AuthRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppToast } from "./components/Toast";

const App = () => {
  return (
    <>
      <AppToast />
      <AuthRoutes />
    </>
  );
};

export default App;
