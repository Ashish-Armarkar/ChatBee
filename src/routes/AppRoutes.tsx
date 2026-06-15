import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const UserDetails = lazy(() => import("../pages/UserDetails"));
const AppRoutes = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/complete-profile" element={<UserDetails />}></Route>
          <Route path="/dashboard" element={<div>Dashboard Page</div>}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
