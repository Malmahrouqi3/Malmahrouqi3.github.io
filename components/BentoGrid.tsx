import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectType } from '../types';
import { TextReveal } from './ui/TextReveal';

const projects: ProjectType[] = [
  {
    title: "LEOJet Propulsion",
    description: "Hypersonic ramjet architecture optimizing specific impulse at Mach 6+.",
    tags: ["MATLAB", "Propulsion", "Thermodynamics"],
    link: "#",
    image: "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?q=80&w=2670&auto=format&fit=crop",
    size: "wide",
    specs: [{ label: "Thrust", value: "4.76 Mlb" }, { label: "Mach", value: "6.2" }]
  },
  {
    title: "RCS Control",
    description: "PID Logic and hardware implementation for Reaction Control Systems.",
    tags: ["PID Logic", "C++"],
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    size: "small",
    specs: [{ label: "Latency", value: "<4ms" }]
  },
  {
    title: "Aero Flex",
    description: "FEA Strain analysis on NACA 2412 airfoils.",
    tags: ["FEA", "Python"],
    link: "#",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2670&auto=format&fit=crop",
    size: "small",
    specs: [{ label: "Nodes", value: "1.2M" }]
  },
  {
    title: "Flow Code",
    description: "Computational Fluid Dynamics solver using Navier Stokes equations.",
    tags: ["Fortran", "Docker"],
    link: "#",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
    size: "medium",
    specs: [{ label: "Precision", value: "FP64" }, { label: "Grid", value: "Adaptive" }]
  },
  {
    title: "Re-Entry Vehicle",
    description: "Hypersonic thermodynamics and heat shielding analysis.",
    tags: ["Thermal", "Aerospace"],
    link: "#",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2672&auto=format&fit=crop",
    size: "medium",
    specs: [{ label: "Temp", value: "2400K" }]
  }
];

const BentoCard: React.FC<{ project: ProjectType, index: number }> = ({ project, index }) => {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden bg-zinc-900 border border-zinc-800 hover:shadow-2xl hover:shadow-zinc-900/40 hover:border-zinc-700
            ${project.size === 'wide' ? 'md:col-span-8 md:row-span-1 rounded-[2rem]' : ''}
            ${project.size === 'large' ? 'md:col-span-6 md:row-span-2 rounded-[2rem]' : ''}
            ${project.size === 'medium' ? 'md:col-span-6 md:row-span-1 rounded-[1.5rem]' : ''}
            ${project.size === 'small' ? 'md:col-span-4 md:row-span-1 rounded-[1.5rem]' : ''}
          `}
    >
      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none transition-opacity duration-500" />

      {/* Active Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />

      {/* Tech Overlay Lines */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/40"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/40"></div>
      </div>

      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between transform-gpu translate-z-[20px]">
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/90">
                <TextReveal>{tag}</TextReveal>
              </span>
            ))}
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110">
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">
            <TextReveal>{project.title}</TextReveal>
          </h3>
          <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-md line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <TextReveal>{project.description}</TextReveal>
          </p>

          {/* Specs Grid */}
          <div className="flex gap-8 border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            {project.specs?.map((spec, j) => (
              <div key={j}>
                <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1"><TextReveal>{spec.label}</TextReveal></div>
                <div className="text-lg font-display text-white font-medium"><TextReveal>{spec.value}</TextReveal></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
      />
    </motion.div>
  );
};

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] perspective-[1000px]">
      {projects.map((project, i) => (
        <BentoCard key={i} project={project} index={i} />
      ))}
    </div>
  );
};