import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function LoginForm() {
  return (
    <div className="flex max-w-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-ifcg-white rounded-lg shadow-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="#" alt="Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-ifcg-black-high">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-ifcg-black-high"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input placeholder="Email" autoComplete="email" />
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Input
                placeholder="Password"
                type="password"
                error="test error message"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div>
            <Button width="full">Login</Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">Not a member?</p>
      </div>
    </div>
  );
}
