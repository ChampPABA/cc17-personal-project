import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import validateRegister from "../validators/register-validator";
import userApi from "../../../apis/user";
import { AxiosError } from "axios";
import { toast } from "sonner";

const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }
      setInputError({ ...initialInput });

      await userApi.register(input);
      onSuccess();
      toast.success("User has been created");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response.data.field === "email")
          setInputError((prev) => ({
            ...prev,
            email: "email already in use",
          }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="First name"
            value={input.firstName}
            name="firstName"
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div>
          <Input
            placeholder="Last name"
            value={input.lastName}
            name="lastName"
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div className="col-span-2">
          <Input
            placeholder="Email"
            value={input.email}
            name="email"
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className="col-span-2">
          <Input
            type="password"
            placeholder="Password"
            value={input.password}
            name="password"
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div className="col-span-2">
          <Input
            type="password"
            placeholder="Confirm password"
            value={input.confirmPassword}
            name="confirmPassword"
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
          />
        </div>
        <div className="col-span-2 mx-auto">
          <Button width={40} bg="red">
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
}
