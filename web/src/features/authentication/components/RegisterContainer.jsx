import { useState } from "react";
import Modal from "../../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="text-center">
        <p
          className="text-center text-sm text-ifcg-gray-high hover:text-gray-300 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Not a member?
        </p>
      </div>
      <Modal
        title="Create new account"
        open={open}
        onClose={() => setOpen(false)}
      >
        <RegisterForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
