import React, { useEffect, useState } from "react";
import AuthRoutes from "./routes/AuthRoutes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppToast } from "./components/Toast";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./components/Store/Store";
import { BrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<any | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user);
    });
    return () => unsub();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Provider store={store}>
        <AppToast />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <AppToast />
      <BrowserRouter>
        {!!isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
