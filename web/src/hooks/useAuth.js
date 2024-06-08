import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useAuth() {
  return useContext(UserContext);
}
