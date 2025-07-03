"use client";

import { LoginForm } from "./(auth)/login/login-form";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <LoginForm />
    </div>
  );
}
