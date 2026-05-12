'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import {
    Layers, Cpu, ShoppingBag, Globe,
    Zap, Code2, Smartphone, Search,
    ArrowRight, MessageCircle, Trophy,
    ClipboardList, Paintbrush, Rocket, CheckCircle2,
    ExternalLink, Database, Bot, Lock, LayoutDashboard,
    CreditCard, Package, Bell, HeadphonesIcon, BarChart3, GitBranch, Sparkles,
    ShieldCheck, Store,
} from 'lucide-react';
import Link from 'next/link';

// ── Service cards ──────────────────────────────────────────────────────────────
const services = [
    {
        icon: <Globe size={30} />,
        title: 'Landing Pages & Portfolios',
        description: 'Pixel-perfect, blazing-fast sites that make a killer first impression. Perfect for startups, creators, and professionals.',
        tags: ['Next.js', 'Animations', 'SEO', 'Responsive'],
        color: '#4A90E2',
    },
    {
        icon: <Layers size={30} />,
        title: 'Full-Stack Web Apps',
        description: 'End-to-end development from database design to deployment. Scalable, secure, and production-ready out of the box.',
        tags: ['React', 'Node.js', 'Supabase', 'REST APIs'],
        color: '#FFD700',
    },
    {
        icon: <Cpu size={30} />,
        title: 'AI-Powered Applications',
        description: 'Supercharge your product with cutting-edge LLMs, RAG pipelines, and intelligent automation built right in.',
        tags: ['AI Integration', 'LangChain', 'RAG', 'Gen AI'],
        color: '#A855F7',
    },
    {
        icon: <ShoppingBag size={30} />,
        title: 'Business Solutions',
        description: 'Custom dashboards, e-commerce platforms, and admin panels tailored to your specific business workflows.',
        tags: ['E-commerce', 'Dashboards', 'Admin Panels', 'Auth'],
        color: '#10B981',
    },
];

// ── How I Work steps ───────────────────────────────────────────────────────────
const steps = [
    {
        number: '01',
        icon: <ClipboardList size={22} />,
        title: 'Discuss',
        description: 'We hop on a quick call or chat. I understand your goal, timeline, and budget — no jargon, no fluff.',
        color: '#4A90E2',
    },
    {
        number: '02',
        icon: <Paintbrush size={22} />,
        title: 'Design & Build',
        description: 'I design, develop, and keep you updated at every step. You get to review before anything is finalised.',
        color: '#FFD700',
    },
    {
        number: '03',
        icon: <Rocket size={22} />,
        title: 'Deliver & Launch',
        description: 'I deploy your product, hand over everything — source code, docs, domain setup — and stay for support.',
        color: '#10B981',
    },
];

// ── Trust stats ────────────────────────────────────────────────────────────────
const stats = [
    { value: '4+', label: 'Projects Shipped' },
    { value: '🏆', label: 'SIH Winner 2025' },
    { value: '<24h', label: 'Response Time' },
    { value: '100%', label: 'Client Satisfaction' },
];

// ── Promise chips ──────────────────────────────────────────────────────────────
const promises = [
    { icon: <Zap size={16} />, label: 'Fast Delivery' },
    { icon: <Code2 size={16} />, label: 'Clean Code' },
    { icon: <Smartphone size={16} />, label: 'Fully Responsive' },
    { icon: <Search size={16} />, label: 'SEO Optimised' },
    { icon: <CheckCircle2 size={16} />, label: 'Post-Launch Support' },
];

// ── Tech stack logos ──────────────────────────────────────────────────────────────
const techStack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Supabase', 'Tailwind', 'Generative AI'];

