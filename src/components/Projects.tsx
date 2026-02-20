'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ExternalLink, Code2, Calculator, Github, ArrowRight, Cpu, Trophy } from 'lucide-react';
import { MouseEvent, useRef } from 'react';

function SpotlightCard({ children, index }: { children: React.ReactNode; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const rect = currentTarget.getBoundingClientRect();
        const mX = clientX - rect.left;
        const mY = clientY - rect.top;

        mouseX.set(mX);
        mouseY.set(mY);

        const width = rect.width;
        const height = rect.height;
        const xPct = mX / width - 0.5;
        const yPct = mY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative border border-white/10 bg-[var(--secondary-bg)] rounded-2xl overflow-hidden h-full perspective-1000 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,215,0,0.1)]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 transform translate-z-0"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 215, 0, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full flex flex-col transform translate-z-[20px]">{children}</div>
        </motion.div>
    );
}

export default function Projects() {
    const projects = [
        {
            title: "Prompt Artifact Registry",
            description: "Full-stack MVP for managing AI prompts with versioning, artifact generation, and lineage tracking. Features approval workflows with role-based access, visual trace of artifact creation, and comprehensive audit logs.",
            tags: ["React", "FastAPI", "Supabase", "Python", "Vite"],
            liveLink: "https://prompt-artifact-registry-with-linea.vercel.app/login",
            gitLink: "https://github.com/Rajj-c/Prompt-Artifact-Registry-with-Lineage-and-Approvals.git",
            icon: <Code2 size={32} className="text-white" />,
            status: "Live"
        },
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

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBlob1 = useTransform(scrollYProgress, [0, 1], [-250, 250]);
    const yBlob2 = useTransform(scrollYProgress, [0, 1], [250, -250]);

    return (
        <section id="projects" ref={containerRef} className="py-24 bg-[var(--primary-bg)] relative overflow-hidden">
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
                                        <a href={project.liveLink} target="_blank" className="flex-1 inline-flex justify-center items-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-[var(--accent-color)] hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-bold text-white group/btn">
                                            Visit Site <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                        </a>
                                    )}
                                    {project.gitLink && (
                                        <a href={project.gitLink} target="_blank" className="flex-1 inline-flex justify-center items-center gap-2 py-2 rounded-lg border border-white/10 hover:border-white hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-medium text-gray-300 hover:text-white group/btn">
                                            Code <Github size={14} className="transition-transform group-hover/btn:scale-110" />
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
