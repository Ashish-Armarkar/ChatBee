import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import InputField from "./Form/Component/InputField";
import { loginUser } from "../firebase/auth";
import { showToast } from "./Toast";
import { useNavigate } from "react-router-dom";
import Buttons from "./Form/Component/Buttons";

const LoginForm = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),

    onSuccess: (data) => {
      console.log("Login response:", data); // Debugging log
      if (!data?.status) {
        showToast(data?.message || "Please verify your email.", "error");
        navigate("/signup");
        return;
      }
      showToast(data.message || "Login successful!", "success");
      if (data?.userData?.isProfileCompleted) {
        navigate("/dashboard");

        return;
      }
      navigate("/complete-profile");
      return;
    },

    onError: (error: any) => {
      showToast(error?.message || "Login failed. Please try again.", "error");
      navigate("/signup");
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-100 d-flex flex-column"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          rules={{ required: "Email is required" }}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          rules={{ required: "Password is required" }}
        />
        <Buttons
          type={"submit"}
          label={loginMutation.isPending ? "Logging in..." : "Login"}
        />

        {loginMutation.isError && (
          <p className="text-danger" style={{ fontSize: "13px" }}>
            {loginMutation?.error?.message}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
