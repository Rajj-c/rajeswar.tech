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
                        { icon: Mail, href: "mailto:rajeshwarcn@gmail.com" }
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
        </section>
    );
}
