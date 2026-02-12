import HeroCanvas from "../components/HeroCanvas";
import PreHero from "../components/PreHero";
import { SwitchLanguage } from "../components/SwitchLanguage";

export default function Home() {
  return (
    <>
      <PreHero />
      {/* <section className="relative h-[200vh]"> */}
      <HeroCanvas />
      {/* </section> */}
      <SwitchLanguage />
    </>
  );
}
