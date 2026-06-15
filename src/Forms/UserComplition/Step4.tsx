import UploadField from "../../components/Form/Component/UploadField";

const Step4 = () => {
  return (
    <div className="d-flex flex-column gap-2">
      <UploadField
        name="profileImage"
        label="Profile Image"
        avtarSize={300}
        required
      />
    </div>
  );
};

export default Step4;
