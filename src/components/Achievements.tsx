'use client';

import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import React, { useRef } from 'react';

export default function Achievements() {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const tiltX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
    const tiltY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // For spotlight
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);

        // For subtle tilt (range ~ -4 to 4 degrees)
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        tiltX.set(yPct * -8); // Tilt up/down
        tiltY.set(xPct * 8);  // Tilt left/right
    }

    function handleMouseLeave() {
        tiltX.set(0);
        tiltY.set(0);
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <section id="achievements" className="py-32 bg-[var(--secondary-bg)] text-secondary-text border-t border-gray-800 relative overflow-hidden">

            {/* Ambient Background Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`bg-particle-${i}`}
                    className="absolute bg-[var(--accent-color)] rounded-full opacity-20"
                    style={{
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Hall of Fame</h2>
                    <p className="text-[var(--secondary-text)]">Recognition of excellence and innovation.</p>
                </motion.div>

                <div className="flex justify-center perspective-[2000px]">
                    {/* The Levitating Trophy Card with Interactive Tilt */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX: tiltX,
                            rotateY: tiltY,
                            transformStyle: "preserve-3d"
                        }}
                        className="relative max-w-4xl w-full group cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        viewport={{ once: false }}
                    >
                        {/* Wrapper for the continuous floating animation so it doesn't fight with the initial/whileInView y transform */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full relative"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Glow Behind */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 blur-[80px] opacity-20"
                                animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.95, 1.05, 0.95] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            ></motion.div>

                            <div className="relative bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)] transition-colors duration-500 group-hover:border-yellow-500/40 group-hover:bg-black/60">

                                {/* Interactive Spotlight Glow */}
                                <motion.div
                                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: useMotionTemplate`
                                            radial-gradient(
                                                600px circle at ${mouseX}px ${mouseY}px,
                                                rgba(255, 215, 0, 0.15),
                                                transparent 80%
                                            )
                                        `
                                    }}
                                />

                                {/* Shiny Gradient Border Overlay */}
                                <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none"></div>

                                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10" style={{ transform: "translateZ(30px)" }}>
                                    {/* Icon Side */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,165,0,0.4)]">
                                            <Trophy size={64} className="text-white drop-shadow-md" />
                                        </div>
                                        <motion.div
                                            className="absolute -top-4 -right-4 bg-white text-black font-bold px-4 py-1 rounded-full text-sm shadow-lg border border-yellow-400"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            #1 Winner
                                        </motion.div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="text-center md:text-left flex-1" style={{ transform: "translateZ(40px)" }}>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-500 font-bold tracking-widest uppercase text-sm mb-3">
                                            <Sparkles size={16} />
                                            <span>National Level</span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">Smart India Hackathon 2025</h3>
                                        <p className="text-xl text-gray-300 mb-6 font-light">Champion of the india's biggest open innovation model.</p>

                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            Solved complex problems using cutting-edge Generative AI solutions. Outperforming thousands of teams nationwide through resilience, technical prowess, and innovative thinking.
                                        </p>

                                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                            {['Innovation', 'Problem Solving', 'Team Leadership', 'Gen AI'].map(tag => (
                                                <motion.span
                                                    key={tag}
                                                    className="px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-md text-sm font-medium cursor-default"
                                                    whileHover={{ y: -3, scale: 1.05, backgroundColor: "rgba(234, 179, 8, 0.2)" }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-400 text-lg font-light tracking-wide animate-pulse">
                        &quot;Learning & Earning More...&quot;
                    </p>
                </div>
            </div>
        </section>
    );
}