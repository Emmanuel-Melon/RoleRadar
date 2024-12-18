import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Providers } from './providers';
import "./globals.css";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Board",
  description: "Job Board Application",
};

function checkAuthRoutes(pathname: string) {
  return pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password');
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isAuthRoute = checkAuthRoutes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            {!isAuthRoute && <Navbar />}
            <main className="w-1/2 mx-auto">
              <div className="flex items-center justify-between p-2 rounded-lg bg-transparent">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft /> Back
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  Refresh <RefreshCcw />
                </Button>
              </div>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
