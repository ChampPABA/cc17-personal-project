import { useState } from "react";
import LoginForm from "../features/authentication/components/LoginForm";
import RegisterContainer from "../features/authentication/components/RegisterContainer";
import userApi from "../apis/user";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import OtpForm from "../features/authentication/components/OtpForm";

function LoginPage() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpFormOpen, setIsOtpFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      setError("");
      const response = await userApi.requestOtp({ email });
      const { refCode } = response.data;
      setRefCode(refCode);
      setIsForgotPasswordOpen(false);
      setIsOtpFormOpen(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-ifcg-white">
        <div className="flex max-w-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-ifcg-white rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <img
                className="mx-auto h-10 w-auto"
                src="../../assets/ifcg_logo.png"
                alt="Company Logo"
              />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-ifcg-black-high">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <LoginForm />
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <RegisterContainer />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-ifcg-red-high hover:text-ifcg-red-low"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      <Modal
        width={30}
        title="Forgot Password"
        open={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      >
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={error}
            name="email"
          />
          <Button bg="red" onClick={handleForgotPassword}>
            Send OTP to my email
          </Button>
        </div>
      </Modal>

      <Modal
        width={30}
        open={isOtpFormOpen}
        onClose={() => setIsOtpFormOpen(false)}
      >
        <OtpForm email={email} refCode={refCode} />
      </Modal>
    </>
  );
}

export default LoginPage;
