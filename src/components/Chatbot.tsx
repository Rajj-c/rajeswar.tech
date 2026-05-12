'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle, Zap, Cpu, Sparkles } from "lucide-react";

const WHATSAPP = "https://wa.me/917305493515?text=Hi%20Raj!%20I%20came%20from%20your%20portfolio%20and%20wanted%20to%20connect.";

// Orbiting dot
function OrbitDot({ angle, radius, delay, color }: { angle: number; radius: number; delay: number; color: string }) {
    return (
        <motion.div
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color, top: "50%", left: "50%" }}
            animate={{
                x: [
                    Math.cos((angle * Math.PI) / 180) * radius,
                    Math.cos(((angle + 180) * Math.PI) / 180) * radius,
                    Math.cos((angle * Math.PI) / 180) * radius,
                ],
                y: [
                    Math.sin((angle * Math.PI) / 180) * radius,
                    Math.sin(((angle + 180) * Math.PI) / 180) * radius,
                    Math.sin((angle * Math.PI) / 180) * radius,
                ],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.3, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
        />
    );
}

// Animated progress bar
function BuildBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                <span>{label}</span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.6 }}
                    style={{ color }}
                >
                    {pct}%
                </motion.span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, delay, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

            {/* ── Popup card ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 16 }}
                        transition={{ type: "spring", damping: 20, stiffness: 280 }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[340px] max-w-[400px] rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                        style={{
                            background: "linear-gradient(145deg, #0f0f1a, #131325, #0d0d1f)",
                        }}
                    >
                        {/* Glow rim */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 pt-5 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                                    <Bot size={14} className="text-purple-400" />
                                </div>
                                <span className="text-sm font-bold text-white">Raj&apos;s AI Agent</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        {/* Central animation */}
                        <div className="flex flex-col items-center py-6 px-5 relative">

                            {/* Orbit ring */}
                            <div className="relative w-28 h-28 flex items-center justify-center mb-5">
                                {/* Outer glow ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-purple-500/20"
                                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute inset-3 rounded-full border border-yellow-400/15"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                />

                                {/* Orbiting dots */}
                                <OrbitDot angle={0}   radius={48} delay={0}    color="#a855f7" />
                                <OrbitDot angle={90}  radius={48} delay={0.75} color="#ffd700" />
                                <OrbitDot angle={180} radius={48} delay={1.5}  color="#06b6d4" />
                                <OrbitDot angle={270} radius={48} delay={2.25} color="#10b981" />

                                {/* Center bot icon with spinning gear */}
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/20 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/10">
                                    <Bot size={28} className="text-purple-300" />
                                    {/* Spinning gear badge */}
                                    <motion.div
                                        className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-md"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    >
                                        <span className="text-[10px]">⚙️</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Title */}
                            <motion.h3
                                className="text-white font-extrabold text-base mb-1 text-center"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Upgrading to v2.0
                            </motion.h3>
                            <motion.p
                                className="text-gray-400 text-xs text-center mb-5 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                Something smarter is brewing. The AI agent is being rebuilt from scratch with deeper knowledge and real-time reasoning.
                            </motion.p>

                            {/* Build progress bars */}
                            <div className="w-full space-y-3 mb-5">
                                <BuildBar label="Agent Knowledge Base"  pct={100} color="#10b981" delay={0.4} />
                                <BuildBar label="Conversation Memory"   pct={78}  color="#a855f7" delay={0.6} />
                                <BuildBar label="Tool Integrations"     pct={55}  color="#ffd700" delay={0.8} />
                                <BuildBar label="Cloud Deployment"      pct={30}  color="#06b6d4" delay={1.0} />
                            </div>

                            {/* Status chips */}
                            <div className="flex gap-2 flex-wrap justify-center mb-5">
                                {[
                                    { icon: <Cpu size={10} />,      label: "ADK Agent",   color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
                                    { icon: <Zap size={10} />,      label: "Tool Calls",  color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
                                    { icon: <Sparkles size={10} />, label: "Smart Memory",color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
                                ].map((chip) => (
                                    <span
                                        key={chip.label}
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wide ${chip.color}`}
                                    >
                                        {chip.icon}{chip.label}
                                    </span>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <motion.a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-shadow"
                            >
                                <MessageCircle size={15} />
                                Chat with Raj on WhatsApp
                            </motion.a>

                            <p className="text-[10px] text-gray-600 mt-3 text-center">
                                Until the agent is live, Raj responds personally within 24h
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating toggle button ── */}
            <motion.button
                onClick={() => setIsOpen((p) => !p)}
                aria-label="Open AI Chat"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer bg-[#0d0d1a] border border-white/10"
            >
                {/* Pulse ring */}
                <motion.span
                    className="absolute inset-0 rounded-full bg-purple-500 opacity-20"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="x"
                            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={22} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="star"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                            className="w-full h-full"
                        >
                            <div className="star-preloader">
                                <div className="star-crack" />
                                <div className="star-crack" />
                                <div className="star-crack" />
                                <div className="star-crack" />
                                <div className="star-crack" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
