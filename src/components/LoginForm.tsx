import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import InputField from "./Form/Component/InputField";
import Buttons from "./Form/Component/Buttons";
import { showToast } from "./Toast";
import { loginUser } from "../firebase/auth";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const methods = useForm<LoginFormData>();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data.email, data.password),

    onSuccess: (data: any) => {
      if (!data?.status) {
        showToast(data?.message || "Please verify your email.", "error");
        return;
      }
      console.log("Data", data);
      localStorage.setItem("session", JSON.stringify(data));
      showToast(data.message || "Login successful!", "success");

      navigate(
        data.userData?.isProfileCompleted ? "/dashboard" : "/complete-profile",
        { replace: true },
      );
    },

    onError: (error: any) => {
      showToast(error?.message || "Login failed. Please try again.", "error");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (loginMutation.isLoading) return;

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
          rules={{
            required: "Email is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          rules={{
            required: "Password is required",
          }}
        />

        <Buttons
          type="submit"
          label={loginMutation.isLoading ? "Logging in..." : "Login"}
          isLoading={loginMutation.isLoading}
          isDisabled={loginMutation.isLoading}
        />

        {loginMutation.isError && (
          <p className="text-danger fs_13 mt_8" role="alert">
            {(loginMutation.error as Error)?.message || "Something went wrong."}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
