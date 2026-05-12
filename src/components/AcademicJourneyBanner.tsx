'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    GraduationCap, Code2, Briefcase, Award,
    ArrowRight, Star, BookOpen,
} from 'lucide-react';

const highlights = [
    { icon: <GraduationCap size={16} />, label: 'B.Tech CSE @ MVIT', color: '#4A90E2' },
    { icon: <Briefcase size={16} />, label: 'IBM Intern', color: '#A855F7' },
    { icon: <Code2 size={16} />, label: '4+ Projects Shipped', color: '#10B981' },
    { icon: <Award size={16} />, label: '5+ Certifications', color: '#FFD700' },
    { icon: <Star size={16} />, label: 'SIH 2025 Winner', color: '#F97316' },
    { icon: <BookOpen size={16} />, label: 'Google Ambassador', color: '#06B6D4' },
];

export default function AcademicJourneyBanner() {
    return (
        <section className="py-24 bg-[var(--primary-bg)] relative overflow-hidden border-t border-white/5">
            {/* Subtle bg glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div
                    className="relative rounded-3xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#0a0a1a] via-[var(--secondary-bg)] to-[#0a0a1a] p-10 md:p-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: false }}
                >
                    {/* Top shimmer */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                    {/* Bottom shimmer */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

                    {/* Corner accent dots */}
                    <div className="absolute top-5 left-5 w-2 h-2 rounded-full bg-blue-400/40" />
                    <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-purple-400/40" />
                    <div className="absolute bottom-5 left-5 w-2 h-2 rounded-full bg-emerald-400/40" />
                    <div className="absolute bottom-5 right-5 w-2 h-2 rounded-full bg-yellow-400/40" />

                    <div className="flex flex-col lg:flex-row items-center gap-10">

                        {/* Left: Text */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <BookOpen size={12} />
                                Beyond the freelance work
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                                Curious about the{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                                    person behind the code?
                                </span>
                            </h2>

                            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                                My academic journey, professional experience, full project portfolio,
                                technical skills, and certifications — all in one place.
                                From classroom to hackathon stage to production.
                            </p>

                            {/* Highlight chips */}
                            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-8">
                                {highlights.map((h) => (
                                    <motion.div
                                        key={h.label}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/4 border border-white/8 rounded-full text-xs font-medium text-gray-300 hover:border-white/20 transition-colors cursor-default"
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span style={{ color: h.color }}>{h.icon}</span>
                                        {h.label}
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                            >
                                <GraduationCap size={18} />
                                View Academic Journey
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-300" />
                            </Link>
                        </div>

                        {/* Right: Floating cards visual */}
                        <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 w-56">
                            {[
                                { title: 'Education', sub: 'Academic Ascent', color: '#4A90E2', emoji: '🎓' },
                                { title: 'Experience', sub: 'Professional Journey', color: '#A855F7', emoji: '💼' },
                                { title: 'Projects', sub: 'Selected Works', color: '#10B981', emoji: '🚀' },
                                { title: 'Skills', sub: 'Technical Arsenal', color: '#FFD700', emoji: '⚡' },
                            ].map((card, i) => (
                                <motion.div
                                    key={card.title}
                                    className="flex items-center gap-3 px-4 py-3 bg-[var(--primary-bg)] border border-white/8 rounded-xl group hover:border-white/20 transition-all duration-300"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                                    viewport={{ once: false }}
                                    whileHover={{ x: -4 }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 border border-white/8"
                                        style={{ backgroundColor: `${card.color}18` }}
                                    >
                                        {card.emoji}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">{card.title}</p>
                                        <p className="text-[10px] text-gray-600">{card.sub}</p>
                                    </div>
                                    <ArrowRight size={12} className="ml-auto text-gray-700 group-hover:text-gray-400 transition-colors" />
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
