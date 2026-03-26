'use client';

import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Calculator, Github, Cpu, Trophy, X, GitPullRequest, Info } from 'lucide-react';
import { useRef, useState } from 'react';
import styles from './ui/ProjectsCarousel.module.css';
import modalStyles from './ui/ProjectModal.module.css';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    const projects = [
        {
            title: "Prompt Artifact Registry",
            description: "Full-stack MVP for managing AI prompts with versioning, artifact generation, and lineage tracking. Features approval workflows with role-based access, visual trace of artifact creation, and comprehensive audit logs.",
            tags: ["React", "FastAPI", "Supabase", "Python", "Vite"],
            liveLink: "https://prompt-artifact-registry-with-linea.vercel.app/login",
            gitLink: "https://github.com/Rajj-c/Prompt-Artifact-Registry-with-Lineage-and-Approvals.git",
            icon: <Code2 size={24} className="text-[var(--accent-color)]" />,
            status: "Live"
        },
        {
            title: "KARE Calculator",
            description: "A specialized academic performance engine for Kalasalingam University students. Streamlines CGPA & SGPA computation with high precision and ease of use.",
            tags: ["HTML", "CSS", "JavaScript"],
            liveLink: "https://rajeshwar234.github.io/CGPA-SGPA-calculator/",
            gitLink: "https://github.com/Rajj-c/CGPA-SGPA-calculator.git",
            icon: <Calculator size={24} className="text-[var(--accent-color)]" />,
            status: "Live"
        },
        {
            title: "Super Resolution GAN",
            description: "Deep Learning research project implementing Generative Adversarial Networks (SRGAN). Trains neural models to hallucinate realistic details and upscale low-resolution imagery.",
            tags: ["Python", "TensorFlow", "Deep Learning"],
            liveLink: null,
            gitLink: "https://github.com/Rajj-c/Super-Resolution-GAN-CN-.git",
            icon: <Cpu size={24} className="text-[var(--accent-color)]" />,
            status: "Research"
        },
        {
            title: "Edupath Navigator",
            description: "🏆 National Winner of Smart India Hackathon. An AI-first education platform delivering personalized career roadmaps and mentorship at scale.",
            tags: ["Next.js", "Generative AI", "SIH"],
            liveLink: "https://sih-final-imps.vercel.app/en",
            gitLink: null,
            icon: <Trophy size={24} className="text-[var(--accent-color)]" />,
            status: "Live"
        }
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBlob1 = useTransform(scrollYProgress, [0, 1], [-250, 250]);
    const yBlob2 = useTransform(scrollYProgress, [0, 1], [250, -250]);

    return (
        <section id="projects" ref={containerRef} className="py-24 bg-[var(--primary-bg)] relative overflow-x-hidden">
            {/* Parallax Background Blobs */}
            <motion.div
                style={{ y: yBlob1 }}
                className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                style={{ y: yBlob2 }}
                className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 overflow-hidden">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
                        <p className="text-[var(--secondary-text)]">Engineering solutions for the real world.</p>
                    </motion.div>
                </div>

                {/* 3D Infinite Rotating Carousel */}
                <div className={styles.wrapper}>
                    <div
                        className={styles.inner}
                        style={{ '--quantity': projects.length } as React.CSSProperties}
                    >
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedProject(project)}
                                className={`${styles.card} cursor-pointer group hover:border-[var(--accent-color)] transition-all`}
                                style={{ '--index': index + 1 } as React.CSSProperties}
                            >
                                <div className="p-6 md:p-8 flex flex-col h-full z-10 bg-gradient-to-b from-white/5 to-transparent flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:scale-110 transition-transform">
                                            {project.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-center text-sm font-medium text-gray-300 group-hover:bg-[var(--accent-color)] group-hover:text-black transition-colors flex items-center justify-center gap-2">
                                        <Info size={16} /> Click for Details
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 md:mt-20 text-center">
                    <p className="text-gray-400 text-sm md:text-lg font-light tracking-wide animate-pulse">
                        &quot;Learning & Earning More...&quot;
                    </p>
                </div>
            </div>

            {/* Modal Overlay using AnimatePresence */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={modalStyles.cardContainer}
                            onClick={(e) => e.stopPropagation()} /* Prevent close on modal click */
                        >
                            <div className={modalStyles.cardBorder}></div>
                            <div className={modalStyles.card}>
                                <div className={modalStyles.header}>
                                    <div className={modalStyles.topHeader}>
                                        <div className={modalStyles.ghIcon}>
                                            <Github />
                                        </div>
                                        <div className={modalStyles.repo}>
                                            <span className={modalStyles.repoName}>{selectedProject.title}</span>
                                        </div>
                                        <div className={modalStyles.space}></div>
                                        <div className={modalStyles.icon} onClick={() => setSelectedProject(null)}>
                                            <X size={20} />
                                        </div>
                                    </div>
                                    <div className={modalStyles.btmHeader}>
                                        <div className={`${modalStyles.tab} ${modalStyles.active}`}>
                                            <GitPullRequest size={16} /> Overview
                                        </div>
                                    </div>
                                </div>

                                <div className={modalStyles.content}>
                                    <div className={modalStyles.prs}>
                                        <div className={modalStyles.pr}>
                                            <div className="flex justify-between items-start">
                                                <div className={modalStyles.prTitle}>
                                                    Project Description
                                                </div>
                                                <div className="flex gap-2">
                                                    {selectedProject.status === "Live" && (
                                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
                                                        </span>
                                                    )}
                                                    {selectedProject.status === "Research" && (
                                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                                                            Research
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={modalStyles.prDesc}>
                                                {selectedProject.description}
                                            </div>

                                            <div className={modalStyles.tagsRow}>
                                                {selectedProject.tags.map((tag: string) => (
                                                    <span key={tag} className={modalStyles.tag}>{tag}</span>
                                                ))}
                                            </div>

                                            <div className={modalStyles.actionRow}>
                                                {selectedProject.liveLink && (
                                                    <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className={modalStyles.actionBtn}>
                                                        <ExternalLink size={14} /> Visit Live Site
                                                    </a>
                                                )}
                                                {selectedProject.gitLink && (
                                                    <a href={selectedProject.gitLink} target="_blank" rel="noreferrer" className={modalStyles.actionBtn}>
                                                        <Github size={14} /> View Source Code
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Animated Background Gradients from provided CSS */}
                            <div className={modalStyles.spin}>
                                <div className={modalStyles.spinBlur}></div>
                                <div className={modalStyles.spinIntense}></div>
                                <div className={modalStyles.spinInside}></div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
