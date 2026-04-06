import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import HeaderAuth from "@/components/HeaderAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "My Next.js App",
  description: "A full-stack Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <span className="text-lg font-semibold text-gray-800">
              {process.env.NEXT_PUBLIC_APP_NAME ?? "My Next.js App"}
            </span>
            <HeaderAuth />
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
