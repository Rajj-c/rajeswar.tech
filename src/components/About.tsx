'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Calendar, MapPin, Download } from 'lucide-react';
import ResumeModal from './ResumeModal';

import { TextDecrypt } from './ui/TextDecrypt';


// 3D Tilt Card Component
function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const [age, setAge] = useState('');
    const [showResumeModal, setShowResumeModal] = useState(false);

    const handleResumeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowResumeModal(true);
    };

    const confirmResume = () => {
        setShowResumeModal(false);
        window.open("https://drive.google.com/file/d/1NidOifn_ppMyBdD1XQuCgpWBoQHQA6ML/view?usp=drive_link", "_blank");
    };

    useEffect(() => {
        const birthDate = new Date('2005-04-23T12:30:00');
        const updateAge = () => {
            const now = new Date();
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();

            // Adjust for negative days
            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
            }

            // Adjust for negative months
            if (months < 0) {
                years--;
                months += 12;
            }

            setAge(`${years} years, ${months} months`);
        };

        updateAge();
        // Update age every hour to keep it current
        const interval = setInterval(updateAge, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="py-32 bg-[var(--primary-bg)] text-gray-300 relative overflow-hidden">
            <ResumeModal
                isOpen={showResumeModal}
                onClose={() => setShowResumeModal(false)}
                onConfirm={confirmResume}
            />
            {/* Background Decoration */}
            <div className="absolute top-[10%] right-[0] w-[600px] h-[600px] bg-[var(--accent-color)] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-24 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white pb-2">Behind the Code</h2>
                    <p className="text-[var(--secondary-text)]">Who I am and what drives me.</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-20">
                    {/* 3D Profile Image */}
                    <div className="mx-auto lg:mx-0 perspective-1000">
                        <TiltCard>
                            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                <Image
                                    src="/profile.jpg"
                                    alt="Profile"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 320px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                {/* Overlay Tech Text */}
                                <div className="absolute bottom-6 left-6 font-mono text-xs text-[var(--accent-color)]">
                                    <TextDecrypt text="Identity: RAJ" /> <br />
                                    <TextDecrypt text="Mode: LOCKED_IN" />
                                </div>
                            </div>

                            {/* Floating decorative elements behind */}
                            <div className="absolute -z-10 top-[-20px] left-[-20px] w-full h-full border border-[var(--accent-color)]/30 rounded-2xl transform translate-z-[-50px]"></div>
                        </TiltCard>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            className="space-y-6 text-[var(--secondary-text)] text-lg"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                        >
                            <p className="leading-relaxed">
                                I&apos;m a passionate <span className="text-white font-semibold">Computer Science Student</span> obsessed with the intersection of creativity and logic.
                            </p>
                            <p className="leading-relaxed">
                                Currently diving deep into <span className="text-[var(--accent-color)]"><TextDecrypt text="Generative AI" /></span> and building systems that solve real-world problems. My goal is simple: Create software that feels like magic.
                            </p>

                            <div className="border-l-4 border-[var(--accent-color)] pl-4 py-2 my-6 bg-white/5 rounded-r-lg">
                                <p className="text-gray-300 italic font-medium">
                                    &quot;Where you start doesn&apos;t matter, starting now does matter. And trusting yourself makes all the difference.&quot;
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4">
                                {["CSE Student", "SIH Winner", "Web Developer", "AI Researcher"].map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: false }}
                                        className="px-5 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:bg-white/10 hover:border-[var(--accent-color)] transition-colors cursor-default"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="pt-8">
                                <button
                                    onClick={handleResumeClick}
                                    className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                                >
                                    Download CV <Download size={18} />
                                </button>
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-6 bg-[var(--secondary-bg)]/50 border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2 text-[var(--accent-color)]">
                                    <Calendar size={20} />
                                    <span className="text-sm font-bold uppercase tracking-wider">Experience</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{age || '20+'} Years</p>
                                <p className="text-sm text-gray-500">Alive & Coding</p>
                            </div>
                            <div className="p-6 bg-[var(--secondary-bg)]/50 border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2 text-[var(--accent-color)]">
                                    <MapPin size={20} />
                                    <span className="text-sm font-bold uppercase tracking-wider">Location</span>
                                </div>
                                <p className="text-2xl font-bold text-white">Madurai</p>
                                <p className="text-sm text-gray-500">India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