// ── What's included in every project ───────────────────────────────────────────
const inclusions = [
    { icon: <Database size={20} />,       title: 'Database Setup & Management',   desc: 'PostgreSQL, Supabase, or Firebase — structured, secured, and maintained.',  color: '#4A90E2' },
    { icon: <Bot size={20} />,            title: 'AI Chatbot Built-In',           desc: 'Personalized AI chatbot trained on your business — answers your users 24/7.',           color: '#A855F7' },
    { icon: <Lock size={20} />,           title: 'Authentication System',         desc: 'Google login, OTP, email/password — safe user access out of the box.',      color: '#F59E0B' },
    { icon: <LayoutDashboard size={20} />,title: 'Admin Dashboard',               desc: 'Full control panel to manage content, users, and site settings.',            color: '#10B981' },
    { icon: <Smartphone size={20} />,     title: 'Responsive on All Devices',     desc: 'Mobile-first design — looks perfect on phones, tablets, and desktops.',     color: '#06B6D4' },
    { icon: <Rocket size={20} />,         title: 'Free Deployment',               desc: 'Your site goes live on Vercel — you get a real URL on Day 1.',              color: '#FFD700' },
    { icon: <Search size={20} />,         title: 'SEO Optimization',              desc: 'Meta tags, sitemaps, Open Graph — built to rank on Google.',                color: '#84CC16' },
    { icon: <Bell size={20} />,           title: 'Email & Push Notifications',    desc: 'Keep your users engaged with smart, automated alerts.',                     color: '#F97316' },
    { icon: <CreditCard size={20} />,     title: 'Payment Integration',          desc: 'Razorpay (India) or Stripe — collect payments directly from your site.',    color: '#EC4899' },
    { icon: <Package size={20} />,        title: 'Full Source Code Handover',    desc: 'You own 100% of the code — no lock-in, no hidden fees.',                   color: '#8B5CF6' },
    { icon: <BarChart3 size={20} />,      title: 'Analytics Integration',        desc: 'Google Analytics or Plausible — know exactly how users interact.',          color: '#14B8A6' },
    { icon: <HeadphonesIcon size={20} />, title: '30-Day Post-Launch Support',   desc: 'Bug fixes, tweaks, and guidance — I stay with you after launch.',           color: '#F43F5E' },
];

// ── Live demo works ────────────────────────────────────────────────────────────
const demoWorks = [
    {
        title: 'Edupath Navigator',
        badge: '🏆 SIH Winner 2025',
        badgeColor: '#FFD700',
        description: 'AI-powered personalized career guidance platform that won Smart India Hackathon 2025. Built with Next.js, Generative AI, and multi-language support.',
        link: 'https://sih-final-imps.vercel.app/en',
        tags: ['Next.js', 'Gen AI', 'Multi-language', 'Full Stack'],
        gradient: 'from-yellow-500/20 via-orange-500/10 to-transparent',
        accentColor: '#FFD700',
        category: 'AI Education Platform',
    },
    {
        title: 'VoteWise Guide',
        badge: '🗳️ Civic Tech',
        badgeColor: '#4A90E2',
        description: 'AI-powered smart election guide that helps voters understand candidates, policies, and electoral processes with real-time information.',
        link: 'https://votewise-guide.vercel.app/',
        tags: ['Gen AI', 'React', 'Next.js', 'Chatbot'],
        gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
        accentColor: '#4A90E2',
        category: 'AI Civic Platform',
    },
    {
        title: 'AidConnect',
        badge: '❤️ Social Impact',
        badgeColor: '#10B981',
        description: 'Volunteer-NGO matching platform for crisis relief. Features skill-based matching algorithms, emergency response, and NGO dashboards.',
        link: 'https://aid-connect-five.vercel.app/',
        tags: ['React', 'Firebase', 'AI Matching', 'Dashboard'],
        gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        accentColor: '#10B981',
        category: 'Social Impact Platform',
    },
];

// ── Iso Cube Card ──────────────────────────────────────────────────────────────
interface IsoCubeCardProps {
    index: number;
    title: string;
    subtitle: string;
    faces: { c3: [string, string]; c6: [string, string]; c9: [string, string] };
}

