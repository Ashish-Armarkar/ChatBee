import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "info";

export const showToast = (
  message: string = "nnn",
  type: ToastType = "info",
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

export const AppToast = () => {
  return <ToastContainer autoClose={3000} theme="light" />;
};
