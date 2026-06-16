import { createSlice } from "@reduxjs/toolkit";
const items = [
  {
    step: 1,
    title: "Contact Details",
    content: "Enter your mobile number to get started.",
    header: {
      heading: "Welcome to ChatBee 👋",
      subHeading: "Let's begin by adding your mobile number.",
    },
  },
  {
    step: 2,
    title: "Verify OTP",
    content: "Verify the OTP sent to your mobile number.",
    header: {
      heading: "Verify Your Mobile Number",
      subHeading: "Enter the 6-digit OTP to confirm your mobile number.",
    },
  },
  {
    step: 3,
    title: "Personal Details",
    content:
      "Tell us a little about yourself so others can identify you easily.",
    header: {
      heading: "Complete Your Profile",
      subHeading: "Add your basic information to help others recognize you.",
    },
  },
  {
    step: 4,
    title: "Upload Profile",
    content: "Add a profile picture to personalize your ChatBee experience.",
    header: {
      heading: "Add Your Profile Photo",
      subHeading: "Upload a profile picture to complete your account setup.",
    },
  },
];
const initialState = {
  step: items[0],
  allSteps: items,
  userData: null,
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setUerData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setStep, setUerData } = stepperSlice.actions;

export default stepperSlice.reducer;
