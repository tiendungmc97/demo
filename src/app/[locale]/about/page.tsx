"use client";

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { login, logout } from "@/redux/slice/user-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useUserProfile } from "@/services/hooks/use-auth";
import { Button } from "antd";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const saveUser = () => {
    const userInfo = {
      id: "1",
      name: "Teo",
      email: "",
    };
    dispatch(login(userInfo));
  };
  const logoutUser = () => {
    dispatch(logout());
  };
  const { data, refetch, isLoading, isRefetching } = useUserProfile();
  console.log("data :>> ", data);
  return (
    <LoadingOverlay
      isLoading={isLoading || isRefetching}
      message="Loading..."
    >
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <Button onClick={() => refetch()}>Refetch</Button>
          <button onClick={saveUser}>Save User</button>
          <button onClick={logoutUser}>logout</button>
          <h1 className="bg-red mb-2 rounded-2xl border-2 text-4xl font-bold tracking-tight text-gray-500">
            {t("title")}
          </h1>
          <p>{t("hello", { name: user?.currentUser?.name ?? "" })}</p>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t("description")}</p>
        </div>
        <Button color="primary">22323</Button>
        <Button
          color="blue"
          variant="link"
        >
          2323
        </Button>
        <Button color="red">2323</Button>
        <p>{data?.email}</p>
      </div>
    </LoadingOverlay>
  );
}
