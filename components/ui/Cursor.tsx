import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export const Cursor: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    // Smooth spring physics for the cursor
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouse.x, smoothOptions);
    const smoothY = useSpring(mouse.y, smoothOptions);

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouse.x.set(clientX);
            mouse.y.set(clientY);
        };

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', manageMouseMove);
        window.addEventListener('mouseover', manageMouseOver);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
            window.removeEventListener('mouseover', manageMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                style={{ left: smoothX, top: smoothY }}
                className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
            >
                {/* Core Dot */}
                <motion.div
                    animate={{ scale: isHovered ? 4 : 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                />

                {/* Reticle / Brackets */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 1 : 0,
                        rotate: isHovered ? 0 : 45
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white rounded-full transition-opacity duration-300"
                />

                {/* Data readout */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0, x: 20 }}
                    className="absolute top-0 left-0 whitespace-nowrap text-[8px] font-mono text-white tracking-widest uppercase"
                >
                    Target_Lock
                </motion.div>
            </motion.div>
        </>
    );
};
