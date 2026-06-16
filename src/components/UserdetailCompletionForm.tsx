import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import NextBackButton from "./Form/Component/NextBackButton";
import Step1 from "../Forms/UserComplition/Step1";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/Store";
import Step2 from "../Forms/UserComplition/Step2";
import Step3 from "../Forms/UserComplition/Step3";
import { useEffect, useState } from "react";
import Step4 from "../Forms/UserComplition/Step4";
import { updateUser } from "../firebase/user";
import { auth } from "../firebase/firebase";
import { showToast } from "./Toast";
import { useNavigate } from "react-router-dom";

const UserdetailCompletionForm = ({ setStep }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const [sessionData, setSessionData] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        let session = null;

        if (!session && typeof window !== "undefined") {
          const rawSession = window.localStorage.getItem("session");
          if (rawSession) {
            session = JSON.parse(rawSession);
          }
        }

        setSessionData(session);
      } catch (error) {
        console.error("Failed to load session:", error);
        setSessionData(null);
      } finally {
        setLoadingSession(false);
      }
    };

    loadSession();
  }, []);

  const stepData = useSelector((state: RootState) => state.step);
  const step = stepData.step;
  const allStep = stepData.allSteps;

  const navigate = useNavigate();

  const userUpdateMutation = useMutation({
    mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
      return updateUser(data, userId);
    },
    onSuccess: () => {
      showToast("Profile updated successfully", "success");

      const updatedSession = {
        ...sessionData,
        isProfileCompleted: true,
        userData: {
          ...sessionData?.userData,
          isProfileCompleted: true,
        },
      };

      if (typeof cookieStore !== "undefined") {
        cookieStore.set({
          name: "session",
          value: JSON.stringify(updatedSession),
        });
      }

      window.localStorage.setItem("session", JSON.stringify(updatedSession));
      window.dispatchEvent(new Event("session-updated"));
      navigate("/dashboard");
      // Remove manual navigation to avoid routing flash.
      // Route change will happen automatically once AppRoutes sees the updated session.
    },
    onError: (error: any) => {
      showToast(error?.message || "Profile update failed.", "error");
      console.error("Profile update failed:", error);
    },
  });

  const onHandleSubmit = (data) => {
    if (step?.step !== allStep[allStep.length - 1].step) {
      setStep(allStep.find((el) => el?.step === step?.step + 1));
      return;
    }

    let userId = sessionData?.user?.uid;

    if (!userId && auth?.currentUser?.uid) {
      userId = auth.currentUser.uid;
    }

    if (!userId) {
      const error = new Error(
        "Unable to update profile: user session not found.",
      );
      showToast(error.message, "error");
      console.error(error);
      return;
    }

    userUpdateMutation.mutate({ data, userId });
  };

  if (loadingSession) {
    return <div>Loading...</div>;
  }

  const hanldeBack = () => {
    if (step?.step !== allStep[0].step) {
      setStep(allStep.find((el) => el?.step === step?.step - 1));
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        className="w-100 d-flex flex-column justify-content-between h-100"
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}
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
