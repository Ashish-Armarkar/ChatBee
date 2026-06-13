import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Auth = lazy(() => import("../pages/Auth"));

const AuthRoutes = () => {
  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth isLogin={true} />}></Route>
            <Route path="/login" element={<Auth isLogin={true} />}></Route>
            <Route path="/signup" element={<Auth isLogin={false} />}></Route>
            <Route
              path="/complete-profile"
              element={<div>Complete Profile Page</div>}
            ></Route>
            <Route
              path="/dashboard"
              element={<div>Dashboard Page</div>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default AuthRoutes;
