import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../apis/user";
import { axiosError } from "../../../utils/axios-error";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { toast } from "sonner";

export default function ChangePasswordForm({ email, refCode, onClose }) {
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputError, setInputError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setError("");
    if (input.password !== input.confirmPassword) {
      return setInputError({
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      });
    }

    try {
      setLoading(true);
      await userApi.changePassword({
        email,
        password: input.password,
        refCode,
      });
      setLoading(false);
      toast.success("Password changed successfully");
      onClose();
      navigate("/login");
    } catch (error) {
      setLoading(false);
      axiosError(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <form className="space-y-4" onSubmit={handleSubmitForm}>
        <Input
          type="password"
          name="password"
          placeholder="New Password"
          value={input.password}
          onChange={handleChangeInput}
          error={inputError.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={input.confirmPassword}
          onChange={handleChangeInput}
          error={inputError.confirmPassword}
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Button type="submit" bg="red" width="full" disabled={loading}>
          {loading ? "Loading..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
}
