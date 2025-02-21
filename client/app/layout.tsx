import type { Metadata } from "next";
import "./globals.css";
import { Sora } from "next/font/google";
import { Weight } from "lucide-react";

const sora = Sora({
  weight: ['100', '300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
