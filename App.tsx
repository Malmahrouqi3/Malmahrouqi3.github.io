import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { BentoGrid } from './components/BentoGrid';
import { TechStack } from './components/TechStack';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Section } from './components/ui/Section';
import { Preloader } from './components/ui/Preloader';
import { TextReveal } from './components/ui/TextReveal';
import { LoadingProvider } from './components/ui/LoadingContext';

const AppContent: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }, []);

  return (
    <main className="bg-white min-h-screen text-primary selection:bg-black selection:text-white cursor-auto">
      <Preloader />
      <Navigation />

      <Hero />

      <TechStack />

      <About />

      <Section id="work" className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent"></div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <span className="inline-block"><TextReveal>Directives</TextReveal></span>
              </h2>
            </div>
            <h3 className="font-display text-4xl md:text-6xl font-bold text-primary tracking-tight leading-[0.9]">
              <TextReveal>Classified</TextReveal><br />
              <span className="text-zinc-400"><TextReveal>Operations</TextReveal></span>
            </h3>
          </div>
          <div className="hidden md:block text-right">
            <div className="inline-flex flex-col items-end">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400"><TextReveal>Clearance Level</TextReveal></span>
              <span className="text-xl font-display font-bold"><TextReveal>L-4</TextReveal></span>
            </div>
          </div>
        </div>
        <BentoGrid />
      </Section>

      <div id="stack" className="py-0"></div>

      <Contact />

    </main>
  );
};

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
};

export default App;