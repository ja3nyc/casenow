import { FormMessage, Message } from "@/components/forms/form-message";
import { Input } from "@/components/forms/input";
import { Label } from "@/components/forms/label";
import { SubmitButton } from "@/components/forms/submit-button";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login({ searchParams }: { searchParams: Message }) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return encodedRedirect("error", "/login", "Could not authenticate user");
    }
    return redirect("/chat");
  };

  return (
    <form className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md">
      <h1 className="text-2xl font-medium">Log in</h1>
      <p className="text-sm text-foreground/60">
        Don't have an account?{" "}
        <Link className="text-blue-600 font-medium underline" href="/signup">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>

          <Link
            className="text-sm text-blue-600 underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton formAction={signIn} pendingText="Signing In...">
          Log in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
