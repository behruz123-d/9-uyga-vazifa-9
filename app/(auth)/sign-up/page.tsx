"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Ro'yxatdan o'tishda xatolik");
      return;
    }
    toast.success("Akkaunt yaratildi");
    router.push("/products");
  }

  return (
    <AuthShell
      title="Create an account"
      description="Enter your details below to create your account."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-foreground underline underline-offset-4">
            Log In
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" autoComplete="name" placeholder="Rustam" required className="h-10 bg-card" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="m@example.com" required className="h-10 bg-card" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required className="h-10 bg-card" />
        </div>
        <Button type="submit" disabled={loading} className="h-10 w-full">
          {loading ? "Yuborilmoqda..." : "Sign Up"}
        </Button>
      </form>
    </AuthShell>
  );
};

export default SignUp;
