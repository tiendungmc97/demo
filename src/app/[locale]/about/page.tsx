"use client";

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { login, logout } from "@/redux/slice/user-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useUserProfile } from "@/services/react-query/hooks/use-users";
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
    const userInfo = {
      id: "",
      name: "",
      email: "",
    };
    dispatch(logout());
  }
  const  {data} = useUserProfile(1);
  return (
    <LoadingOverlay isLoading={true} message="Loading...">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <button onClick={saveUser}>Save User</button>
          <button onClick={logoutUser}>logout</button>
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p>{t("hello", { name: user?.currentUser?.name ?? "" })}</p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>
        <Button color="primary">22323</Button>
        <Button color="blue" variant="link">2323</Button>
      </div>
    </LoadingOverlay>
  );
}
