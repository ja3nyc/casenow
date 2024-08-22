import { getUser } from "@/app/hooks/getUser";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Header() {
  const redirectToLogin = () => {
    return redirect("/login");
  };
  const supabase = createClient();
  const { data: user, isLoading } = getUser({
    supabase,
  });
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
      <nav
        className={`transition-all bg-white  duration-300 shadow-md rounded-full py-2 pl-4 pr-2`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Logo />
            <div className="hidden md:flex space-x-6">
              <Link href="#features" className="text-sm hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="text-sm hover:text-primary">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Suspense fallback={null}>
              {(isLoading || !user) && (
                <Link href={"/login"} className="text-sm hover:text-primary">
                  Log in
                </Link>
              )}
              {isLoading || !user ? (
                <Link href={"/signup"}>
                  <Button
                    variant="default"
                    onClick={redirectToLogin}
                    className="bg-primary rounded-full text-white hover:bg-gray-800"
                  >
                    Sign Up →
                  </Button>
                </Link>
              ) : user ? (
                <Link href={"/chat"}>
                  <Button
                    variant="default"
                    onClick={redirectToLogin}
                    className="bg-primary rounded-full text-white hover:bg-primary/80"
                  >
                    New Chat <Zap className="size-4 ml-2" />
                  </Button>
                </Link>
              ) : null}
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  );
}
