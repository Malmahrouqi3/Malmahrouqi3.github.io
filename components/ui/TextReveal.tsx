import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLoading } from './LoadingContext';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = "", delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });
    const { isLoaded } = useLoading();
    const [hasAnimated, setHasAnimated] = useState(false);

    // Initial scrambled state (Strict 1-to-1 mapping)
    useEffect(() => {
        if (!hasAnimated) {
            setDisplayText(
                children.split('').map(char => {
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
        }
    }, [children, hasAnimated]);

    useEffect(() => {
        // Only start if: Global Load is done AND Component is in View AND Hasn't animated yet
        if (!isLoaded || !isInView || hasAnimated) {
            if (hasAnimated) setDisplayText(children);
            return;
        }

        let interval: ReturnType<typeof setInterval>;
        let iteration = 0;

        // Convert delay to ms
        const startDelay = delay * 1000;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setDisplayText(prev =>
                    children
                        .split("")
                        .map((letter, index) => {
                            // Preserve spaces to prevent layout shift
                            if (letter === ' ') return ' ';

                            if (index < iteration) {
                                return children[index];
                            }
                            // Strict 1-to-1 random character
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= children.length) {
                    clearInterval(interval);
                    setHasAnimated(true);
                }

                // Speed Control:
                // Set to 1 character per tick at 25ms
                iteration += 1;
            }, 25); // Set to 25ms per request
        }, startDelay);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [children, isInView, delay, hasAnimated, isLoaded]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
};
