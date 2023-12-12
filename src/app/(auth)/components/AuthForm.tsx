"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Input from "@/components/input/Input";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/home");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/home");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="flex flex-col items-center sm:py-20">
      <div className="mx-5 px-5 pt-5 sm:mx-auto sm:w-full sm:max-w-md rounded-md backdrop-blur-lg overflow-hidden border border-white">
        <div
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white
          "
        >
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-bold text-center">
              Welcome to MedSolutions
            </h1>
            <h2 className="text-lg font-normal">Sign in to your account</h2>
          </div>
        </div>
        <div
          className="
          py-8
          shadow
          sm:rounded-lg
        "
        >
          <form
            rel="noopener"
            className="space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              aria-required
              required
              id="email"
              label="Email address"
              placeholder="john.doe@example.com"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              aria-required
              id="password"
              label="Password"
              placeholder="*********"
              type="password"
            />
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex flex-row py-2.5 gap-5 justify-center items-center rounded-md w-full text-black bg-blue-300 hover:bg-blue-800 hover:text-white"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="relative flex justify-center text-sm">
            <span
              role="button"
              tabIndex={0}
              onClick={() => setForgot(true)}
              className="px-2 text-white cursor-pointer"
            >
              Forgot password?
            </span>
          </div>
          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-white
          "
          ></div>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
