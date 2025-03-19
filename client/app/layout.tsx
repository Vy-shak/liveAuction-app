
import "./globals.css";
import { Sora } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"

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
      <body>
        <div className="w-full h-full">
        {<Toaster offset={{top:2}}  visibleToasts={2}   toastOptions={{
    style: {
      backgroundColor: "white", 
      color: "#F55200",
      border:"#D2D0D0"
    },
  }}  />}
        {children}
        </div>
      </body>
    </html>
  );
}
