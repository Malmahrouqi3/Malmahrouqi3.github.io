import React from 'react';
import { Cpu, Box, Layers, Zap } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';

const techs = [
  { name: "Python", type: "Lang" },
  { name: "C++", type: "Lang" },
  { name: "CUDA", type: "Compute" },
  { name: "PyTorch", type: "ML" },
  { name: "TensorFlow", type: "ML" },
  { name: "MATLAB", type: "Sim" },
  { name: "Fortran", type: "Sim" },
  { name: "Docker", type: "Ops" },
  { name: "Linux", type: "OS" },
  { name: "SystemVerilog", type: "HW" },
];

export const TechStack: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-24 border-y border-zinc-100 bg-zinc-50/50">
      <div className="flex items-center gap-4 px-6 md:px-12 mb-12">
        <Cpu size={16} className="text-accent" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
          <TextReveal>Technical Arsenal</TextReveal>
        </span>
      </div>

      <div className="relative flex w-full">
        {/* Infinite Ticker */}
        <div className="animate-marquee whitespace-nowrap flex gap-4 items-center">
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between w-48 h-32 p-6 bg-white border border-zinc-200 rounded-xl hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <span className="w-2 h-2 bg-zinc-200 rounded-full group-hover:bg-accent transition-colors"></span>
                <span className="font-mono text-[10px] text-zinc-400 uppercase"><TextReveal>{tech.type}</TextReveal></span>
              </div>
              <span className="font-display text-2xl font-bold text-zinc-800 group-hover:text-black">
                <TextReveal>{tech.name}</TextReveal>
              </span>
              <div className="w-full h-px bg-zinc-100 group-hover:bg-accent/20 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Fade Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-50 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-50 to-transparent z-10"></div>
      </div>
    </div>
  );
};