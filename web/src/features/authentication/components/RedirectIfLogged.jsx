import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { useEffect } from "react";

export default function RedirectIfLogged({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();
  useEffect(() => {}, [authUser]);
  if (authUser && !isAuthUserLoading) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isAuthUserLoading && <Loading />}
      {children}
    </>
  );
}
