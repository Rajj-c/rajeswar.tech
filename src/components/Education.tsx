'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, BookOpen } from 'lucide-react';

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const educationData = [
        {
            id: 1,
            title: "B.Tech Computer Science",
            institution: "Kalasalingam University",
            location: "Tamil Nadu",
            year: "2023 - 2027",
            grade: "CGPA: 7.42",
            icon: <GraduationCap size={24} />,
            color: "#FFD700" // Gold
        },
        {
            id: 2,
            title: "Intermediate (11th & 12th)",
            institution: "Narayana Junior College",
            location: "Andhra Pradesh",
            year: "2021 - 2023",
            grade: "89.4%",
            icon: <School size={24} />,
            color: "#A3A3A3" // Silver/Gray
        },
        {
            id: 3,
            title: "Matriculation (10th)",
            institution: "Narayana School",
            location: "Andhra Pradesh",
            year: "2020 - 2021",
            grade: "98.5%",
            icon: <BookOpen size={24} />,
            color: "#CD7F32" // Bronze
        }
    ];

    return (
        <section id="education" className="py-24 bg-[var(--primary-bg)] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--secondary-bg),_transparent_70%)] opacity-50"></div>

            <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Academic Ascent</h2>
                    <p className="text-[var(--secondary-text)]">The foundation of my engineering journey.</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* The Path Line Background */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full"></div>

                    {/* The Drawing Line */}
                    <motion.div
                        className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-[var(--accent-color)] via-purple-500 to-blue-500 md:-translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_var(--accent-color)]"
                        style={{ height: "100%", scaleY }}
                    ></motion.div>

                    {educationData.map((edu, index) => (
                        <div key={edu.id} className={`relative mb-16 flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Desktop Spacer */}
                            <div className="hidden md:block w-1/2"></div>

                            {/* Center Node */}
                            <div className="absolute left-[28px] md:left-1/2 transform -translate-x-1/2 z-20">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                                    viewport={{ once: false }}
                                    className="w-14 h-14 rounded-full bg-[var(--primary-bg)] border-4 border-[var(--secondary-bg)] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group relative"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <div style={{ color: edu.color }} className="relative z-10">
                                        {edu.icon}
                                    </div>

                                    {/* Pulse Effect */}
                                    <div className="absolute inset-0 rounded-full border border-[var(--accent-color)] opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
                                </motion.div>
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="bg-[var(--secondary-bg)]/80 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-[var(--accent-color)]/30 transition-colors duration-300 hover:shadow-lg group">

                                        {/* Connecting Line (Desktop) */}
                                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-[var(--accent-color)]/50 to-transparent ${index % 2 === 0 ? 'right-[-64px] scale-x-[-1]' : 'left-[-64px]'}`}></div>

                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded">{edu.year}</span>
                                            <span style={{ color: edu.color }} className="text-sm font-bold">{edu.grade}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--accent-color)] transition-colors">{edu.title}</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-1">{edu.institution}</p>
                                        <p className="text-xs text-gray-500">{edu.location}</p>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
