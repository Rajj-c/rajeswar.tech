'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Code2, Calculator, Github, ArrowRight, Cpu, Trophy } from 'lucide-react';
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
            className="group relative border border-white/10 bg-[var(--secondary-bg)] rounded-2xl overflow-hidden h-full"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: false }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 215, 0, 0.10),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full flex flex-col">{children}</div>
        </motion.div>
    );
}

export default function Projects() {
    const projects = [
        {
            title: "KARE Calculator",
            description: "A specialized academic performance engine for Kalasalingam University students. Streamlines CGPA & SGPA computation with high precision and ease of use.",
            tags: ["HTML", "CSS", "JavaScript"],
            liveLink: "https://rajeshwar234.github.io/CGPA-SGPA-calculator/",
            gitLink: "https://github.com/Rajj-c/CGPA-SGPA-calculator.git",
            icon: <Calculator size={32} className="text-white" />,
            status: "Live"
        },
        {
            title: "Super Resolution GAN",
            description: "Deep Learning research project implementing Generative Adversarial Networks (SRGAN). Trains neural models to hallucinate realistic details and upscale low-resolution imagery.",
            tags: ["Python", "TensorFlow", "Deep Learning"],
            liveLink: null,
            gitLink: "https://github.com/Rajj-c/Super-Resolution-GAN-CN-.git",
            icon: <Cpu size={32} className="text-white" />,
            status: "Research"
        },
        {
            title: "Edupath Navigator",
            description: "🏆 National Winner of Smart India Hackathon 2025. An AI-first education platform delivering personalized career roadmaps and mentorship at scale.",
            tags: ["Next.js", "Generative AI", "SIH Winner"],
            liveLink: "https://sih-final-imps.vercel.app/en",
            gitLink: null,
            icon: <Trophy size={32} className="text-[var(--accent-color)]" />,
            status: "Live"
        }
    ];

    return (
        <section id="projects" className="py-24 bg-[var(--primary-bg)] relative">
            <div className="container mx-auto px-4">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
                    <p className="text-[var(--secondary-text)]">Engineering solutions for the real world.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <SpotlightCard key={index} index={index}>
                            {/* Card Content */}
                            <div className="p-8 flex flex-col h-full z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-[var(--accent-color)]">
                                        {project.icon}
                                    </div>
                                    <div className="flex gap-2">
                                        {project.status === "Live" && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                Live
                                            </span>
                                        )}
                                        {project.status === "Research" && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                                                Research
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 text-gray-300 rounded-md text-xs border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex gap-4">
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" className="flex-1 inline-flex justify-center items-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-[var(--accent-color)] hover:text-black transition-all text-sm font-bold text-white group/btn">
                                            Visit Site <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {project.gitLink && (
                                        <a href={project.gitLink} target="_blank" className="flex-1 inline-flex justify-center items-center gap-2 py-2 rounded-lg border border-white/10 hover:border-white hover:bg-white/5 transition-all text-sm font-medium text-gray-300 hover:text-white">
                                            Code <Github size={14} />
                                        </a>
                                    )}
                                </div>
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
