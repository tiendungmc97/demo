"use client";

import { SignInForm } from "./(auth)/signin/signin-form";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <SignInForm />
    </div>
  );
}
