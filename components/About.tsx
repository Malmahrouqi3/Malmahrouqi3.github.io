import React from 'react';
import { Section } from './ui/Section';
import { Target } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';

const experiences = [
  {
    role: "Senior Machine Learning Engineer",
    company: "NVIDIA",
    period: "Present",
    desc: "Driving performance architecture for autonomous vehicle perception. Optimizing DNN pipelines and validating silicon performance."
  },
  {
    role: "SoC Modeling Architect",
    company: "Samsung Research America",
    period: "2024",
    desc: "High-fidelity performance modeling for mobile System-on-Chips. Bottleneck analysis in memory subsystems."
  },
  {
    role: "Aerospace Engineer",
    company: "Georgia Tech",
    period: "Previous",
    desc: "Specialized in hypersonic propulsion and computational fluid dynamics."
  }
];

const locations = [
  { city: "Santa Clara", country: "USA", coords: "37.35N 121.95W", timezone: "PST" },
  { city: "Atlanta", country: "USA", coords: "33.74N 84.38W", timezone: "EST" },
  { city: "Seoul", country: "Korea", coords: "37.56N 126.97E", timezone: "KST" },
  { city: "Muscat", country: "Oman", coords: "23.58N 58.40E", timezone: "GST" },
];

export const About: React.FC = () => {
  return (
    <Section id="about" className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">

        {/* Left Column: Manifesto */}
        <div className="md:col-span-5 sticky top-32">
          <div className="flex items-center gap-2 mb-8 text-accent">
            <Target size={16} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
              <TextReveal>Intelligence</TextReveal>
            </h2>
          </div>

          <h3 className="font-display text-4xl md:text-5xl font-bold text-primary mb-12 leading-[1.05] tracking-tight">
            <TextReveal>Engineering at the edge of physics and silicon.</TextReveal>
          </h3>

          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-6 border-b border-zinc-200 pb-2">
              <span><TextReveal>Operational Base</TextReveal></span>
              <span><TextReveal>Active Nodes: 4</TextReveal></span>
            </div>
            <div className="space-y-6">
              {locations.map((loc, i) => (
                <div key={i} className="flex justify-between items-center group cursor-default">
                  <div>
                    <div className="font-bold text-sm text-zinc-900 group-hover:text-accent transition-colors">
                      <TextReveal>{loc.city}</TextReveal>
                    </div>
                    <div className="text-xs text-zinc-400">
                      <TextReveal>{loc.country}</TextReveal>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-zinc-300 group-hover:text-zinc-500 transition-colors">
                      <TextReveal>{loc.coords}</TextReveal>
                    </div>
                    <div className="text-[9px] font-bold text-zinc-200 group-hover:text-accent/50 uppercase"><TextReveal>{loc.timezone}</TextReveal></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="md:col-span-7 pt-4">
          <div className="border-l-2 border-zinc-100 ml-3 md:ml-0 space-y-16">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-12 group">
                {/* Timeline Node */}
                <div className="absolute -left-[9px] top-1 w-[16px] h-[16px] rounded-full bg-white border-4 border-zinc-200 group-hover:border-accent transition-colors duration-300 z-10 shadow-sm"></div>

                <div className="flex flex-col gap-1 mb-4">
                  <h4 className="font-display text-3xl font-bold text-zinc-900">
                    <TextReveal>{exp.role}</TextReveal>
                  </h4>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-zinc-700">
                      <TextReveal>{exp.company}</TextReveal>
                    </span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="font-mono text-zinc-500 text-xs uppercase tracking-wide bg-zinc-100 px-2 py-0.5 rounded">
                      <TextReveal>{exp.period}</TextReveal>
                    </span>
                  </div>
                </div>

                <p className="text-zinc-600 leading-relaxed font-light text-lg max-w-lg">
                  <TextReveal>{exp.desc}</TextReveal>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};