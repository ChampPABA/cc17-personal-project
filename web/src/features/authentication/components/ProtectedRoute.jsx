import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (!authUser && !isAuthUserLoading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isAuthUserLoading && <Loading />}
      {children}
    </>
  );
}
