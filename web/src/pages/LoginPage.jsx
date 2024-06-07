import LoginForm from "../features/authentication/components/LoginForm";
import RegisterContainer from "../features/authentication/components/RegisterContainer";

function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-ifcg-white">
        <LoginForm />
        <hr />
        <RegisterContainer />
      </div>
    </>
  );
}

export default LoginPage;
