import type { Metadata } from "next";
import { Manrope, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "AKOSSHOP",
  description:
    "AKOSSHOP marketing site for premium proxies, verified accounts, and automation services.",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${orbitron.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
