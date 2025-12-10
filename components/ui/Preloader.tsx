import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from './LoadingContext';

export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("INITIALIZING");
    const { setLoaded } = useLoading();

    const bootSequence = [
        "CHECKING_BIO_METRICS",
        "ESTABLISHING_UPLINK",
        "CALIBRATING_SENSORS",
        "LOADING_NEURAL_NET",
        "ORBIT_ESTABLISHED"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsLoading(false);
                        setLoaded(true); // Signal global load complete
                    }, 200);
                    return 100;
                }

                // Update text based on progress chunks
                const step = Math.floor((prev / 100) * bootSequence.length);
                if (bootSequence[step]) setText(bootSequence[step]);

                // Increments
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 50); // Set to 50ms per request

        return () => clearInterval(timer);
    }, [setLoaded]);

    return (
        <AnimatePresence mode='wait'>
            {isLoading && (
                <motion.div
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[10000] bg-black text-white flex flex-col items-center justify-center font-mono"
                >
                    <div className="w-64">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2 text-zinc-500">
                            <span>System_Boot_v4.2</span>
                            <span>{progress}%</span>
                        </div>

                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="h-6 overflow-hidden">
                            <motion.p
                                key={text}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="text-xs text-center text-zinc-300 tracking-[0.2em] uppercase"
                            >
                                {text}...
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
