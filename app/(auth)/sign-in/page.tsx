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

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Kirishda xatolik");
      return;
    }
    toast.success("Xush kelibsiz!");
    router.push("/products");
  }

  return (
    <AuthShell
      title="Login to your account"
      description="Enter your email below to login to your account."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-foreground underline underline-offset-4">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="m@example.com" required className="h-10 bg-card" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required className="h-10 bg-card" />
        </div>
        <Button type="submit" disabled={loading} className="h-10 w-full">
          {loading ? "Kirilmoqda..." : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
};

export default SignIn;
