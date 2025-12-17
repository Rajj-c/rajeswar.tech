'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Lightbulb, Sparkles } from 'lucide-react';

export default function Achievements() {
    return (
        <section id="achievements" className="py-32 bg-[var(--secondary-bg)] text-secondary-text border-t border-gray-800 relative overflow-hidden">

            {/* Ambient Background Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
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

                <div className="flex justify-center perspective-1000">
                    {/* The Levitating Trophy Card */}
                    <motion.div
                        className="relative max-w-4xl w-full"
                        initial={{ opacity: 0, y: 50, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        viewport={{ once: false }}
                        animate={{
                            y: [0, -15, 0],
                        }}
                        // @ts-ignore - Framer motion type issue with transition inside animate
                        transition={{
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 blur-[80px] opacity-20 animate-pulse"></div>

                        <div className="relative bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)]">

                            {/* Shiny Gradient Border Overlay */}
                            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none"></div>

                            <div className="flex flex-col md:flex-row items-center gap-10">
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
                                <div className="text-center md:text-left flex-1">
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
                                            <span key={tag} className="px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-md text-sm font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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
