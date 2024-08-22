import "@/app/globals.css";
import { ReactQueryClientProvider } from "@/app/providers/react-query-provider";
import { SidebarProvider } from "@/app/providers/sidebar-provider";
import { createClient } from "@/utils/supabase/server";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const locale = await getLocale();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <ReactQueryClientProvider>
      <html
        lang={locale}
        suppressHydrationWarning
        className={GeistSans.className}
      >
        <body className="min-h-screen bg-gradient-to-br from-blue-50 via-primary/10 to-purple-50">
          <NextIntlClientProvider locale={locale}>
            <SidebarProvider>{children}</SidebarProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
