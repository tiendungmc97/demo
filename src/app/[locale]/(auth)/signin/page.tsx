import { Card } from "antd";
import { SignInForm } from "./signin-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="space-y-1">
          <p className="text-center text-2xl font-bold">Sign In</p>
          <p className="text-center">Choose your preferred sign in method</p>
        </div>
        <div>
          <SignInForm />
        </div>
      </Card>
    </div>
  );
}
