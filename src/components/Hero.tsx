'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

// Reusable Decrypt Component
const TextDecrypt = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isInView) {
            let iteration = 0;
            const animate = () => {
                interval = setInterval(() => {
                    setDisplayText(prev =>
                        text.split("").map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        }).join("")
                    );

                    if (iteration >= text.length) {
                        clearInterval(interval);
                    }

                    iteration += 1 / 3;
                }, 30);
            };
            animate();
        }

        return () => clearInterval(interval);
    }, [text, isInView]);

    return <span ref={ref}>{displayText}</span>;
}

const ThreeDScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />



                <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
                    <mesh position={[5, -2, -3]} rotation={[1, 0.5, 0]}>
                        <icosahedronGeometry args={[1.5, 0]} />
                        <meshStandardMaterial color="#FFD700" wireframe opacity={0.15} transparent />
                    </mesh>
                </Float>
            </Canvas>
        </div>
    );
};

export default function Hero() {
    // Rotating Roles Logic
    const roles = [
        "SIH Winner 2025 🏆",
        "Full Stack Architect",
        "AI/ML Engineer",
        "Creative Developer"
    ];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000); // Change role every 3 seconds
        return () => clearInterval(interval);
    }, []);

    // Stagger animation variants
    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3
            }
        }
    };

    const letterAnimation = {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        }
    };

    // Mouse move effect for background
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--primary-bg)] py-20 pb-32 group"
            onMouseMove={handleMouseMove}
        >

            {/* Background Image Restored */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/image.png"
                    alt="Background"
                    fill
                    className="object-cover object-top opacity-30 mix-blend-overlay"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-bg)] via-[var(--primary-bg)]/80 to-[var(--primary-bg)]/40"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* 3D Background Elements */}
            <ThreeDScene />

            {/* Background Texture & Grain */}
            <div className="grain-overlay" />

            {/* Interactive Mouse Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10 mix-blend-screen"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 215, 0, 0.08),
                            transparent 80%
                        )
                    `,
                }}
            />



            <div className="container mx-auto px-4 text-center z-10 relative flex flex-col items-center justify-center min-h-[inherit]">



                {/* Massive Name Reveal */}
                <motion.div
                    variants={letterContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false }}
                    className="overflow-hidden mb-6"
                >
                    <h1 className="flex flex-col items-center justify-center text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 leading-[0.9] drop-shadow-2xl">
                        <div className="whitespace-nowrap">
                            {"RAJESWAR".split("").map((char, index) => (
                                <motion.span key={index} variants={letterAnimation} className="inline-block hover:text-[var(--accent-color)] transition-colors duration-300">
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                        <div className="whitespace-nowrap mt-2 md:mt-0">
                            {"CHARAPALLI".split("").map((char, index) => (
                                <motion.span key={index} variants={letterAnimation} className="inline-block hover:text-[var(--accent-color)] transition-colors duration-300">
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </h1>
                </motion.div>

                {/* Subtext / Roles with Decrypt Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mb-12"
                >
                    <div className="text-xl md:text-2xl text-[var(--secondary-text)] font-light tracking-wide h-8 flex justify-center items-center">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentRoleIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-[var(--accent-color)] font-mono drop-shadow-md">
                                    <TextDecrypt text={roles[currentRoleIndex]} />
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <Link href="#projects" className="group relative px-8 py-4 bg-[var(--accent-color)] text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)]">
                        <span className="relative z-10 flex items-center gap-2">
                            View Work
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>

                    <Link href="#contact" className="group px-8 py-4 bg-black/40 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md shadow-lg">
                        Contact Me
                    </Link>
                </motion.div>

                {/* Socials - NOW IN FLOW (Not Absolute) */}
                <motion.div
                    className="flex justify-center gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    {[
                        { icon: Linkedin, href: "https://linkedin.com/in/rajeswarcharapalli" },
                        { icon: Github, href: "https://github.com/Rajj-c" },
                        { icon: Mail, href: "mailto:rajeswarcharapalli@gmail.com" }
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-[var(--accent-color)] hover:-translate-y-1 transition-all duration-300 drop-shadow-md p-2"
                        >
                            <item.icon size={28} />
                        </a>
                    ))}
                </motion.div>

            </div>

            {/* Bottom Right Floating Card from Uiverse */}
            <div className="absolute overflow-visible bottom-4 right-4 md:bottom-12 md:right-12 z-50 scale-[0.7] md:scale-100 origin-bottom-right">
                <div tabIndex={0} className="relative duration-300 transition-transform [transform:rotate3d(1_,-1,_1,_60deg)] hover:[transform:rotate3d(1_,-1,_1,_0deg)] focus:[transform:rotate3d(1_,-1,_1,_0deg)] active:[transform:rotate3d(1_,-1,_1,_0deg)] focus-within:[transform:rotate3d(1_,-1,_1,_0deg)] group border border-sky-900 border-4 overflow-hidden rounded-2xl h-52 w-72 bg-sky-800 p-5 flex flex-col items-start gap-4 shadow-2xl cursor-pointer">
                    <div className="text-gray-50 z-20 relative">
                        <span className="font-bold text-5xl">RAJ</span>
                        <p className="text-xs">Software Engineer</p>
                    </div>
                    {/* Trigger for the Resume Modal */}
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.innerWidth < 768) {
                                setTimeout(() => setIsResumeModalOpen(true), 400);
                            } else {
                                setIsResumeModalOpen(true);
                            }
                        }}
                        className="duration-300 hover:bg-sky-900 border hover:text-gray-50 bg-gray-50 font-semibold cursor-pointer text-sky-800 px-3 py-2 flex flex-row items-center gap-3 relative z-20 rounded-md pointer-events-auto"
                    >
                        View Resume 
                        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="w-6 h-6 fill-current">
                            <path fillRule="evenodd" d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z"></path>
                        </svg>
                    </button>

                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 duration-500 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2 fill-gray-50 stroke-sky-900"><path strokeWidth="5" strokeMiterlimit="10" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" data-name="layer1"></path></svg>
                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 duration-200 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2 fill-gray-50 stroke-sky-700"><path strokeWidth="2" strokeMiterlimit="10" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" data-name="layer1"></path></svg>
                </div>
            </div>

            {/* Resume Heads-Up Modal */}
            <AnimatePresence>
                {isResumeModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsResumeModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                        />
                        
                        {/* Modal Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col items-center text-center relative z-10">
                                {/* Warning Icon */}
                                <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-6 border border-[#FFD700]/20">
                                    <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                                    </svg>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-2 relative pb-2">
                                    Just a Heads Up! 🎓
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FFD700] rounded-full" />
                                </h3>

                                {/* Subtitle */}
                                <p className="text-gray-300 mt-6 mb-8 text-lg">
                                    I'm currently a <span className="font-bold text-white tracking-wide">B.Tech 3rd Year Student</span>.
                                </p>

                                {/* Quote Box */}
                                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-sm text-gray-400 italic font-light leading-relaxed">
                                    "My journey is still unfolding. What you're about to see is a snapshot of my growth, not the final destination. Thanks for checking it out!"
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 w-full">
                                    <button 
                                        onClick={() => setIsResumeModalOpen(false)}
                                        className="flex-1 py-3 px-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <a 
                                        href="https://drive.google.com/file/d/171r1Xac3pCxE1UbIiep9yhefYsGzC0Va/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsResumeModalOpen(false)}
                                        className="flex-1 py-3 px-4 rounded-xl bg-[#FFD700] text-black font-bold hover:bg-[#FFD700]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        View Resume
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
