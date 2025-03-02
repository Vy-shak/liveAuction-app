import { Sidebar,NavbarD } from "../../components/index";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-100 flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {<Sidebar/>}
        {<NavbarD/>}
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}