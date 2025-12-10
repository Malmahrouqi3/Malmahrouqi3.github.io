import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Code2 } from 'lucide-react';
import { NavItem } from '../types';
import { Magnetic } from './ui/Magnetic';
import { TextReveal } from './ui/TextReveal';

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero', icon: <Home size={20} /> },
  { label: 'About', href: '#about', icon: <User size={20} /> },
  { label: 'Work', href: '#work', icon: <Briefcase size={20} /> },
  { label: 'Stack', href: '#stack', icon: <Code2 size={20} /> },
  { label: 'Contact', href: '#contact', icon: <Mail size={20} /> },
];

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 p-2 bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-full shadow-xl shadow-zinc-200/50"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <Magnetic key={item.label} strength={15}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group
                    ${isActive ? 'text-zinc-900 bg-zinc-100' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'}`}
              >
                {item.icon}
                <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-transform duration-200 bg-zinc-900 text-xs px-3 py-1.5 rounded-lg text-white whitespace-nowrap shadow-lg">
                  <TextReveal>{item.label}</TextReveal>
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45"></div>
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute bottom-1.5 w-1 h-1 bg-black rounded-full"
                  />
                )}
              </a>
            </Magnetic>
          );
        })}
      </motion.nav>
    </div>
  );
};