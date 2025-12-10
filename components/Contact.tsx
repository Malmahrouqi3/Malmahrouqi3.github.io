import React from 'react';
import { Section } from './ui/Section';
import { ArrowRight, Mail, Terminal, Wifi } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';

export const Contact: React.FC = () => {
  return (
    <Section id="contact" className="py-12 md:py-24">
      <div className="group relative rounded-[2.5rem] bg-[#050505] p-10 md:p-24 overflow-hidden shadow-2xl shadow-black/20">

        {/* Animated terminal lines background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent)] bg-[size:50px_50px]"></div>

        {/* Radial Gradient Hover */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-xs mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <TextReveal>Signal Active</TextReveal>
          </div>

          <h2 className="font-display text-[12vw] md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.85] mix-blend-screen">
            <TextReveal>Let's engineer</TextReveal> <br />
            <span className="text-zinc-600 group-hover:text-white transition-colors duration-700">
              <TextReveal>the future.</TextReveal>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 mb-12 font-light max-w-xl mx-auto">
            <TextReveal>Open to discussing high-impact challenges in Machine Learning, Autonomous Systems, and Aerospace.</TextReveal>
          </p>

          <a href="mailto:hello@example.com" className="group/btn relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
            <span className="relative z-10 flex items-center gap-2">
              <TextReveal>Initial Handshake</TextReveal> <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          </a>
        </div>
      </div>

      <footer className="mt-20 border-t border-zinc-100 pt-10 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-[10px] font-mono uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal size={12} />
            <p><TextReveal>System: Optimal</TextReveal></p>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={12} />
            <p><TextReveal>Ping: 14ms</TextReveal></p>
          </div>
        </div>
        <p className="mt-4 md:mt-0"><TextReveal>Mohammed S. Al-Mahrouqi © 2025</TextReveal></p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition-colors"><TextReveal>X / Twitter</TextReveal></a>
          <a href="#" className="hover:text-black transition-colors"><TextReveal>LinkedIn</TextReveal></a>
          <a href="https://github.com/Malmahrouqi3" className="hover:text-black transition-colors"><TextReveal>GitHub</TextReveal></a>
        </div>
      </footer>
    </Section>
  );
};