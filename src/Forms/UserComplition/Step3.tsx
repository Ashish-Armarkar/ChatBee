import InputField from "../../components/Form/Component/InputField";

const Step3 = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-2">
        <InputField
          name="firstName"
          label="First name"
          type="text"
          placeholder="Enter your first name"
          rules={{ required: "First Name is required" }}
          required
        />
        <InputField
          name="lastName"
          label="Last name"
          type="text"
          placeholder="Enter your last name"
          rules={{ required: "Last Name is required" }}
          required
        />
      </div>
      <InputField
        name="userName"
        label="Username"
        type="text"
        placeholder="Enter your Username"
        rules={{ required: "Username is required" }}
        required
      />
    </div>
  );
};

export default Step3;
