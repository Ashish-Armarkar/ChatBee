import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserDetailsCompletionLayout = lazy(
  () => import("../layouts/UserDetailsCompletionLayout"),
);

const AppRoutes = () => {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const getSession = async () => {
      try {
        const cookie = await cookieStore.get("session");

        if (cookie?.value) {
          const session = JSON.parse(cookie.value);

          setIsProfileComplete(session?.isProfileCompleted ?? false);
        } else {
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error(error);
        setIsProfileComplete(false);
      }
    };

    getSession();
  }, []);

  if (isProfileComplete === null) {
    return <>Loading...</>;
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route
          path="/complete-profile"
          element={
            !isProfileComplete ? (
              <UserDetailsCompletionLayout />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isProfileComplete ? (
              <Dashboard />
            ) : (
              <Navigate to="/complete-profile" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={isProfileComplete ? "/dashboard" : "/complete-profile"}
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
