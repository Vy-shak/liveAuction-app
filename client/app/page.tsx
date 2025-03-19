import { NavBarL,HeroL,Features,Featured,HowitWorks } from "../components/index";


export default function Home() {
  return (
    <section className="w-full  h-full bg-white flex flex-col">
      <section className="w-full">
      <NavBarL/>
      </section>
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16">
      <HeroL/>
      </section>
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16">
      <Features/>
      </section>
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16">
      <Featured/>
      </section>
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16">
      <HowitWorks/>
      </section>
    </section>
  );
}
