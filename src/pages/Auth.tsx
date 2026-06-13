import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

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
            <img
              src="https://res.cloudinary.com/djw5fw1xp/image/upload/v1781328296/ChatBeeLogo_qm5wo0.png"
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div
            className=" text-secondary"
            style={{ fontWeight: "600", fontSize: "16px" }}
          >
            {isLogin ? "Login to ChatBee" : "Sign Up for ChatBee"}
          </div>

          {isLogin ? <LoginForm /> : <SignForm />}
          <p className="mt-2" style={{ fontSize: "11px", alignSelf: "end" }}>
            Don't have an account?{" "}
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
