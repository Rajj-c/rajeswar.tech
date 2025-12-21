'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

export const TextDecrypt = ({ text, animateOnLoad = false }: { text: string, animateOnLoad?: boolean }) => {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Changed to once: true for better performance

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isInView || animateOnLoad) {
            let iteration = 0;
            const animate = () => {
                interval = setInterval(() => {
                    setDisplayText(prev =>
                        text.split("").map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        }).join("")
                    );

                    if (iteration >= text.length) {
                        clearInterval(interval);
                    }

                    iteration += 1 / 3;
                }, 30);
            };
            animate();
        }

        return () => clearInterval(interval);
    }, [text, isInView, animateOnLoad]);

    return <span ref={ref}>{displayText}</span>;
}
