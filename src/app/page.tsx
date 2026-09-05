import About from "@/components/About";
import Contact from "@/components/Contact";
import EmbeddingField from "@/components/EmbeddingField";
import EditorialFolio from "@/components/EditorialFolio";
import Experiments from "@/components/Experiments";
import Hero from "@/components/Hero";
import SiteNav from "@/components/SiteNav";
import StackPlot from "@/components/StackPlot";
import TickStrip from "@/components/TickStrip";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EmbeddingField />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_top,transparent,rgba(11,10,8,0.55))]" />
      <SiteNav />
      <Hero />
      <TickStrip />
      <EditorialFolio />
      <Experiments />
      <StackPlot />
      <About />
      <Contact />
    </main>
  );
}
