import { Sidebar,NavbarD } from "../../components/index";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-neutral-100">
              {<Sidebar/>}
              {<NavbarD/>}
              {children}
    </div>
  );
}