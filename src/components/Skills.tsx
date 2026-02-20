'use client';

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, useInView } from 'framer-motion';
import { Code, Database, Terminal, Cpu, Brain, ChartSpline } from 'lucide-react';
import { MouseEvent, useRef } from 'react';

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
        { name: "Web Development", desc: "HTML, CSS, JavaScript, React", icon: <Code size={32} />, level: 90 },
        { name: "Python", desc: "Backend algorithms and data", icon: <Terminal size={32} />, level: 75 },
        { name: "SQL", desc: "Database management and queries", icon: <Database size={32} />, level: 80 },
        { name: "Java", desc: "Object-oriented programming", icon: <Code size={32} />, level: 70 },
        { name: "Generative AI", desc: "Google Gen AI, Gemini, Imagen", icon: <Brain size={32} />, level: 95 },
        { name: "Deep Learning", desc: "Neural Networks, Computer Vision", icon: <Cpu size={32} />, level: 85 },
        { name: "Operating Systems", desc: "Linux, Windows, OS Concepts", icon: <Terminal size={32} />, level: 80 },
        { name: "NLP", desc: "Text Analysis, Transformers", icon: <ChartSpline size={32} />, level: 85 },
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax background blob
    const yBlob = useTransform(scrollYProgress, [0, 1], [-200, 200]);

    return (
        <section id="skills" ref={containerRef} className="py-24 bg-[var(--primary-bg)] text-secondary-text relative overflow-hidden">
            {/* Parallax Background Blob */}
            <motion.div
                style={{ y: yBlob }}
                className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[var(--accent-color)] rounded-full blur-[150px] opacity-10 pointer-events-none"
            />

            <div className="container mx-auto px-4 relative z-10">

                {/* Text Reveal Header */}
                <div className="text-center mb-16 overflow-hidden">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4"> Technical Arsenal </h2>
                        <p className="text-[var(--secondary-text)] max-w-2xl mx-auto">
                            Tools and technologies I use to build independent AI systems.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <SpotlightCard key={index} index={index}>
                            <div className="p-8 h-full flex flex-col items-center text-center relative z-10">

                                {/* Circular Progress Animation wrapper */}
                                <div className="relative w-24 h-24 mb-6 flex items-center justify-center">

                                    {/* SVG Progress Ring */}
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                        {/* Background Track */}
                                        <circle
                                            cx="50" cy="50" r="46"
                                            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"
                                        />
                                        {/* Animated Fill */}
                                        <motion.circle
                                            cx="50" cy="50" r="46"
                                            fill="none" stroke="var(--accent-color)" strokeWidth="6" strokeLinecap="round"
                                            initial={{ strokeDasharray: 289, strokeDashoffset: 289 }}
                                            whileInView={{ strokeDashoffset: 289 - (289 * skill.level) / 100 }}
                                            transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            style={{ filter: 'drop-shadow(0 0 6px var(--accent-color))' }}
                                        />
                                    </svg>

                                    {/* Floating Icon inside the ring */}
                                    <motion.div
                                        className="text-white drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--accent-color)]"
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.2,
                                        }}
                                    >
                                        {skill.icon}
                                    </motion.div>

                                    {/* Center Percentage Hover Reveal element (Optional specific touch) */}
                                    {/* We keep it clean and just rely on the ring visually */}
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
