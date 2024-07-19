import { useEffect, useRef, useState } from "react";
import userApi from "../../../apis/user";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import ChangePasswordForm from "./ChangePasswordForm";
import { toast } from "sonner";
import { axiosError } from "../../../utils/axios-error";

function OtpForm({ email, refCode, onClose }) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(300); // 5 นาที คือ 300 วิ
  const [resendCountdown, setResendCountdown] = useState(60); // 1 นาที คือ 60 วิ
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const otpTimer = setInterval(() => {
      setOtpCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(otpTimer);
  }, []);

  useEffect(() => {
    const resendTimer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev === 1) {
          clearInterval(resendTimer);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(resendTimer);
  }, [resendCountdown]);

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      if (value && index < otpValues.length - 1) {
        inputRefs.current[index + 1].focus(); // เมื่อ user กรอกแล้วให้เลื่อนไปยัง input ถัดไป
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError("");
      const otp = otpValues.join("");
      await userApi.verifyOtp({ email, otp, refCode });
      setIsChangePasswordOpen(true);
      toast.success("OTP verified successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid or expired OTP.");
      axiosError(error);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendDisabled(true);
      setResendCountdown(60);
      setOtpCountdown(300);
      setOtpValues(["", "", "", "", "", ""]);
      setError("");
      await userApi.requestOtp({ email });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
      axiosError(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center h-full w-full">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
          <p className="text-gray-600 text-center mb-4">
            Code sent to {email}, referenced code is {refCode}
          </p>
          <div className="grid grid-cols-6 gap-x-4 my-2">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(event) =>
                  handleInputChange(index, event.target.value)
                }
                className="rounded-lg bg-gray-100 w-14 aspect-square flex items-center justify-center text-center text-2xl"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex items-center flex-col justify-between mb-6">
            {resendCountdown > 0 ? (
              <p className="text-gray-600 text-sm">Didn`t receive code?</p>
            ) : null}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleResendOtp}
                disabled={isResendDisabled}
                className={`px-3 py-2 text-sm font-medium text-center rounded ${
                  isResendDisabled
                    ? "text-gray-500"
                    : "text-ifcg-red-high hover:text-ifcg-red-low"
                }`}
              >
                Request Again (
                {isResendDisabled
                  ? `${Math.floor(resendCountdown / 60)}:${String(
                      resendCountdown % 60
                    ).padStart(2, "0")}`
                  : "Send OTP"}
                )
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button bg="red" onClick={handleVerifyOtp}>
              Verify ({Math.floor(otpCountdown / 60)}:
              {String(otpCountdown % 60).padStart(2, "0")})
            </Button>
          </div>
        </div>
      </div>
      <Modal
        width={30}
        title="Change Password"
        open={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      >
        <ChangePasswordForm
          email={email}
          refCode={refCode}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      </Modal>
    </>
  );
}

export default OtpForm;
