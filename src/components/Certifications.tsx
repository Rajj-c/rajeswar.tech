'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Award, FileSearch, AppWindow, Database, Code, Terminal, Trophy } from 'lucide-react';
import { MouseEvent } from 'react';

function SpotlightCard({ children, index, color }: { children: React.ReactNode; index: number; color: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className="group relative border border-white/10 bg-[var(--secondary-bg)] rounded-xl overflow-hidden h-full"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: false }}
            whileHover={{ y: -5 }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color}20,
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full flex flex-col">{children}</div>
        </motion.div>
    );
}

const certifications = [
    {
        title: "Prompt Design in Vertex AI",
        issuer: "Google",
        description: "Mastering prompt engineering for large language models on Google Cloud.",
        year: "2025",
        link: "https://www.cloudskillsboost.google/public_profiles/d5b78359-6588-4934-a234-896e474852aa/badges/16683589",
        icon: <Award size={28} className="text-white" />,
        color: "#4285F4"
    },
    {
        title: "Multimodal RAG with Gemini",
        issuer: "Google",
        description: "Building advanced Retrieval Augmented Generation systems using Gemini Pro Vision.",
        year: "2025",
        link: "https://www.cloudskillsboost.google/public_profiles/d5b78359-6588-4934-a234-896e474852aa/badges/16914883",
        icon: <FileSearch size={28} className="text-white" />,
        color: "#EA4335"
    },
    {
        title: "Generative AI Apps",
        issuer: "Google",
        description: "End-to-end development of GenAI applications using Imagen and Vertex AI.",
        year: "2025",
        link: "https://www.cloudskillsboost.google/public_profiles/d5b78359-6588-4934-a234-896e474852aa/badges/16691163",
        icon: <AppWindow size={28} className="text-white" />,
        color: "#FBBC04"
    },
    {
        title: "Python Bootcamp",
        issuer: "Lets Upgrade",
        description: "Comprehensive Python programming from data structures to algorithms.",
        year: "2025",
        link: "https://drive.google.com/file/d/14SjurUCc-bEysPcIqt29FBnmmHKTOLq7/view?usp=drive_link",
        icon: <Code size={28} className="text-white" />,
        color: "#306998"
    },
    {
        title: "Database Management",
        issuer: "Codechef",
        description: "Advanced SQL queries, normalization, and database optimization.",
        year: "2025",
        link: "https://drive.google.com/file/d/1ksOz7avh1TxrFpSnaYxtnMyX2KcBXWlg/view?usp=drive_link",
        icon: <Database size={28} className="text-white" />,
        color: "#E67E22"
    },
    {
        title: "Solve X AI",
        issuer: "Kalasalingam University",
        description: "AI Problem Solving Hackathon Participation.",
        year: "2025",
        link: "https://drive.google.com/file/d/1vYsjIOGAzwTWfucIxSR7U-2ApbbCcpaY/view",
        icon: <Trophy size={28} className="text-white" />,
        color: "#9B59B6"
    }
];

export default function Certifications() {
    return (
        <section id="certifications" className="py-24 bg-[var(--primary-bg)] border-t border-white/5 relative">
            {/* Background Blob */}
            <div className="absolute center fade-in opacity-5 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Certifications</h2>
                    <p className="text-[var(--secondary-text)]">Validating skills through official credentials.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <SpotlightCard key={index} index={index} color={cert.color}>
                            <div className="p-1 h-full flex flex-col">
                                {/* Top accent line */}
                                <div className="h-1 w-full rounded-t-xl opacity-80" style={{ backgroundColor: cert.color }}></div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white shadow-sm">
                                            {cert.icon}
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                            <span className="text-xs font-mono text-gray-400">{cert.year}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--accent-color)] transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm font-medium mb-3" style={{ color: cert.color }}>{cert.issuer}</p>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {cert.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-white/5">
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group/link"
                                        >
                                            Verify Credential <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-400 text-lg font-light tracking-wide animate-pulse">
                        &quot;Learning & Achieving More...&quot;
                    </p>
                </div>
            </div>
        </section>
    );
}
