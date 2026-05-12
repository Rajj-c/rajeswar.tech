'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
    Check, Sparkles, Globe, Layers, Cpu, Database, Bot, ArrowRight,
    HelpCircle, ShieldCheck, Wrench, ExternalLink, MessageCircle,
    Lock, Unlock, Key, X, Eye
} from 'lucide-react';

const plans = [
    {
        name: 'Starter Presence',
        price: '₹3,499',
        target: 'Solo Freelancers & Small Local Shops',
        desc: 'Get your business online quickly with a polished, high-speed single page site.',
        color: '#4A90E2', // blue
        badge: '',
        features: [
            '1 Single-Page Landing Site',
            'Mobile & Desktop Responsive',
            'WhatsApp Direct Chat Button',
            'Contact / Enquiry Form',
            'Google Maps & Social Embeds',
            'Deployed Live on Sub-domain',
            '2-3 Days Delivery',
        ],
        msg: "Hi Raj! I'm interested in the Starter Presence Plan. Let's discuss my website requirements.",
    },
    {
        name: 'Professional Biz',
        price: '₹8,999',
        target: 'Clinics, Salons, Cafes, & Agencies',
        desc: 'Establish serious trust with a dedicated multi-page responsive architecture.',
        color: '#10B981', // emerald
        badge: 'Popular Choice',
        features: [
            'Up to 5 Custom Pages',
            'Sleek UI Animations & Transitions',
            'Advanced Lead Capture Form',
            'Ultra-Fast Loading Guarantee',
            'Basic On-Page SEO Optimization',
            'Assistance with Custom Domain',
            '5-7 Days Delivery',
        ],
        msg: "Hi Raj! I'm interested in the Professional Biz Plan. Let's discuss my multi-page website project.",
    },
    {
        name: 'Dynamic Growth',
        price: '₹16,799',
        target: 'Growing Brands & Content Creators',
        desc: 'Supercharge user engagement with live databases and dynamic capabilities.',
        color: '#F59E0B', // amber
        badge: 'Best Value',
        featured: true, // Highlights this card
        features: [
            'Up to 10 Pages + Dynamic Routing',
            'Live Database Connected (Supabase)',
            'Dynamic Portfolios / Blogs / Events',
            'Standard Pre-scripted FAQ Chatbot',
            'Client Testimonials Carousel',
            'Premium Dark/Light Glassmorphism',
            '10-12 Days Delivery',
        ],
        msg: "Hi Raj! I'm interested in the Dynamic Growth Plan. Let's build a database-connected dynamic website.",
    },
    {
        name: 'Smart Automation',
        price: '₹27,999',
        target: 'D2C Brands & Tech Startups',
        desc: 'Wow visitors with an embedded AI assistant trained on your exact business data.',
        color: '#A855F7', // purple
        badge: 'AI Powered',
        features: [
            'Complete Website Architecture',
            'Custom Trained AI Chatbot (Business-Specific)',
            'Secure Internal Admin Dashboard',
            'Lead & Metrics Tracking Panel',
            'Payment Gateway Setup (Razorpay)',
            '1 Month Free Technical Support',
            '2-3 Weeks Delivery',
        ],
        msg: "Hi Raj! I'm interested in the Smart Automation Plan with the AI Chatbot integration. Let's connect.",
    },
    {
        name: 'Full-Stack Ultimate',
        price: '₹40,000+',
        target: 'SaaS Founders & Custom Platforms',
        desc: 'End-to-end custom Next.js web application engineered for maximum scale.',
        color: '#EC4899', // pink
        badge: 'Custom Scale',
        features: [
            'Complete Custom Full-Stack App',
            'Secure User Authentication Flows',
            'Relational Database Architectures',
            'Advanced Logic & API Integrations',
            'Bulletproof Backend Infrastructure',
            '2 Months Premium Maintenance',
            '3-5 Weeks Delivery',
        ],
        msg: "Hi Raj! I'm interested in the Full-Stack Ultimate Plan. Let's discuss building my custom web application.",
    },
];

