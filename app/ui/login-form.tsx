"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    try {
      if (mode === "signin") {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message || "Invalid email or password.");
          setIsPending(false);
          return;
        }

        router.push(callbackUrl);
        router.refresh();
      } else {
        const { error: signUpError } = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message || "Failed to create account.");
          setIsPending(false);
          return;
        }

        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsPending(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("user@nextmail.com");
    setPassword("password128904");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={cn(lusitana.className, "mb-3 text-2xl font-semibold")}>
          {mode === "signin" ? "Please log in to continue." : "Create an account."}
        </h1>

        <div className="w-full">
          {mode === "signup" && (
            <div className="mb-4">
              <label
                className="mb-2 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm transition-colors placeholder:text-gray-500 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-gray-900" />
              </div>
            </div>
          )}

          <div>
            <label
              className="mb-2 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm transition-colors placeholder:text-gray-500 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label
              className="mb-2 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm transition-colors placeholder:text-gray-500 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <Button className="mt-6 w-full" disabled={isPending} aria-disabled={isPending}>
          {isPending
            ? mode === "signin"
              ? "Logging in..."
              : "Creating account..."
            : mode === "signin"
            ? "Log in"
            : "Sign up"}
          <ArrowRightIcon className="ml-auto size-5 text-gray-50" />
        </Button>

        {error && (
          <div
            className="mt-3 flex items-center gap-2 rounded-md bg-red-50 p-2.5 text-sm text-red-600"
            aria-live="polite"
          >
            <ExclamationCircleIcon className="size-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-4 flex flex-col items-center gap-2 border-t border-gray-200 pt-3 text-xs text-gray-600">
          <div>
            {mode === "signin" ? (
              <span>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Log in
                </button>
              </span>
            )}
          </div>

          {mode === "signin" && (
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-gray-500 hover:text-gray-800 underline transition-colors"
            >
              Fill demo account (user@nextmail.com)
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
