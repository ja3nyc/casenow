import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import "../globals.css";

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
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen flex">
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-50 via-primary/10 to-purple-50 relative overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="absolute inset-0 opacity-70 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="ffflux-gradient"
                gradientTransform="rotate(150, 0.5, 0.5)"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  stopColor="hsl(221.2, 83.2%, 53.3%)"
                  stopOpacity="1"
                  offset="0%"
                ></stop>
                <stop
                  stopColor="hsl(259, 91%, 83%)"
                  stopOpacity="1"
                  offset="100%"
                ></stop>
              </linearGradient>
              <filter
                id="ffflux-filter"
                x="0"
                y="0"
                width="100%"
                height="100%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.005 0.003"
                  numOctaves="2"
                  seed="2"
                  stitchTiles="stitch"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  result="turbulence"
                ></feTurbulence>
                <feGaussianBlur
                  stdDeviation="20 0"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  in="turbulence"
                  edgeMode="duplicate"
                  result="blur"
                ></feGaussianBlur>
                <feBlend
                  mode="color-dodge"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  in="SourceGraphic"
                  in2="blur"
                  result="blend"
                ></feBlend>
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#ffflux-gradient)"
              filter="url(#ffflux-filter)"
            ></rect>
          </svg>
        </div>
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
