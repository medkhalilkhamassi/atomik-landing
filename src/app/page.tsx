import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import { LetsWorkTogether } from '@/components/ui/lets-work-section';
import Manifesto from "@/components/Manifesto";
import HowItWorks from "@/components/HowItWorks";
import Agents from "@/components/Agents";
import Benefits from "@/components/Benefits";
import Mechanics from "@/components/Mechanics";
import Investors from "@/components/Investors";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20">
      <SiteHeader />
      <LetsWorkTogether />
      <Manifesto />
      <HowItWorks />
      <Agents />
      <Benefits />
      <Mechanics />
      <Investors />
      <Waitlist />
      <FAQ />
      <Footer />
    </main>
  );
}
