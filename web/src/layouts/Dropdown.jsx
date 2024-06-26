import { Link, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icons";
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { logout, authUser } = useAuth();

  const handleClickLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div role="button" onClick={() => setOpen((prev) => !prev)}>
        <Avatar />
      </div>
      {open && (
        <div className="absolute right-0">
          <div className="p-2 w-96 rounded-lg shadow-[0_0_6px_rgb(0,0,0,0.2)] bg-white translate-y-1.5">
            <Link to="/profile" onClick={() => setOpen(false)}>
              <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2">
                <Avatar size={3.75} />
                <div className="flex flex-col">
                  <h2 className="font-semibold">
                    {authUser?.firstName} {authUser?.lastName}
                  </h2>
                  <small className="text-gray-500">See your profile</small>
                </div>
              </div>
            </Link>
            <hr className="my-2 border border-gray-300 hidden" />
            <div
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg hidden"
              role="button"
              onClick={handleClickLogout}
            >
              <div className="bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center">
                <RightFromBracketIcon />
              </div>
              <span className="text-sm font-semibold">Log out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
