import { useState } from "react";

import { Eye, EyeOff, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6">
        <h1 className="text-center text-4xl font-bold text-primary sm:text-5xl">
          Truemail
        </h1>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            SET NEW PASSWORD
          </h2>
          <p className="text-center text-sm text-gray-600">
            Must be at least 8 characters.
          </p>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-full border border-gray-300 px-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 w-full rounded-full border border-gray-300 px-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-3.5 text-gray-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Save Button */}
        <button className="w-full rounded-full bg-[#0F172A] py-3 text-sm font-medium text-white transition hover:bg-[#0c1324]">
          Save
        </button>

        {/* Back to Login */}
        <div className="text-center text-sm">
          <Link to="/login" className="text-gray-700 hover:underline">
            &larr; Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
