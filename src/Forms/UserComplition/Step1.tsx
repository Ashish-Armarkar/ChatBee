import InputField from "../../components/Form/Component/InputField";

const Step1 = () => {
  return (
    <div className="d-flex flex-column gap-2">
      <InputField
        name="mobile"
        label="Mobile Number"
        type="phone"
        placeholder="Enter your mobile number"
        rules={{ required: "Mobile is required" }}
      />
    </div>
  );
};

export default Step1;
