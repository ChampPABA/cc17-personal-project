import { Suspense } from "react";
import Router from "./routes";
import { Toaster } from "sonner";
import Loading from "./components/Loading";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthUserLoading } = useAuth();
  if (isAuthUserLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Router />
      <Toaster richColors />
    </Suspense>
  );
}

export default App;
