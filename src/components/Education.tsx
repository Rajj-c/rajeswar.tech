'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, School, BookOpen } from 'lucide-react';

const educationData = [
    {
        id: 3,
        title: "Matriculation (10th)",
        institution: "Narayana School",
        location: "Andhra Pradesh",
        year: "2020 - 2021",
        grade: "98.5%",
        icon: <BookOpen size={24} />,
        color: "#CD7F32", // Bronze / Orange
        desktopTop: "25%",
        desktopLeft: "15%",
        mobileTop: "28%",
        mobileLeft: "10%",
        align: "left" as const,
        revealProgress: 0.2,
    },
    {
        id: 2,
        title: "Intermediate (11th & 12th)",
        institution: "Narayana Junior College",
        location: "Andhra Pradesh",
        year: "2021 - 2023",
        grade: "89.4%",
        icon: <School size={24} />,
        color: "#4A90E2", // Blue 
        desktopTop: "55%",
        desktopLeft: "85%",
        mobileTop: "54%",
        mobileLeft: "90%",
        align: "right" as const,
        revealProgress: 0.5,
    },
    {
        id: 1,
        title: "B.Tech Computer Science",
        institution: "Kalasalingam University",
        location: "Tamil Nadu",
        year: "2023 - 2027",
        grade: "CGPA: 7.5",
        icon: <GraduationCap size={24} />,
        color: "#FFD700", // Gold
        desktopTop: "85%",
        desktopLeft: "15%",
        mobileTop: "80%",
        mobileLeft: "10%",
        align: "left" as const,
        revealProgress: 0.8,
    }
];

// Desktop Path: Wide S-curve mathematically smoothed to have vertical tangents exactly at 25%, 55%, and 85%
const DESKTOP_PATH = "M 50 0 L 50 5 C 50 15, 15 15, 15 25 C 15 40, 85 40, 85 55 C 85 70, 15 70, 15 85 C 15 95, 50 95, 50 100";
// Mobile Path: Zig-zag that stays closer to the edges, spread out vertically for less congestion and starting below header
const MOBILE_PATH = "M 50 12 L 50 18 C 50 22, 10 22, 10 28 C 10 40, 90 40, 90 54 C 90 66, 10 66, 10 80 C 10 88, 50 88, 50 100";

