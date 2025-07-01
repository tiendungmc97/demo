"use client";

import type React from "react";

import { InputPasswordField } from "@/components/ui/form/input-password";
import { InputTextField } from "@/components/ui/form/input-text";
import { Button, Layout } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "@/i18n/navigation";
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type SignInFormData = z.infer<typeof schema>;
export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    values: {
      email: "john@mail.com",
      password: "changeme",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) router.push("/about");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/about" });
    } catch (error) {
      console.error("Social sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="space-y-4">
      {/* Social Login Buttons */}
      <div className="space-y-2">
        <Button
          className="w-full border-gray-300 bg-white text-black hover:bg-gray-50"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading}
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-muted-foreground bg-white px-2">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <InputTextField
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <InputPasswordField
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          className="w-full"
          disabled={isLoading}
          loading={isLoading}
          htmlType="submit"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">{`Don't have an account?`} </span>
        <Link
          href="/auth/signup"
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </Layout>
  );
}
