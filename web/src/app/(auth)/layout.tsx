import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import { Providers } from '../providers';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication - Job Board",
  description: "Log in or sign up for Job Board Application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-12`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

