"use client";

import { InputTextField } from "@/components/ui/form/input-text";
import { SelectField } from "@/components/ui/form/select";
import { Link } from "@/i18n/navigation";
import { userSchema } from "@/libs/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof userSchema>;
export default function HomePage() {
  const t = useTranslations("HomePage");
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(userSchema),
  });
  const submit = (data: FormData) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t("description")}</p>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <InputTextField
          control={control}
          name="username"
          label="Username"
          addonBefore="https://"
          placeholder="input search text"
          allowClear
          required
        />
        <InputTextField
          control={control}
          name="email"
          label="Email"
        />
        <SelectField
          control={control}
          name="username"
          label="Select User"
          options={[
            { value: "user1", label: "User 1" },
            { value: "user2", label: "User 2" },
            { value: "user3", label: "User 3" },
          ]}
        />
        <Button htmlType="submit">Submit</Button>
      </form>

      <div className="flex justify-center gap-4">
        <button>
          <Link href="/about">{t("getStarted")}</Link>
        </button>
      </div>
    </div>
  );
}
