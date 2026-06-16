import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "./Form/Component/InputField";
import { registerUser } from "../firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "./Toast";
import Buttons from "./Form/Component/Buttons";

type SignFormData = {
  email: string;
  password: string;
};

const SignForm = () => {
  const methods = useForm<SignFormData>();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const signupMutation = useMutation<
    { status: boolean; message: string },
    Error,
    SignFormData
  >({
    mutationFn: ({ email, password }) => registerUser(email, password),

    onSuccess: (data) => {
      if (!data?.status) {
        showToast(data?.message || "Signup failed. Please try again.", "error");
        return;
      }

      showToast(data.message || "Signup successful!", "success");
      navigate("/login", { replace: true });
    },

    onError: (error: any) => {
      showToast(error?.message || "Signup failed. Please try again.", "error");
    },
  });

  const handleSignup = (data: any) => {
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
          label={signupMutation.isLoading ? "Signing up..." : "Signup"}
          isDisabled={signupMutation.isLoading}
          isLoading={signupMutation.isLoading}
        />
      </form>
    </FormProvider>
  );
};

export default SignForm;