function IsoCubeCard({ index, title, subtitle, faces }: IsoCubeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            viewport={{ once: false }}
            className="iso-card-wrapper"
        >
            {/* Particles */}
            <div className="iso-particles-container">
                {[...Array(8)].map((_, i) => <div key={i} className="iso-particle" />)}
            </div>

            <div className="iso-card">
                {/* Track 1 */}
                <div className="iso-track-wrapper-1">
                    <div className="iso-track-1"><div className="iso-line" /></div>
                </div>
                {/* Track 2 */}
                <div className="iso-track-wrapper-2">
                    <div className="iso-track-2">
                        <div className="iso-line"><div className="iso-dot" /></div>
                    </div>
                </div>

                {/* Cube grid */}
                <div className="iso-cube-grid">
                    {/* cube-2: animated flyIn+spin */}
                    <div className="iso-cube cube-2">
                        <div className="iso-cube-body">
                            <div className="iso-face front" />
                            <div className="iso-face back" />
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top">
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                            </div>
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                    {/* cube-3: text faces */}
                    <div className="iso-cube cube-3">
                        <div className="iso-cube-body">
                            <div className="iso-face front">{faces.c3[0]}</div>
                            <div className="iso-face back">{faces.c3[1]}</div>
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top">
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                            </div>
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                    {/* cube-5: drop anim */}
                    <div className="iso-cube cube-5">
                        <div className="iso-cube-body">
                            <div className="iso-face front" />
                            <div className="iso-face back" />
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top">
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                            </div>
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                    {/* cube-6: text faces */}
                    <div className="iso-cube cube-6">
                        <div className="iso-cube-body">
                            <div className="iso-face front">{faces.c6[0]}</div>
                            <div className="iso-face back">{faces.c6[1]}</div>
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top" />
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                    {/* cube-7 */}
                    <div className="iso-cube cube-7">
                        <div className="iso-cube-body">
                            <div className="iso-face front" />
                            <div className="iso-face back" />
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top">
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                            </div>
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                    {/* cube-8: exit anim */}
                    <div className="iso-cube cube-8">
                        <div className="iso-cube-body">
                            <div className="iso-face front" />
                            <div className="iso-face back" />
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top">
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                                <div className="iso-top-dot" /><div className="iso-top-dot" />
                            </div>
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                    {/* cube-9: text faces */}
                    <div className="iso-cube cube-9">
                        <div className="iso-cube-body">
                            <div className="iso-face front">{faces.c9[0]}</div>
                            <div className="iso-face back">{faces.c9[1]}</div>
                            <div className="iso-face right" />
                            <div className="iso-face left" />
                            <div className="iso-face top" />
                            <div className="iso-face bottom" />
                        </div>
                    </div>
                </div>

                {/* Icon widget */}
                <div className="iso-icon-widget">
                    <div className="iso-icon-bar" />
                    <div className="iso-icon-bar" />
                    <div className="iso-icon-bar" />
                    <div className="iso-icon-pulse" />
                </div>

                {/* Message */}
                <div className="iso-card-message">
                    <span className="iso-card-title">{title}</span>
                    <span className="iso-card-subtitle">{subtitle}</span>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Services() {
    const whatsappNumber = '917305493515';
    const whatsappMsg = encodeURIComponent("Hi Raj! I visited your portfolio and I'd like to discuss a project with you. 🚀");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

    return (
        <section
            id="services"
            className="py-16 md:py-32 bg-[var(--primary-bg)] relative overflow-hidden border-t border-white/5"
        >
            {/* Background blobs */}
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[180px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                {/* ── HEADER ───────────────────────────────────────────────── */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-sm font-medium text-emerald-300"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                        </span>
                        Available for Freelance Work
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                        Let&apos;s Build Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-yellow-300 to-[var(--accent-color)] animate-[shine_4s_linear_infinite] bg-[length:200%_auto]">
                            Vision
                        </span>
                    </h2>
                    <p className="text-[var(--secondary-text)] text-lg max-w-xl mx-auto">
                        Full-stack developer for hire — I turn your ideas into fast, beautiful, production-ready products.
                    </p>
                </motion.div>

                {/* ── TRUST STATS ──────────────────────────────────────────── */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="relative group text-center py-7 px-4 bg-[var(--secondary-bg)] border border-white/5 rounded-2xl hover:border-[var(--accent-color)]/30 transition-all duration-300 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            viewport={{ once: false }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="text-3xl md:text-4xl font-black text-white mb-2 relative z-10">{stat.value}</p>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest relative z-10">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── SERVICE CARD ──────────────────────────────────────────── */}
                <div className="flex justify-center mb-12 md:mb-20 px-2">
                    <div className="w-full max-w-[340px] sm:max-w-[420px]">
                        <IsoCubeCard index={0} title="Premium websites, built to convert" subtitle={`From idea to live product,\nengineered with precision.`} faces={{ c3: ['Build','Ship'], c6: ['Code','Live'], c9: ['Fast','Now'] }} />
                    </div>
                </div>


                {/* ── WHAT'S INCLUDED ───────────────────────────────────────── */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-3">Every project includes</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                            What You <span className="text-[var(--accent-color)]">Get</span>
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                            No nickel-and-diming. Every project ships with these by default.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {inclusions.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="group flex items-start gap-4 p-5 bg-[var(--secondary-bg)] border border-white/5 rounded-xl hover:border-white/15 transition-all duration-300"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                viewport={{ once: false }}
                                whileHover={{ x: 4 }}
                            >
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-white/8 bg-white/4 group-hover:scale-110 transition-transform duration-300"
                                    style={{ color: item.color, boxShadow: `0 0 16px ${item.color}20` }}
                                >
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white mb-1 group-hover:text-[var(--accent-color)] transition-colors duration-300">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                                <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── HOW I WORK ────────────────────────────────────────────── */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                        How I <span className="text-[var(--accent-color)]">Work</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Connecting line (desktop only) */}
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#4A90E2]/40 via-[#FFD700]/40 to-[#10B981]/40 z-0" />

                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                className="relative group bg-[var(--secondary-bg)] border border-white/5 hover:border-white/15 rounded-2xl p-7 text-center transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] z-10"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                viewport={{ once: false }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Step number badge */}
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 bg-white/5 relative"
                                    style={{ color: step.color, boxShadow: `0 0 25px ${step.color}30` }}
                                >
                                    {step.icon}
                                    <span
                                        className="absolute -top-2 -right-2 text-[10px] font-black px-2 py-0.5 rounded-full border"
                                        style={{ color: step.color, borderColor: `${step.color}50`, backgroundColor: `${step.color}15` }}
                                    >
                                        {step.number}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-3" style={{ color: step.color }}>{step.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── TECH STACK MARQUEE ────────────────────────────────────── */}
                <motion.div
                    className="mb-16 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                >
                    <p className="text-center text-xs text-gray-600 uppercase tracking-widest font-semibold mb-6">Tech I build with</p>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--primary-bg)] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--primary-bg)] to-transparent z-10 pointer-events-none" />
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            {[...techStack, ...techStack].map((tech, i) => (
                                <span
                                    key={i}
                                    className="flex-shrink-0 px-6 py-2.5 bg-[var(--secondary-bg)] border border-white/8 rounded-full text-sm font-medium text-gray-400 whitespace-nowrap hover:border-[var(--accent-color)]/30 hover:text-white transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── PROMISE CHIPS ─────────────────────────────────────────── */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    {promises.map((p) => (
                        <div
                            key={p.label}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/4 border border-white/8 rounded-full text-sm text-gray-300 font-medium hover:border-[var(--accent-color)]/40 hover:text-white transition-colors duration-300 cursor-default"
                        >
                            <span className="text-[var(--accent-color)]">{p.icon}</span>
                            {p.label}
                        </div>
                    ))}
                </motion.div>

                {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
                <motion.div
                    className="max-w-2xl mx-auto mb-16 text-center"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <div className="bg-[var(--secondary-bg)] border border-[var(--accent-color)]/15 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)]/40 to-transparent" />
                        <Trophy size={28} className="text-[var(--accent-color)] mx-auto mb-4" />
                        <p className="text-gray-300 text-base leading-relaxed italic mb-5">
                            &quot;Rajeswar built our AI-powered education platform that won Smart India Hackathon 2025 — a national competition with thousands of teams. His ability to ship production-grade, full-stack AI products under pressure is exceptional.&quot;
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">SIH</div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white">SIH Mentor Panel</p>
                                <p className="text-xs text-gray-500">Smart India Hackathon 2025</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── LIVE DEMO WORKS ───────────────────────────────────────── */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <div className="text-center mb-10">
                        <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-3">Proof of work</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                            Live <span className="text-[var(--accent-color)]">Demo Works</span>
                        </h3>
                        <p className="text-gray-500 text-sm mt-2">Click any card to visit the live site</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {demoWorks.map((work, i) => (
                            <motion.a
                                key={work.title}
                                href={work.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-[var(--secondary-bg)] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                viewport={{ once: false }}
                                whileHover={{ y: -8 }}
                            >
                                {/* Browser chrome mockup */}
                                <div className="relative">
                                    {/* Chrome bar */}
                                    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#111111] border-b border-white/5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                        <div className="flex-1 ml-2 bg-white/5 rounded-md px-3 py-1 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: work.accentColor }} />
                                            <span className="text-[10px] text-gray-500 font-mono truncate">{work.link.replace('https://', '')}</span>
                                        </div>
                                        <ExternalLink size={12} className="text-gray-600 group-hover:text-gray-300 transition-colors flex-shrink-0" />
                                    </div>

                                    {/* Preview window */}
                                    <div className={`h-36 bg-gradient-to-br ${work.gradient} flex items-center justify-center relative overflow-hidden`}>
                                        {/* Animated grid lines */}
                                        <div className="absolute inset-0 opacity-10"
                                            style={{
                                                backgroundImage: `linear-gradient(${work.accentColor}30 1px, transparent 1px), linear-gradient(90deg, ${work.accentColor}30 1px, transparent 1px)`,
                                                backgroundSize: '30px 30px'
                                            }}
                                        />
                                        {/* Center glow orb */}
                                        <div
                                            className="w-16 h-16 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                                            style={{ backgroundColor: work.accentColor }}
                                        />
                                        {/* Title in preview */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span
                                                className="text-2xl font-black tracking-tight opacity-20 group-hover:opacity-40 transition-opacity duration-300 select-none"
                                                style={{ color: work.accentColor }}
                                            >
                                                {work.title.split(' ')[0].toUpperCase()}
                                            </span>
                                        </div>
                                        {/* Visit overlay on hover */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span
                                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border text-white"
                                                style={{ borderColor: work.accentColor, backgroundColor: `${work.accentColor}25` }}
                                            >
                                                <ExternalLink size={14} /> Visit Live Site
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card body */}
                                <div className="p-5">
                                    {/* Badge + category */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                                            style={{ color: work.accentColor, borderColor: `${work.accentColor}40`, backgroundColor: `${work.accentColor}12` }}
                                        >
                                            {work.badge}
                                        </span>
                                        <span className="text-[10px] text-gray-600 font-mono">{work.category}</span>
                                    </div>

                                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-[var(--accent-color)] transition-colors duration-300">
                                        {work.title}
                                    </h4>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{work.description}</p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {work.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* ── SMALL BUSINESS PITCH ───────────────────────────────────── */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: false }}
                >
                    <div className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-gradient-to-br from-orange-950/50 via-[var(--secondary-bg)] to-[var(--secondary-bg)] p-8 md:p-12">
                        {/* Top shimmer */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
                        {/* BG glow */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/8 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-start gap-10">

                            {/* Left: Text */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-orange-500/15 border border-orange-500/25 rounded-full text-xs font-bold text-orange-300 uppercase tracking-wider">
                                    <Store size={13} />
                                    For Small &amp; Local Businesses
                                </div>

                                <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                                    Think your business is{' '}
                                    <span className="text-orange-400">too small</span>{' '}
                                    for a website?
                                </h3>

                                <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-xl">
                                    Every customer you don&apos;t have online is a customer your competitor gets.
                                    A clean, professional website makes your business look trustworthy —
                                    <strong className="text-white"> even if you&apos;re just starting out.</strong>
                                </p>

                                {/* Business type chips */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {[
                                        '🏥 Medical Clinic', '📚 Tuition Centre', '👗 Boutique',
                                        '🍱 Cloud Kitchen', '💇 Parlour / Salon', '🏋️ Gym / Yoga',
                                        '📸 Photographer', '⚖️ CA / Lawyer', '🎉 Event Planner',
                                        '🔧 Local Service', '🌿 Homemade Products', '🛒 Small Shop',
                                    ].map((biz) => (
                                        <span
                                            key={biz}
                                            className="text-xs px-3 py-1.5 bg-white/5 border border-white/8 rounded-full text-gray-400 hover:border-orange-400/40 hover:text-gray-200 transition-colors cursor-default"
                                        >
                                            {biz}
                                        </span>
                                    ))}
                                </div>

                                {/* Key benefits */}
                                <div className="space-y-2.5">
                                    {[
                                        { icon: '✅', text: 'Even a 3-page site can bring more customers than word-of-mouth alone' },
                                        { icon: '✅', text: 'Looks professional on phones — where your customers actually search' },
                                        { icon: '✅', text: 'I handle everything — you just tell me what your business does' },
                                    ].map((point) => (
                                        <div key={point.text} className="flex items-start gap-3">
                                            <span className="text-base flex-shrink-0 mt-0.5">{point.icon}</span>
                                            <p className="text-gray-400 text-sm leading-relaxed">{point.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Feature card */}
                            <div className="w-full lg:w-auto flex-shrink-0">
                                <div className="bg-[var(--primary-bg)] border border-orange-500/20 rounded-2xl p-7 text-center min-w-[240px]">
                                    <p className="text-xs text-orange-400 font-bold uppercase tracking-widest mb-2">Custom Packages</p>
                                    <p className="text-2xl font-black text-white mb-1">
                                        Tailored Plans
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">Built for your exact budget</p>
                                    <p className="text-[11px] text-gray-600 mb-6">Premium design • Fast delivery • Absolute transparency</p>

                                    <div className="space-y-2 mb-6 text-left">
                                        {[
                                            'Beautiful responsive design',
                                            'Your logo, photos & content',
                                            'Contact / Enquiry form',
                                            'Google Maps & social links',
                                            'Deployed live with real URL',
                                        ].map((f) => (
                                            <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                                                <CheckCircle2 size={12} className="text-orange-400 flex-shrink-0" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)]"
                                    >
                                        <MessageCircle size={16} />
                                        Let&apos;s Chat on WhatsApp
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>

                {/* ── TRY BEFORE YOU PAY ─────────────────────────────────────── */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: false }}
                >
                    <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 via-[var(--secondary-bg)] to-[var(--secondary-bg)] p-8 md:p-12">
                        {/* Top shimmer line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                        {/* BG glow */}
                        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10">

                            {/* Left: Text */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-emerald-500/15 border border-emerald-500/25 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-wider">
                                    <ShieldCheck size={13} />
                                    Zero Risk. Zero Commitment.
                                </div>
                                <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                                    Not sure yet?{' '}
                                    <span className="text-emerald-400">That&apos;s okay.</span>
                                </h3>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                                    Don&apos;t pay a single rupee upfront on trust alone.
                                    Tell me your idea — <strong className="text-white">I&apos;ll build you a working demo for free.</strong>
                                    {' '}If you love it, we move forward with the full project.
                                    If not — <strong className="text-white">no questions, no charge.</strong>
                                </p>

                                {/* 3-step mini flow */}
                                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                                    {[
                                        { step: '1', text: 'Tell me your idea', icon: '💬' },
                                        { step: '2', text: 'I build a free demo', icon: '🛠️' },
                                        { step: '3', text: 'Love it? We proceed!', icon: '🚀' },
                                    ].map((s, i) => (
                                        <div key={s.step} className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl flex-shrink-0">
                                                <span className="text-base">{s.icon}</span>
                                                <span className="text-gray-300 font-medium whitespace-nowrap">{s.text}</span>
                                            </div>
                                            {i < 2 && (
                                                <ArrowRight size={14} className="text-emerald-500 hidden sm:block flex-shrink-0" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: CTA card */}
                            <div className="w-full lg:w-auto flex-shrink-0">
                                <div className="bg-[var(--primary-bg)] border border-white/10 rounded-2xl p-7 text-center min-w-[260px]">
                                    <p className="text-4xl font-black text-emerald-400 mb-1">FREE</p>
                                    <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Demo Build · No strings attached</p>
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] mb-3"
                                    >
                                        <MessageCircle size={18} />
                                        Request Free Demo
                                    </a>
                                    <p className="text-[11px] text-gray-600">
                                        ✅ No upfront payment &nbsp;•&nbsp; ✅ Your idea stays private
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>

                {/* ── DUAL CTA ──────────────────────────────────────────────── */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                >
                    <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-6">Ready to start?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary: WhatsApp */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full text-base shadow-[0_0_30px_rgba(37,211,102,0.25)] hover:shadow-[0_0_50px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <MessageCircle size={20} className="transition-transform group-hover:rotate-12 duration-300" />
                            Chat on WhatsApp
                        </a>

                        {/* Secondary: Contact form */}
                        <Link
                            href="#contact"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-color)] text-black font-bold rounded-full text-base shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Send a Message
                            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <p className="mt-5 text-gray-600 text-sm">
                        Usually respond within <span className="text-gray-400 font-semibold">24 hours</span> · Free initial consultation
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
