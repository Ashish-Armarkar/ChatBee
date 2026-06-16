import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerticalStepper from "../components/Stepper/VerticalStepper";
import UserdetailCompletionForm from "../components/UserdetailCompletionForm";
import { setStep } from "../Store/Slices/UserSlice";
import type { RootState } from "../Store/Store";

const UserdetailsCompletion = () => {
  const stepData = useSelector((state: RootState) => state.step);
  const step = stepData?.step;
  const items = stepData?.allSteps;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!step) {
      dispatch(setStep(items[0]));
    }
  }, []);
  return (
    <div
      className="w-50 d-flex justifi-content-center align-items-center"
      style={{
        height: "calc( 100% - 30%)",
        borderRadius: "4px",
        background: "#f3e7d6df",
      }}
    >
      <div className="w-50 h-100 d-flex justify-centent-center align-items-center p-3">
        <VerticalStepper items={items} step={step?.step} />
      </div>
      <div className="border h-75"></div>
      <div className="w-50 h-100">
        <div
          className="p-5"
          style={{
            height: "100px",
          }}
        >
          <div className="fw_600 fs_24">{step?.header?.heading}</div>
          <div className="text-muted fs_22">{step?.header?.subHeading}</div>
        </div>

        <div className="p-5" style={{ height: "calc(100% - 100px)" }}>
          <UserdetailCompletionForm
            setStep={(step) => dispatch(setStep(step))}
          />
        </div>
      </div>
    </div>
  );
};

export default UserdetailsCompletion;
