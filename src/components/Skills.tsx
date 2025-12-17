'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code, Database, Terminal, Cpu, Brain, ChartSpline } from 'lucide-react';
import { MouseEvent } from 'react';

function SpotlightCard({ children, index }: { children: React.ReactNode; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className="group relative border border-white/10 bg-[var(--secondary-bg)]/50 rounded-xl overflow-hidden"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: false }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 215, 0, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
}

export default function Skills() {
    const skills = [
        { name: "Web Development", desc: "HTML, CSS, JavaScript, React", icon: <Code size={40} /> },
        { name: "Python", desc: "Beginner level, Learning for Web Development", icon: <Terminal size={40} /> },
        { name: "SQL", desc: "Database management and queries", icon: <Database size={40} /> },
        { name: "Java", desc: "Basic knowledge", icon: <Code size={40} /> },
        { name: "Generative AI", desc: "Google Gen AI, Gemini, Imagen", icon: <Brain size={40} /> },
        { name: "Deep Learning", desc: "Neural Networks, Computer Vision", icon: <Cpu size={40} /> },
        { name: "Operating Systems", desc: "Linux, Windows, OS Concepts", icon: <Terminal size={40} /> },
        { name: "NLP", desc: "Text Analysis, Transformers", icon: <ChartSpline size={40} /> },
    ];

    return (
        <section id="skills" className="py-24 bg-[var(--primary-bg)] text-secondary-text relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[var(--accent-color)] rounded-full blur-[120px] opacity-5"></div>

            <div className="container mx-auto px-4">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4"> Technical Arsenal </h2>
                    <p className="text-[var(--secondary-text)] max-w-2xl mx-auto">
                        Tools and technologies I use to build independent AI systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <SpotlightCard key={index} index={index}>
                            <div className="p-8 h-full flex flex-col items-center text-center relative z-10">
                                <div className="p-4 rounded-full bg-white/5 mb-6 text-[var(--accent-color)] group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-[var(--accent-color)]/30 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{skill.desc}</p>
                            </div>
                        </SpotlightCard>
                    ))}
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
