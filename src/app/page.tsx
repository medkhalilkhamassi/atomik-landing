import SiteHeader from "@/components/layout/SiteHeader";
import { HeroSection } from '@/components/sections/Hero/HeroSection';
import Manifesto from "@/components/sections/Manifesto/ManifestoSection";
import Agents from "@/components/sections/Agents/AgentsSection";
import FAQ from "@/components/sections/FAQ/FAQSection";
import Footer from "@/components/layout/Footer";
import { SideNavigation } from '@/components/layout/SideNavigation';
import { RevealOnScroll } from '@/components/ui/motion/RevealOnScroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20">
      <SideNavigation />
      <SiteHeader />

      {/* We Reveal each section as it comes into view */}
      <RevealOnScroll className="snap-start">
        <HeroSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="snap-start">
        <Manifesto />
      </RevealOnScroll>


      <RevealOnScroll delay={0.1} className="snap-start">
        <Agents />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="snap-start">
        <FAQ />
      </RevealOnScroll>

      <RevealOnScroll className="snap-start">
        <Footer />
      </RevealOnScroll>
    </main>
  );
}
