"use client";

import { InputPasswordField } from "@/components/ui/form/input-password";
import { InputTextField } from "@/components/ui/form/input-text";
import { Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "antd";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const createLoginSchema = (t: any) =>
  z.object({
    email: z.string().email({ message: t("errors.invalidEmail") }),
    password: z.string().min(6, { message: t("errors.passwordMinLength") }),
  });

export function LoginForm() {
  const t = useTranslations("AuthPage");
  const schema = createLoginSchema(t);

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
    values: {
      email: "john@mail.com",
      password: "changeme",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/about",
      });
      console.log("res :>> ", res);
      // if (res?.ok) router.push("/about");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="relative pt-10 pb-6 text-2xl font-bold uppercase">{t("login")}</p>
      <FormProvider {...methods}>
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="space-y-4"
          layout="vertical"
        >
          <InputTextField
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            required
            className="!px-5 !py-4"
          />

          <InputPasswordField
            name="password"
            label={t("password")}
            placeholder="Enter your password"
            required
            className="!px-5 !py-4"
          />
          <div
            className="h-full w-full rounded-sm p-1 shadow md:mt-16"
            style={{
              backgroundImage: 'url("/images/login/bg-button.svg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Button
              type="text"
              className="w-full rounded-sm !border-[1px] !border-white !px-2 !py-6 !shadow-md"
              disabled={isLoading}
              loading={isLoading}
              htmlType="submit"
            >
              <span className="text-lg font-bold text-black uppercase">{t("login")}</span>
            </Button>
          </div>
        </Form>
      </FormProvider>
      <div className="mt-8 flex flex-col justify-center">
        <div className="text-md z-10 text-center">
          <span>{t("dontHaveAccount")} </span>
          <Link
            href="/register"
            className="text-primary font-bold text-[#8249DD] hover:underline"
          >
            {t("register")}
          </Link>
        </div>
        <div className="z-10 text-center">
          <Link
            href="/auth/signup"
            className="font-bold text-[#8249DD] hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>
      </div>
    </div>
  );
}
