import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/firebase";
import { store } from "./Store/Store";
import { AppToast } from "./components/Toast";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserDetailsCompletionLayout = lazy(
  () => import("./layouts/UserDetailsCompletionLayout"),
);

const App = () => {
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);

      if (user) {
        localStorage.setItem("session", JSON.stringify(user));
      } else {
        localStorage.removeItem("session");
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Loading...
      </div>
    );
  }

  return (
    <Provider store={store}>
      <AppToast />

      <BrowserRouter>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            {/* Public Routes */}

            <Route
              path="/"
              element={
                authUser ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Auth isLogin />
                )
              }
            />

            <Route
              path="/login"
              element={
                authUser ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Auth isLogin />
                )
              }
            />

            <Route
              path="/signup"
              element={
                authUser ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Auth isLogin={false} />
                )
              }
            />

            {/* Protected Routes */}

            <Route
              path="/dashboard"
              element={
                authUser ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/complete-profile"
              element={
                authUser ? (
                  <UserDetailsCompletionLayout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch All */}

            <Route path="*" element={<Navigate to={"/login"} replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
