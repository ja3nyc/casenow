import { FormMessage, Message } from "@/components/forms/form-message";
import { Input } from "@/components/forms/input";
import { Label } from "@/components/forms/label";
import { SubmitButton } from "@/components/forms/submit-button";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import Link from "next/link";

export default function Signup({ searchParams }: { searchParams: Message }) {
  const signUp = async (formData: FormData) => {
    "use server";
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error.code + " " + error.message);
      return encodedRedirect("error", "/signup", "Error trying to sign up");
    } else {
      return encodedRedirect(
        "success",
        "/signup",
        "Thanks for signing up! Please check your email for a verification link."
      );
    }
  };

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <form className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md">
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text text-foreground/60">
        Already have an account?{" "}
        <Link className="text-blue-600 font-medium underline" href="/login">
          Log in
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton formAction={signUp} pendingText="Signing up...">
          Sign up
        </SubmitButton>
      </div>
      <FormMessage message={searchParams} />
    </form>
  );
}
