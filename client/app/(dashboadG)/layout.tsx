import { Sidebar,NavbarD } from "../../components/index";
import { Toaster } from "@/components/ui/sonner"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-neutral-100">
      {<Toaster offset={{top:2}}  visibleToasts={2}   toastOptions={{
    style: {
      backgroundColor: "white", 
      color: "#F55200",
      border:"#D2D0D0"
    },
  }}  />}
              {<Sidebar/>}
              {<NavbarD/>}
              {children}
    </div>
  );
}