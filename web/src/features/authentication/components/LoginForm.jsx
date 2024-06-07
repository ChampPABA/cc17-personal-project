import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function LoginForm() {
  return (
    <>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-ifcg-black-high"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input autoComplete="email" />
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
                className="font-semibold text-ifcg-gray-high hover:text-gray-300"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Input
              type="password"
              error="ทดสอบ"
              autoComplete="current-password"
            />
          </div>
        </div>

        <div>
          <Button width="full">Login</Button>
        </div>
      </form>
    </>
  );
}
