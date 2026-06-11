import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Projects from "@/components/sections/Projects";
import Highlights from "@/components/sections/Highlights";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative z-10 w-full min-h-screen">
      <Hero />
      <Story />
      <Projects />
      <Highlights />
      <Skills />
      <Contact />
    </main>
  );
}