function DesktopNode({ edu, progress, isMobile }: { edu: any, progress: any, isMobile: boolean }) {
    const isLeft = isMobile ? (edu.align === 'left' ? 'left' : 'right') : edu.align;
    const topPos = isMobile ? edu.mobileTop : edu.desktopTop;
    const leftPos = isMobile ? edu.mobileLeft : edu.desktopLeft;

    // Fades and scales in as the drawn path reaches it. Smoother entrance threshold.
    const opacity = useTransform(progress, [edu.revealProgress - 0.15, edu.revealProgress + 0.05], [0, 1]);
    const scale = useTransform(progress, [edu.revealProgress - 0.15, edu.revealProgress + 0.05], [0.8, 1]);
    const yOffset = useTransform(progress, [edu.revealProgress - 0.15, edu.revealProgress + 0.05], [20, 0]);

    // The icon glow should pulse gently once revealed
    const iconGlow = `0 0 25px ${edu.color}40, inset 0 0 10px ${edu.color}20`;

    return (
        <div style={{ top: topPos, left: leftPos }} className="absolute -translate-y-1/2 group z-20">
            {/* Glowing Icon sits directly on the path node */}
            <motion.div
                className={`${isMobile ? 'w-10 h-10 rounded-[10px]' : 'w-16 h-16 rounded-[14px]'} bg-[#050505] rotate-45 absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-white/10`}
                style={{
                    // borderColor: edu.color, 
                    color: edu.color,
                    boxShadow: iconGlow,
                    opacity,
                    scale
                }}
            >
                {/* Un-rotate the icon child */}
                <div className="-rotate-45 drop-shadow-[0_0_8px_currentColor]">
                    {isMobile ?
                        <div className="scale-75">{edu.icon}</div> :
                        edu.icon
                    }
                </div>
            </motion.div>

            {/* Glassmorphism Detail Card */}
            <motion.div
                className={`absolute top-1/2 -translate-y-1/2 ${isMobile ? 'w-[75vw]' : 'w-[380px]'} ${isLeft === 'left' ? (isMobile ? 'left-6' : 'left-16') : (isMobile ? 'right-6' : 'right-16')}`}
                style={{ opacity, scale, y: yOffset }}
            >
                <div className={`bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 ${isMobile ? 'p-4 rounded-xl' : 'p-6 rounded-2xl'} shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-[#111111]/90 cursor-default`}>

                    {/* Subtle internal gradient matching stroke color */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-[0.15] pointer-events-none" style={{ backgroundColor: edu.color }} />
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full blur-[60px] opacity-[0.1] pointer-events-none" style={{ backgroundColor: edu.color }} />

                    {/* Content */}
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 shadow-inner">
                            {edu.year}
                        </span>
                        <span className="text-sm font-bold tracking-wider drop-shadow-md" style={{ color: edu.color }}>
                            {edu.grade}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 leading-snug relative z-10 drop-shadow-md">
                        {edu.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-medium tracking-wide mb-1 transition-colors relative z-10">
                        {edu.institution}
                    </p>
                    <p className="text-xs text-gray-500 relative z-10">{edu.location}</p>
                </div>
            </motion.div>
        </div>
    );
}

export default function Education() {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Extremely smooth and responsive spring for drawing the path quickly
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

    return (
        <section id="education" className="relative bg-[#020202] w-full flex flex-col pt-10">

            {/* ------------------------------------------- */}
            {/* RESPONSIVE VIEW (Glowing Winding Road)      */}
            {/* ------------------------------------------- */}
            <div ref={containerRef} className="relative h-[400vh] w-full">

                {/* Sticky scrolling viewport */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                    {/* Background noise and radial gradients for depth */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-black pointer-events-none" />
                    <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-[#CD7F32] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-[#FFD700] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

                    {/* Header Overlay */}
                    <div className="absolute top-[5%] md:top-[8%] left-0 w-full text-center z-50 pointer-events-none px-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                                Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#FFD700]">Ascent</span>
                            </h2>
                            <p className="text-sm md:text-lg text-[var(--secondary-text)] max-w-lg mx-auto font-light bg-black/30 backdrop-blur-md py-2 px-6 rounded-full border border-white/5 inline-block shadow-lg">
                                The foundation of my engineering journey.
                            </p>
                        </motion.div>
                    </div>

                    {/* SVG Constrained Wrapper */}
                    <div className={`relative w-full max-w-6xl mt-24 ${isMobile ? 'h-[100vh] min-h-[800px]' : 'h-[75vh] min-h-[600px]'}`}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 drop-shadow-2xl overflow-visible">
                            <defs>
                                <linearGradient id="road-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#CD7F32" />
                                    <stop offset="50%" stopColor="#4A90E2" />
                                    <stop offset="100%" stopColor="#FFD700" />
                                </linearGradient>
                            </defs>

                            {/* Base Wide Road */}
                            <path
                                d={isMobile ? MOBILE_PATH : DESKTOP_PATH}
                                fill="none"
                                stroke="#111111"
                                strokeWidth={isMobile ? "12" : "8"}
                                strokeLinecap="round"
                                className="drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                            />
                            {/* Subtle Core Background Line */}
                            <path
                                d={isMobile ? MOBILE_PATH : DESKTOP_PATH}
                                fill="none"
                                stroke="rgba(255,255,255,0.02)"
                                strokeWidth="1"
                                strokeLinecap="round"
                            />

                            {/* Animated Glowing Gradient Path -> Draws backwards along the scroll! */}
                            {/* We stroke the thick blurred glow, then a sharp core on top. */}
                            <motion.path
                                d={isMobile ? MOBILE_PATH : DESKTOP_PATH}
                                fill="none"
                                stroke="url(#road-gradient)"
                                strokeWidth={isMobile ? "4" : "2"}
                                strokeLinecap="round"
                                style={{ pathLength: smoothProgress, filter: 'drop-shadow(0 0 10px rgba(74, 144, 226, 0.4))' }}
                            />
                            {/* Sharp Neon Centerline */}
                            <motion.path
                                d={isMobile ? MOBILE_PATH : DESKTOP_PATH}
                                fill="none"
                                stroke="url(#road-gradient)"
                                strokeWidth={isMobile ? "1" : "0.5"}
                                strokeLinecap="round"
                                style={{ pathLength: smoothProgress, filter: 'brightness(1.5)' }}
                            />
                        </svg>

                        {/* Nodes and HTML Cards Overlay */}
                        {educationData.map((edu) => (
                            <DesktopNode key={edu.id} edu={edu} progress={smoothProgress} isMobile={isMobile} />
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
