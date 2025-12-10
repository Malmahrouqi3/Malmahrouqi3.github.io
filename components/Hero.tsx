import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Crosshair } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';
import { Magnetic } from './ui/Magnetic';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  // Globe Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Globe Parameters
    const globeRadius = 300;
    const dotsCount = 400; // Number of points
    const dots: { x: number, y: number, z: number }[] = [];
    let rotation = 0;

    // Initialize random points on a sphere
    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotsCount);
      const theta = Math.sqrt(dotsCount * Math.PI) * phi;

      dots.push({
        x: globeRadius * Math.cos(theta) * Math.sin(phi),
        y: globeRadius * Math.sin(theta) * Math.sin(phi),
        z: globeRadius * Math.cos(phi)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle Mouse Interaction
      rotation += 0.002;

      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = '#09090b'; // Point color (Zinc-950)

      dots.forEach(dot => {
        // Rotate around Y axis
        let x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        let z = dot.z * Math.cos(rotation) + dot.x * Math.sin(rotation);
        let y = dot.y;

        // Project 3D to 2D
        // Simple perspective projection
        const scale = 800 / (800 + z);
        const x2d = x * scale + cx;
        const y2d = y * scale + cy;

        // Only draw if in front
        if (scale > 0.6) { // Cheap Z-buffering
          const alpha = Math.max(0, (scale - 0.6) * 2.5); // Fade out at edges
          ctx.globalAlpha = alpha * 0.4;

          ctx.beginPath();
          ctx.arc(x2d + (mousePos.x * 0.05), y2d + (mousePos.y * 0.05), 1.5 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePos]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 100);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({ x: clientX - centerX, y: (clientY - centerY) * -1 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-white">

      {/* 3D Wireframe Globe Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />

      {/* Floating Light Bloom */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-zinc-200 to-transparent rounded-full blur-[100px] opacity-40 pointer-events-none mix-blend-multiply" />

      <div className="max-w-screen-2xl mx-auto w-full z-10 relative">

        {/* Active Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-32 left-0 w-full flex justify-between items-start font-mono text-[9px] tracking-[0.2em] text-zinc-400 uppercase hidden md:flex select-none"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Crosshair size={12} className="text-accent animate-spin-slow" />
              <span><TextReveal>TARGET</TextReveal>: [ {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)} ]</span>
            </div>
            <span><TextReveal>LAT/LONG: 37.3541° N, 121.9552° W</TextReveal></span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span><TextReveal>T-MINUS</TextReveal>: {time.getMilliseconds().toString().padStart(3, '0')}</span>
            <span className="text-accent"><TextReveal>STATUS: ORBIT_STABLE</TextReveal></span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-600 font-mono text-[10px] tracking-[0.1em] uppercase font-bold">
                <TextReveal>Orbit Aware // v4.3</TextReveal>
              </span>
            </div>
          </div>

          <h1 className="font-display text-[12vw] md:text-[8.5rem] font-bold tracking-tighter text-black leading-[0.8] mb-10 mix-blend-darken select-none">
            <div className="flex flex-col">
              <span className="block"><TextReveal delay={0.1}>ORBIT</TextReveal></span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 stroke-text">
                <TextReveal delay={0.2}>AWARE.</TextReveal>
              </span>
            </div>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-zinc-100 pt-8">
            <div className="md:col-span-7">
              <div className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-light max-w-2xl mb-8">
                <TextReveal delay={0.3}>Architecting the convergence of Hypersonic Propulsion and Edge AI.</TextReveal>
                <br className="hidden md:block" />
                <span className="text-black font-medium mt-2 block">
                  <TextReveal delay={0.4}>Senior Machine Learning Engineer at NVIDIA.</TextReveal>
                </span>
              </div>

              {/* Socials moved to left */}
              <div className="flex gap-4">
                {[
                  { icon: Github, link: "https://github.com/Malmahrouqi3" },
                  { icon: Linkedin, link: "#" }
                ].map((Item, i) => (
                  <Magnetic key={i} strength={20}>
                    <a href={Item.link} target="_blank" rel="noreferrer" className="p-4 rounded-full border border-zinc-200 text-zinc-400 hover:text-black hover:border-black hover:bg-zinc-50 transition-all duration-300 group flex items-center justify-center">
                      <Item.icon size={18} className="group-hover:scale-110 transition-transform" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-300">
          <TextReveal delay={1}>Initialize</TextReveal>
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-300 to-transparent"></div>
      </motion.div>
    </section>
  );
};