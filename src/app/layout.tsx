import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jaydeep | Portfolio",
  description: "A scrollytelling personal portfolio website",
  icons: {
    icon: "/main-logo-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=creato-display@400,500,600,700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/main-logo-dark.png" />
      </head>
      <body className={`${inter.variable} font-body antialiased overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
