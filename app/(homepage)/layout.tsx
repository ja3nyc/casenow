import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { ReactQueryClientProvider } from "../providers/react-query-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="min-h-screen bg-gradient-to-br from-blue-50 via-primary/10 to-purple-50">
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
