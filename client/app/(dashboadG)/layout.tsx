import { Sidebar,NavbarD } from "../../components/index";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full px-12">
              {<Sidebar/>}
              {<NavbarD/>}
              {children}
    </div>
  );
}