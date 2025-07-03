"use client";

import { InputPasswordField } from "@/components/ui/form/input-password";
import { InputTextField } from "@/components/ui/form/input-text";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "antd";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const createSchema = (t: any) =>
  z
    .object({
      email: z.string().email({ message: t("errors.invalidEmail") }),
      fullName: z.string().min(1, { message: t("errors.fullNameRequired") }),
      password: z.string().min(6, { message: t("errors.passwordMinLength") }),
      confirmPassword: z.string().min(6, { message: t("errors.confirmPasswordMinLength") }),
      referralCode: z.string().optional(),
    })
    .refine(
      (data) => {
        console.log("data :>> ", data);
        return data.password === data.confirmPassword;
      },
      {
        message: t("errors.passwordsDontMatch"),
        path: ["confirmPassword"],
      },
    );

export function RegisterForm() {
  const t = useTranslations("AuthPage");
  const schema = createSchema(t);

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit } = methods;
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
    <div className="space-y-4">
      <p className="relative z-10 pt-10 text-2xl font-bold uppercase">{t("register")}</p>
      <FormProvider {...methods}>
        <Form
          form={form}
          onFinish={handleSubmit(onSubmit)}
          className="space-y-2"
          disabled={isLoading}
          scrollToFirstError={{
            behavior: "smooth",
            block: "center",
          }}
          layout="vertical"
        >
          <div>
            <InputTextField
              className="!px-5"
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              required
            />
            <InputTextField
              className="!px-5"
              name="fullName"
              label={t("fullName")}
              placeholder={t("fullNamePlaceholder")}
              required
            />

            <InputPasswordField
              className="!px-5"
              name="password"
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              required
            />
            <InputPasswordField
              className="!px-5"
              name="confirmPassword"
              label={t("confirmPassword")}
              placeholder={t("confirmPasswordPlaceholder")}
              required
            />
            <InputTextField
              className="!px-5"
              name="referralCode"
              label={t("referralCode")}
              placeholder={t("referralCodePlaceholder")}
            />
            <div
              className="mt-8 h-full w-full rounded-sm p-1 shadow md:mt-16"
              style={{
                backgroundImage: 'url("/images/login/bg-button.svg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Button
                type="text"
                className="w-full rounded-sm !border-[1px] !border-gray-200 !px-2 !shadow-md"
                disabled={isLoading}
                loading={isLoading}
                onClick={form.submit}
              >
                <span className="text-lg font-bold text-black uppercase">{t("register")}</span>
              </Button>
            </div>
          </div>
        </Form>
      </FormProvider>
      <div className="mt-6 flex flex-col justify-center">
        <div className="text-md z-10 text-center">
          <span className="">{t("dontHaveAccount")} </span>
          <Link
            href="/login"
            className="text-primary font-bold text-[#8249DD] hover:underline"
          >
            {t("login")}
          </Link>
        </div>
        <div className="z-10 text-center">
          <Link
            href="/reset-password"
            className="font-bold text-[#8249DD] hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>
      </div>
    </div>
  );
}
