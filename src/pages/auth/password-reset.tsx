import { useState } from "react";

import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [code, setCode] = useState(Array(6).fill(""));

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const nextInput = document.getElementById(`code-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">
          WebKamai
        </h1>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            PASSWORD RESET
          </h2>
          <p className="text-center text-sm text-gray-600">
            We sent a code to{" "}
            <span className="font-medium">amelie@untitledui.com</span>
          </p>
        </div>

        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="h-14 w-12 rounded-lg border border-gray-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button className="w-full rounded-full bg-blue-500 py-3 text-sm font-medium text-white transition hover:bg-[#0c1324]">
          Continue
        </button>

        <div className="text-center text-sm text-gray-600">
          Didn't receive the email?
          <button className="font-medium text-blue-600 hover:underline">
            Click to resend
          </button>
        </div>

        <div className="text-center text-sm">
          <Link to="/login" className="text-gray-700 hover:underline">
            &larr; Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
