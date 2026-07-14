import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { MoldExperience } from "@/components/site/MoldExperience";
import { About } from "@/components/site/About";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Services } from "@/components/site/Services";
import { Stats } from "@/components/site/Stats";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <MoldExperience />
        <About />
        <WhyChooseUs />
        <Services />
        <Stats />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
