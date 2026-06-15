import { useForm, FormProvider } from "react-hook-form";
import NextBackButton from "./Form/Component/NextBackButton";
import Step1 from "../Forms/UserComplition/Step1";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Store/Store";
import Step2 from "../Forms/UserComplition/Step2";
import Step3 from "../Forms/UserComplition/Step3";
import { useCallback } from "react";
import Step4 from "../Forms/UserComplition/Step4";

const UserdetailCompletionForm = ({ setStep }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  //   const signupMutation = useMutation({
  //     mutationFn: (userData) => {console.log(userData)},

  //     onSuccess: (data) => {
  //       if (!data?.status) {
  //         showToast(data?.message || "Signup failed. Please try again.", "error");
  //         return;
  //       }

  //       showToast(data.message || "Signup successful!", "success");
  //     },

  //     onError: (error: any) => {
  //       showToast(error?.message || "Signup failed. Please try again.", "error");
  //     },
  //   });

  const stepData = useSelector((state: RootState) => state.step);
  const step = stepData.step;
  const allStep = stepData.allSteps;

  const handleSignup = (data) => {
    if (step?.step !== allStep[allStep?.length - 1].step) {
      setStep(allStep?.find((el) => el?.step === step?.step + 1));
    }
    console.log(data);
  };
  const hanldeBack = () => {
    if (step?.step !== allStep[0].step) {
      setStep(allStep?.find((el) => el?.step === step?.step - 1));
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        className="w-100 d-flex flex-column justify-content-between h-100"
        onSubmit={handleSubmit((data) => handleSignup(data))}
      >
        {step?.step == 1 && <Step1 />}
        {step?.step == 2 && <Step2 />}
        {step?.step == 3 && <Step3 />}
        {step?.step == 4 && <Step4 />}
        <div className="d-flex position-relative">
          {step?.step != 1 && (
            <div
              className="position-absolute"
              style={{
                left: "0%",
                bottom: "20%",
              }}
            >
              <NextBackButton
                type={"button"}
                direction="back"
                size={50}
                isLoading={false}
                handleOnClick={hanldeBack}
              />
            </div>
          )}

          <div
            className="position-absolute"
            style={{
              left: "85%",
              bottom: "20%",
            }}
          >
            <NextBackButton
              type={"submit"}
              direction="next"
              size={50}
              isLoading={false}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserdetailCompletionForm;
