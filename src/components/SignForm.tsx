import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "./Form/Component/InputField";
import { registerUser } from "../firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "./Toast";
import Buttons from "./Form/Component/Buttons";

const SignForm = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const signupMutation = useMutation({
    mutationFn: (userData) => registerUser(userData.email, userData.password),

    onSuccess: (data) => {
      if (!data?.status) {
        showToast(data?.message || "Signup failed. Please try again.", "error");
        return;
      }

      showToast(data.message || "Signup successful!", "success");
    },

    onError: (error: any) => {
      showToast(error?.message || "Signup failed. Please try again.", "error");
    },
  });

  const handleSignup = (data) => {
    signupMutation.mutate(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="w-100 d-flex flex-column"
        onSubmit={handleSubmit((data) => handleSignup(data))}
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
          rules={{
            required: "Password is required",
          }}
        />
        <Buttons
          type={"submit"}
          label={signupMutation.isPending ? "Signing up..." : "Signup"}
        />
      </form>
    </FormProvider>
  );
};

export default SignForm;
