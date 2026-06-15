import React from "react";
import OTPField from "../../components/Form/Component/OTPField";

const Step2 = () => {
  return (
    <div className="d-flex flex-column gap-2">
      <OTPField
        name="otp"
        label="Enter OTP"
        length={6}
        info="For demo purposes, use OTP: 123456. Real mobile OTP verification is disabled because SMS verification requires a paid Firebase plan."
        isRequired
      />
    </div>
  );
};

export default Step2;
