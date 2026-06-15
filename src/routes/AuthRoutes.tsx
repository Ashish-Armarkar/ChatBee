import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const Auth = lazy(() => import("../pages/Auth"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Routes>
        <Route path="/" element={<Auth isLogin={true} />}></Route>
        <Route path="/login" element={<Auth isLogin={true} />}></Route>
        <Route path="/signup" element={<Auth isLogin={false} />}></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
