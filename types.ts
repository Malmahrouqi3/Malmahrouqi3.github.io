import { ReactNode } from 'react';

export interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  size: 'small' | 'medium' | 'large' | 'wide'; // Added 'wide' for variety
  specs?: { label: string; value: string }[]; // Added technical specs
}

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

declare global {
  interface Window {
    Lenis: any;
  }
}