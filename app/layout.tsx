import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import IconLogo from "../public/apple.png";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HalalCheck Food and Ingredients",
  description:
    "AI-powered Halal compliance checker for ingredients, food products, and more.",
  generator: "Next.js, AI SDK, MongoDB",
  icons: {
    icon: [
      {
        url: IconLogo.src,
        media: "(prefers-color-scheme: light)",
      },
      {
        url: IconLogo.src,
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: IconLogo.src,
        type: "image/svg+xml",
      },
    ],
    apple: "/apple.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
