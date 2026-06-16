import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./Slices/UserSlice";

export const store = configureStore({
  reducer: {
    step: stepReducer,
    userData: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
