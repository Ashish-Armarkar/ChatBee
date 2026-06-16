import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const LoginForm = lazy(() => import("../components/LoginForm"));
const SignForm = lazy(() => import("../components/SignForm"));

const Auth = ({ isLogin }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    isLogin ? navigate("/signup") : navigate("/login");
  };
  return (
    <AuthLayout>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div
          className="w-75 d-flex flex-column justify-content-center align-items-center border rounded p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.74)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="mb-2">
            <Logo width="100" height="100" />
          </div>
          <div
            className=" text-secondary"
            style={{ fontWeight: "600", fontSize: "16px" }}
          >
            {isLogin ? "Login to ChatBee" : "Sign Up for ChatBee"}
          </div>

          {isLogin ? <LoginForm /> : <SignForm />}
          <p className="mt-2" style={{ fontSize: "11px", alignSelf: "end" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleNavigate}
            >
              {isLogin ? "Signup here" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Auth;
