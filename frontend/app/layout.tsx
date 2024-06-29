"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { checkUser } from "@/actions/main";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};
export default RootLayout;
