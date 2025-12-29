import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import { LetsWorkTogether } from '@/components/ui/lets-work-section';
import Manifesto from "@/components/Manifesto";

import Agents from "@/components/Agents";

import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

import { SideNavigation } from '@/components/ui/side-navigation';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20">
      <SideNavigation />
      <SiteHeader />

      {/* We Reveal each section as it comes into view */}
      <RevealOnScroll className="snap-start">
        <LetsWorkTogether />
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
