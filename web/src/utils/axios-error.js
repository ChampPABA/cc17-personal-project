import { AxiosError } from "axios";
import { toast } from "sonner";

export const axiosError = (error) => {
  if (error instanceof AxiosError) {
    let message;
    switch (error.response.status) {
      case 400:
        message = "Invalid email or password";
        break;
      case 403:
        message = "This account is not activated. please contact administrator";
        break;
      case 500:
        message = "Internal Server Error";
        break;
      default:
        message = "An unexpected error occurred";
        break;
    }
    toast.error(message);
  } else {
    console.error(error);
    toast.error("An unexpected error occurred");
  }
};