import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Providers } from './providers';
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <Providers>
              <main className="grow">
                <Navbar />
                <div className="flex items-center justify-between rounded-lg bg-transparent">
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
                <div>
                  {children}
                </div>
              </main>
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}