export default function Pricing() {
    const whatsappNumber = '917305493515';
    
    // Master state to control the main Pricing List Popup Overlay
    const [showListModal, setShowListModal] = useState(false);

    // State to track if prices are unlocked via secret pricing access key inside the popup list
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [accessKeyInput, setAccessKeyInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // State mapping tracking which individual cards have had their digital gold Scratchpad layer scratched off
    const [scratchedCards, setScratchedCards] = useState<Record<string, boolean>>({});

    // Lock body scrolling when the massive list modal is open
    useEffect(() => {
        if (showListModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showListModal]);

    const handleVerifyKey = (e: React.FormEvent) => {
        e.preventDefault();
        const code = accessKeyInput.trim().toUpperCase();
        
        // Accepted secret key
        if (code === 'BUILDWITHRAJ') {
            setIsUnlocked(true);
            setShowKeyModal(false);
            setErrorMsg('');
            setAccessKeyInput('');
            
            // Initial verification confetti burst
            try {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.5 }
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            setErrorMsg('Invalid access key. Hint: Check my LinkedIn bio or recent posts!');
        }
    };

    // Handler triggered when a lead interacts with the digital gold scratchpad coat
    const handleScratchOff = (planName: string) => {
        if (scratchedCards[planName]) return;
        
        setScratchedCards(prev => ({ ...prev, [planName]: true }));
        
        // Sparkle sound/visual feedback specific to uncovering this tier
        try {
            confetti({
                particleCount: 40,
                spread: 50,
                scalar: 0.75,
                origin: { y: 0.55 }
            });
        } catch (err) {}
    };

    return (
        <section id="pricing" className="py-24 bg-[var(--primary-bg)] relative overflow-hidden border-t border-white/5 scroll-mt-10">
            {/* Background ambient light */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />

            {/* ── Main Page View: High-Conversion Teaser Card Trigger ── */}
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="relative rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.05] via-[var(--secondary-bg)] to-amber-500/[0.05] p-6 md:p-12 text-center backdrop-blur-md shadow-2xl overflow-hidden"
                >
                    {/* Glowing rim accent */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                    
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                    >
                        <Sparkles size={13} />
                        Transparent 5-Tier Packages
                    </motion.div>

                    <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight font-[var(--font-outfit)]">
                        Curious About Foundations &amp;{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                            Investment Plans?
                        </span>
                    </h2>

                    <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
                        Explore complete multi-tier architectural roadmaps tailored to your exact scope—featuring integrated custom web tools, live database setups, custom trained AI helpers, and exclusive direct partner quotes.
                    </p>

                    {/* Button to Trigger Popup List */}
                    <motion.button
                        onClick={() => setShowListModal(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-full text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] animate-bounce"
                    >
                        <Eye size={16} />
                        Explore Service Tiers &amp; Pricing
                    </motion.button>

                    <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                        <span>🔒 Direct rates stay confidential</span>
                        <span>•</span>
                        <span>⚡ Zero hidden markups</span>
                    </div>
                </motion.div>
            </div>

            {/* ── Immersive Fullscreen Popup Modal containing the full Pricing List ── */}
            <AnimatePresence>
                {showListModal && (
                    <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/85 backdrop-blur-xl transition-opacity p-0 sm:p-4 md:p-6">
                        {/* Background dismiss click zone */}
                        <div className="absolute inset-0 min-h-full" onClick={() => setShowListModal(false)} />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 30 }}
                            transition={{ duration: 0.25, type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-[var(--primary-bg)] border border-white/10 sm:rounded-3xl w-full max-w-7xl relative z-10 my-0 sm:my-4 shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-0"
                        >
                            {/* Sticky Modal Header Bar */}
                            <div className="sticky top-0 z-40 bg-[var(--primary-bg)]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="w-3 h-3 flex-shrink-0 rounded-full bg-amber-500 animate-pulse" />
                                    <h3 className="text-sm font-extrabold text-white font-[var(--font-outfit)] truncate">
                                        Architectural Investment Packages
                                    </h3>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Quick visual badge */}
                                    {isUnlocked && (
                                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md font-bold uppercase">
                                            <Unlock size={10} /> VIP Unlocked
                                        </span>
                                    )}
                                    
                                    <button
                                        onClick={() => setShowListModal(false)}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                        aria-label="Close pricing popup"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Inner Scrollable Wrapper */}
                            <div className="p-4 md:p-10 overflow-y-auto flex-1 space-y-8 md:space-y-12">
                                
                                {/* Inner Title Section + Master Access Key Unlocker Action */}
                                <div className="text-center max-w-3xl mx-auto">
                                    <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
                                        Confidential Tiers Engineered For{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                                            Every Business Scale
                                        </span>
                                    </h2>
                                    
                                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-6">
                                        Review fully scalable feature sets below.{' '}
                                        {isUnlocked ? (
                                            <span className="text-emerald-400 font-bold block mt-1">
                                                ✨ VIP Status Active: Hover or click the golden layer on any card to scratch &amp; reveal specific partner rates! ✨
                                            </span>
                                        ) : (
                                            <span className="text-amber-400/90 font-medium block mt-1">
                                                Padlock status active. Enter your Pricing Access Key to mount the scratchpad overlay.
                                            </span>
                                        )}
                                    </p>

                                    {/* Master Global Unlock CTA Button */}
                                    {!isUnlocked && (
                                        <button
                                            onClick={() => setShowKeyModal(true)}
                                            className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold rounded-full text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 animate-pulse"
                                        >
                                            <Lock size={14} />
                                            Enter Pricing Access Key
                                        </button>
                                    )}
                                </div>

                                {/* 5-Tier Pricing Grid Container */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 items-stretch">
                                    {plans.map((plan, i) => {
                                        const baseMsg = plan.msg;
                                        const finalMsg = isUnlocked ? `${baseMsg} (Unlocked Rate: ${plan.price})` : baseMsg;
                                        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;

                                        return (
                                            <motion.div
                                                key={plan.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.08, duration: 0.4 }}
                                                className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
                                                    plan.featured
                                                        ? 'bg-gradient-to-b from-[#16162a] via-[var(--secondary-bg)] to-[var(--secondary-bg)] border-2 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)]'
                                                        : 'bg-[var(--secondary-bg)] border border-white/8 hover:border-white/20'
                                                }`}
                                            >
                                                {/* Featured glowing banner */}
                                                {plan.badge && (
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                                                        <span
                                                            className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-black shadow-md whitespace-nowrap"
                                                            style={{ backgroundColor: plan.color }}
                                                        >
                                                            {plan.badge}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Top Accent bar */}
                                                <div
                                                    className="h-1.5 w-full rounded-t-3xl"
                                                    style={{ backgroundColor: plan.color }}
                                                />

                                                <div className="p-5 flex-1 flex flex-col">
                                                    {/* Plan Title */}
                                                    <div className="mb-3">
                                                        <h3 className="text-lg font-bold text-white mb-0.5">{plan.name}</h3>
                                                        <p className="text-[11px] text-gray-400 font-medium line-clamp-1">{plan.target}</p>
                                                    </div>

                                                    {/* Price tag (Padlocked, Metallic Gold Scratch Layer, or Scratched Open) */}
                                                    <div className="mb-4 pb-3 border-b border-white/5 relative min-h-[48px] flex flex-col justify-center">
                                                        {isUnlocked ? (
                                                            <div className="relative w-full">
                                                                {/* Underlying Uncovered Rate */}
                                                                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-baseline gap-1.5 py-0.5">
                                                                    <span className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider">From</span>
                                                                    <span className="text-2xl font-black text-white tracking-tight">{plan.price}</span>
                                                                    <Unlock size={13} className="text-emerald-400 ml-0.5 self-center" />
                                                                </motion.div>

                                                                {/* Digital Golden Scratch Card Wrapper overlaying the string */}
                                                                <AnimatePresence>
                                                                    {!scratchedCards[plan.name] && (
                                                                        <motion.div
                                                                            exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
                                                                            transition={{ duration: 0.35, ease: 'easeOut' }}
                                                                            onClick={() => handleScratchOff(plan.name)}
                                                                            onMouseMove={() => handleScratchOff(plan.name)}
                                                                            onTouchMove={() => handleScratchOff(plan.name)}
                                                                            className="absolute inset-0 z-20 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 p-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg select-none overflow-hidden group border border-amber-200/50"
                                                                            title="Hover, rub, or click to scratch off the metallic layer!"
                                                                        >
                                                                            {/* Shimmer sweep repeater */}
                                                                            <motion.div
                                                                                animate={{ x: ['-100%', '200%'] }}
                                                                                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                                                                                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                                                                            />
                                                                            <Sparkles size={12} className="text-black animate-spin flex-shrink-0" />
                                                                            <span className="text-[10px] font-black text-black tracking-widest uppercase whitespace-nowrap">
                                                                                ✨ Scratch Reveal ✨
                                                                            </span>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-baseline gap-1.5 py-0.5">
                                                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">From</span>
                                                                <span className="text-2xl font-black text-white/30 tracking-tight select-none filter blur-[5px]">
                                                                    {plan.price}
                                                                </span>
                                                                <button 
                                                                    onClick={() => setShowKeyModal(true)} 
                                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-bold hover:bg-amber-500/20 transition-colors ml-0.5 self-center"
                                                                >
                                                                    <Lock size={9} />
                                                                    Locked
                                                                </button>
                                                            </div>
                                                        )}

                                                        {plan.price.includes('+') ? (
                                                            <span className="text-[10px] text-gray-500 block mt-1">Custom scoping applies</span>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-500 block mt-1">Scalable base investment</span>
                                                        )}
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-[11px] text-gray-300 leading-relaxed mb-5 flex-1">
                                                        {plan.desc}
                                                    </p>

                                                    {/* Features Checklist */}
                                                    <div className="space-y-2 mb-6">
                                                        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">What&apos;s included:</p>
                                                        {plan.features.map((f) => (
                                                            <div key={f} className="flex items-start gap-1.5">
                                                                <Check size={12} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                                                                <span className="text-[11px] text-gray-300 leading-snug">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* CTA Checkout Button • Renders ONLY after tier is unlocked AND successfully scratched open */}
                                                    {isUnlocked && scratchedCards[plan.name] && (
                                                        <motion.a
                                                            initial={{ opacity: 0, scale: 0.85 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                            href={whatsappLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
                                                                plan.featured
                                                                    ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/10'
                                                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                                            }`}
                                                        >
                                                            <MessageCircle size={13} className={plan.featured ? 'text-black' : 'text-emerald-400'} />
                                                            Choose Foundation
                                                        </motion.a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* ── Add-Ons & Disclaimers Section inside Popup ── */}
                                <div className="max-w-4xl mx-auto pt-4">
                                    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.02] p-6 backdrop-blur-sm">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Wrench size={14} className="text-amber-400" />
                                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                                                Customizations, Domains &amp; Maintenance Add-Ons
                                            </h4>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                                                    <Globe size={12} />
                                                    <span>Domain Charges</span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                                    Custom domain names (<code className="text-white font-mono">.com</code> / <code className="text-white font-mono">.in</code>) are charged extra at exact registrar cost. Free DNS linkage!
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                                                    <ShieldCheck size={12} />
                                                    <span>Monthly Care Retainers</span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                                    Optional monthly care plans available for continuous server backups, prompt content tweaks, and active DB/AI database pipeline scaling.
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400">
                                                    <Sparkles size={12} />
                                                    <span>Bespoke Scopes</span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                                    Require full internal portals, dedicated user roles, advanced payment flows, or multilanguage support? Bespoke custom scopes available.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
                                            <span>💡 Highly optimized, semantic components built for high Lighthouse scores.</span>
                                            <a
                                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Raj! I'd like a custom quotation with some specific feature add-ons for my website.")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1"
                                            >
                                                Ask for Custom Scope
                                                <ExternalLink size={9} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom close trigger for long scroll view */}
                                <div className="text-center pb-6">
                                    <button
                                        onClick={() => setShowListModal(false)}
                                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full text-xs font-bold transition-all"
                                    >
                                        Back to Main Portfolio
                                    </button>
                                </div>

                            </div>
                        </motion.div>

                        {/* ── Sub-Modal: Embedded Access Key Verifier Overlay ── */}
                        <AnimatePresence>
                            {showKeyModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <div 
                                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                        onClick={() => setShowKeyModal(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-[var(--secondary-bg)] border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-sm w-full relative z-10 shadow-2xl"
                                    >
                                        <button
                                            onClick={() => setShowKeyModal(false)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
                                        >
                                            <X size={16} />
                                        </button>

                                        <div className="flex items-center gap-2.5 mb-3">
                                            <Key size={18} className="text-amber-400" />
                                            <h4 className="text-base font-bold text-white">Enter Pricing Access Key</h4>
                                        </div>
                                        
                                        <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                                            Input the secret unlock key posted on my LinkedIn profile to reveal transparent partner rates.
                                        </p>

                                        <form onSubmit={handleVerifyKey} className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="ENTER SECRET KEY"
                                                value={accessKeyInput}
                                                onChange={(e) => {
                                                    setAccessKeyInput(e.target.value);
                                                    if (errorMsg) setErrorMsg('');
                                                }}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white uppercase text-center font-mono font-bold tracking-widest focus:outline-none focus:border-amber-500"
                                                autoFocus
                                            />
                                            {errorMsg && (
                                                <p className="text-[10px] text-red-400 text-center font-medium">{errorMsg}</p>
                                            )}

                                            <button
                                                type="submit"
                                                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
                                            >
                                                Verify Key
                                            </button>
                                        </form>

                                        <div className="mt-4 pt-3 border-t border-white/5 text-center">
                                            <p className="text-[11px] text-gray-400">
                                                Don&apos;t have access code?{' '}
                                                <a
                                                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Pricing Access Key")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-amber-400 hover:underline font-bold"
                                                >
                                                    Get it from here
                                                </a>
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
