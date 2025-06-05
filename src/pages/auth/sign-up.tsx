import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema
const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["uploader", "user"], { required_error: "Role is required" }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="flex h-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col items-center justify-center gap-8"
        >
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">
            WebKamai
          </h1>

          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Sign Up</h2>
            <p className="mt-1 text-sm text-[#525252]">
              Create your account to get started
            </p>
          </div>

          <div className="w-full">
            <Link
              to=""
              className="flex h-12 w-full items-center justify-center rounded-full border border-gray-300 bg-white text-sm shadow-sm transition hover:bg-gray-100"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign Up with <strong className="ml-1">Google</strong>
            </Link>
          </div>

          <fieldset className="w-full border-t border-gray-300 text-center">
            <legend className="mx-auto px-4 text-sm font-medium text-gray-500">
              Or sign up with email
            </legend>
          </fieldset>

          <div className="relative flex w-full flex-col gap-4">
            <div>
              <Input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="h-12 w-full rounded-full border border-gray-300 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="h-12 w-full rounded-full border border-gray-300 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="h-12 w-full rounded-full border border-gray-300 px-5 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <fieldset className="w-full border-t border-gray-300 text-center">
              <legend className="mx-auto px-4 text-sm font-medium text-gray-500">
                I want to be ...
              </legend>
            </fieldset>

            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 w-full rounded-full border border-gray-300 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uploader">Uploader</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-primary px-5 text-white shadow-sm transition hover:bg-primary/90"
          >
            Sign Up
          </button>

          <p className="text-sm text-[#525252]">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
