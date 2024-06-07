import LoginForm from "../features/authentication/components/LoginForm";
import RegisterContainer from "../features/authentication/components/RegisterContainer";

function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-ifcg-white">
        <div className="flex max-w-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-ifcg-white rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="#" alt="Logo" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-ifcg-black-high">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <LoginForm />
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <RegisterContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
