"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/input/Input";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/home");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

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

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          }),
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/home");
          }
        })
        .catch((error) => {
          console.log("authform error", error);
          toast.error("Something went wrong!");
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
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
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
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
    <main className="flex flex-col items-center sm:py-20 bg-gray-500">
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
          {variant === "LOGIN" ? (
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-bold text-center">
                Welcome to MedSolutions!
              </h1>
              <h2 className="text-lg font-normal">Sign in to your account</h2>
            </div>
          ) : (
            <h1 className="text-3xl">Create your account</h1>
          )}
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
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                aria-required
                required
                id="name"
                label="Name"
                placeholder="Jon Snow"
              />
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              aria-required
              required
              id="email"
              label="Email address"
              placeholder="jon.snow@castleblack.com"
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
                {variant === "LOGIN" ? "Sign in" : "Register"}
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
          >
            <div>
              {variant === "LOGIN" ? (
                <p className="text-blue-400">New to MedSolutions?</p>
              ) : (
                <p>Already have an account?</p>
              )}
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={toggleVariant}
              className="underline cursor-pointer"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
