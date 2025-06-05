import { Chrome } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen w-full bg-white">
      <div className="flex h-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-20">
        {/* Branding */}
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">
            WebKamai
          </h1>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              LOGIN
            </h2>
            <p className="text-sm font-medium text-[#525252] sm:text-base">
              How do I get started? Lorem ipsum dolor sit amet.
            </p>
          </div>

          {/* Google Login */}
          <div className="w-full">
            <Link
              to=""
              className="flex h-12 w-full items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition hover:bg-gray-100"
            >
              <Chrome className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">
                Login with <strong>Google</strong>
              </span>
            </Link>
          </div>

          {/* Divider */}
          <fieldset className="w-full border-t border-gray-300 text-center">
            <legend className="mx-auto px-4 text-base font-medium sm:text-lg">
              <strong>Login</strong> with Others
            </legend>
          </fieldset>

          {/* Email & Password */}
          <div className="flex w-full flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="h-12 w-full rounded-full border border-gray-300 px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="h-12 w-full rounded-full border border-gray-300 px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link
              to="/forgot"
              className="w-full text-right text-sm font-medium text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button className="h-12 w-full rounded-full bg-primary px-5 text-white shadow-sm transition hover:bg-primary/90">
            Login
          </button>

          {/* Footer */}
          <p className="text-sm font-medium text-[#525252] sm:text-base">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
