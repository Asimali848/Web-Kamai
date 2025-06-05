import { Link } from "react-router-dom";

const Forgot = () => {
  return (
    <div className="h-screen w-full bg-white">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-10 sm:w-4/5 md:w-2/3 lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
          {/* Branding */}
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">
            WebKamai
          </h1>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Forgot
            </h2>
            <p className="text-sm font-medium text-[#525252] sm:text-base">
              How do I get started? Lorem ipsum dolor sit amet.
            </p>
          </div>
          {/* Email & Password */}
          <div className="flex w-full flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="h-12 w-full rounded-full border border-gray-300 px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="h-12 w-full rounded-full bg-primary px-5 py-2 text-white shadow-sm transition hover:bg-primary/90">
              Forgot
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm font-medium text-[#525252] sm:text-base">
            Go back to &nbsp;
            <Link to="/login" className="font-bold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
