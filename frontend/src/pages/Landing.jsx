import { useEffect } from "react";
import Lenis from "lenis";
import Cursor from "@/components/landing/Cursor";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Manifesto from "@/components/landing/Manifesto";
import Services from "@/components/landing/Services";
import Stats from "@/components/landing/Stats";
import Portfolio from "@/components/landing/Portfolio";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor link support
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -60, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <main data-testid="landing-root" className="bg-ink-0 text-white min-h-screen">
      <Cursor />
      <div className="noise-layer" />
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <Stats />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
