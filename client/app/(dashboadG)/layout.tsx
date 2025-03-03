import { Sidebar,NavbarD } from "../../components/index";
import { Toaster } from "@/components/ui/sonner"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-neutral-100">
      {<Toaster />}
              {<Sidebar/>}
              {<NavbarD/>}
              {children}
    </div>
  );
}