'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface WorkModalProps {
    type: string | null;
    onClose: () => void;
}

function WorkModal({ type, onClose }: WorkModalProps) {
    if (!type) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-[var(--secondary-bg)] rounded-2xl p-8 max-w-2xl w-full relative border border-[var(--card-border-color)] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)] rounded-full opacity-5 blur-[80px] pointer-events-none"></div>

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
                    <X size={24} />
                </button>

                {type === 'google' && (
                    <div className="text-center relative z-10">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-6 drop-shadow-sm">Google Student Ambassador</h3>
                        <p className="text-lg text-[var(--primary-text)] mb-8 leading-relaxed">
                            Representing Google technologies on campus. Organizing workshops, hackathons, and fostering a developer culture.
                            <br /><br />
                            <span className="text-sm text-gray-400 italic">Official updates & event photos coming shortly!</span>
                        </p>
                        <button onClick={onClose} className="btn-primary py-2 px-8">Close</button>
                    </div>
                )}

                {type === 'ibm' && (
                    <div className="text-center relative z-10">
                        <h3 className="text-3xl font-bold text-[#4e84ff] mb-8">IBM Front-end Training</h3>
                        <div className="flex flex-col gap-4 max-w-md mx-auto">
                            <a href="https://drive.google.com/file/d/1e9qBYIbQXyL-kYCVvjxSQet58PFq0FFu/view?usp=drive_link" target="_blank" className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all hover:scale-[1.02] flex items-center justify-between group">
                                <span className="font-medium text-white flex items-center gap-3">
                                    📄 Offer Letter
                                </span>
                                <ExternalLink size={18} className="text-[var(--accent-color)] group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="https://drive.google.com/drive/folders/1vpgPv2kK8kKxtD9ji6O_KPsptT6wCapm?usp=drive_link" target="_blank" className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all hover:scale-[1.02] flex items-center justify-between group">
                                <span className="font-medium text-white flex items-center gap-3">
                                    🏆 Certificates
                                </span>
                                <ExternalLink size={18} className="text-[var(--accent-color)] group-hover:translate-x-1 transition-transform" />
                            </a>
                            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-2">
                                <p className="text-blue-200 text-sm">Status: Internship training in progress.</p>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    const [modalType, setModalType] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const experiences = [
        {
            id: "future",
            role: "Next Big Opportunity",
            company: "Future",
            date: "Open to Work",
            description: ["Open to exploring new challenges in Software Engineering, AI, and Web Development. Ready to build impactful solutions."],
            cta: "Hire Me",
            ctaLink: "#contact",
            isFuture: true
        },
        {
            id: "google",
            role: "Google Student Ambassador",
            company: "Google",
            date: "July 2025 - Present",
            description: [
                "Representing Google on campus and fostering a tech community.",
                "Organizing workshops and events to educate students on Google technologies.",
                "Acting as a liaison between students and Google to share feedback and resources."
            ],
            cta: "View Work",
            action: () => setModalType('google')
        },
        {
            id: "ibm",
            role: "Front-end Development Intern",
            company: "IBM",
            date: "Aug 2025 - Oct 2025",
            description: [
                "Participated in a 6-week internship program focused on front-end development.",
                "Designing responsive user interfaces with modern React paradigms.",
                "Collaborating with senior developer mentors on real-world capabilities."
            ],
            cta: "View Work",
            action: () => setModalType('ibm')
        }
    ];

    return (
        <section id="experience" className="py-24 bg-[var(--secondary-bg)] relative overflow-hidden">
            {/* Background Subtle Gradient */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-20"></div>

            <div className="container mx-auto px-4" ref={containerRef}>
                <motion.div
                    className="text-center mb-20 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Journey</h2>
                    <p className="text-[var(--secondary-text)]">Milestones that define my path.</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* The Living Timeline Line */}
                    <div className="absolute left-[39px] md:left-[50%] md:-ml-0.5 top-0 bottom-0 w-0.5 bg-gray-800/50"></div>
                    <motion.div
                        className="absolute left-[39px] md:left-[50%] md:-ml-0.5 top-0 w-0.5 bg-[var(--accent-color)] origin-top shadow-[0_0_10px_var(--accent-color)]"
                        style={{ height: "100%", scaleY }}
                    ></motion.div>

                    {experiences.map((exp, index) => (
                        <div key={exp.id} className={`mb-12 flex flex-col md:flex-row items-center w-full group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Spacer for Desktop (50% width) */}
                            <div className="hidden md:block w-1/2"></div>

                            {/* Timeline Node */}
                            <div className="absolute left-[30px] md:left-[50%] md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-[var(--primary-bg)] bg-gray-700 z-10 transition-colors duration-500 group-hover:bg-[var(--accent-color)] group-hover:scale-125 shadow-lg"></div>

                            {/* Content Card */}
                            <motion.div
                                className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12"
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <div className={`p-8 rounded-2xl bg-[var(--primary-bg)] border border-white/5 hover:border-[var(--accent-color)]/30 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group/card ${exp.isFuture ? 'border-dashed border-gray-700' : ''}`}>

                                    {/* Card Hover Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                                    <h3 className="text-xl font-bold text-white mb-1 relative z-10">{exp.role}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
                                        <span className={`text-[var(--accent-color)] font-bold tracking-wide ${exp.isFuture ? 'text-green-400' : ''}`}>{exp.company}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                        <span className="text-sm text-gray-400">{exp.date}</span>
                                    </div>

                                    <ul className="space-y-3 mb-8 relative z-10">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="text-sm text-gray-400 leading-relaxed flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent-color)] flex-shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="relative z-10">
                                        {exp.ctaLink ? (
                                            <a href={exp.ctaLink} className="btn-secondary inline-block py-2 px-6 text-sm">{exp.cta}</a>
                                        ) : (
                                            <button onClick={exp.action} className="text-sm font-bold text-[var(--accent-color)] flex items-center gap-2 hover:gap-3 transition-all">
                                                {exp.cta} <ExternalLink size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-400 text-lg font-light tracking-wide animate-pulse">
                        &quot;Learning & Earning More...&quot;
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {modalType && <WorkModal type={modalType} onClose={() => setModalType(null)} />}
            </AnimatePresence>
        </section>
    );
}
