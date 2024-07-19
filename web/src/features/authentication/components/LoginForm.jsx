import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validators/login-validator";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { axiosError } from "../../../utils/axios-error";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      }

      setInputError(initialInputError);

      // เขียน if chec role แล้วค่อย navigate
      await login(input);

      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      axiosError(error);
    }
  };
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmitForm}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-ifcg-black-high"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input
              autoComplete="email"
              name="email"
              value={input.email}
              onChange={handleChangeInput}
              error={inputError.email}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-ifcg-black-high"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <Input
              type="password"
              autoComplete="current-password"
              name="password"
              value={input.password}
              onChange={handleChangeInput}
              error={inputError.password}
            />
          </div>
        </div>

        <div>
          <Button width="full">Login</Button>
        </div>
      </form>
    </>
  );
}
