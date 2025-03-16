
import "./globals.css";
import { Sora } from "next/font/google";

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
