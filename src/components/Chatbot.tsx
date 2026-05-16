'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
    id: number;
    role: "user" | "bot";
    text: string;
}

type ChatError = "rate_limit" | "timeout" | "unavailable" | null;

// ── Paper Plane SVG ──────────────────────────────────────────────────────────
function PaperPlaneIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
    );
}

// ── Animated Send Button ──────────────────────────────────────────────────────
function AnimatedSendButton({ onClick, disabled, isSending, hasText }: { onClick: () => void, disabled: boolean, isSending: boolean, hasText: boolean }) {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            aria-label="Send message"
            className="relative w-[34px] h-[34px] rounded-lg flex items-center justify-center flex-shrink-0 disabled:cursor-not-allowed transition-all overflow-hidden"
            animate={{
                background: hasText && !isSending 
                    ? "linear-gradient(135deg, #10b981, #059669)" // Green gradient when ready
                    : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                boxShadow: hasText && !isSending
                    ? "0 4px 15px rgba(16, 185, 129, 0.3)"
                    : "none",
                borderColor: hasText && !isSending ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)",
                borderWidth: "1px"
            }}
            whileHover={hasText && !disabled ? { scale: 1.05 } : {}}
            whileTap={hasText && !disabled ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
        >
            <AnimatePresence mode="wait">
                {isSending ? (
                    <motion.div
                        key="spinner"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <motion.span
                            className="w-3.5 h-3.5 border-[2px] border-green-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="plane"
                        initial={{ x: -20, y: 20, opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        exit={{ 
                            x: 25, y: -25, opacity: 0, scale: 0.5,
                            transition: { duration: 0.3, ease: "easeIn" }
                        }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        className={`absolute inset-0 flex items-center justify-center ${hasText ? "text-white" : "text-white/40"}`}
                        style={{ paddingRight: "2px", paddingTop: "2px" }}
                    >
                        <PaperPlaneIcon />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

// ── Raj "R" Avatar ────────────────────────────────────────────────────────────
function RajAvatar({ size = 32 }: { size?: number }) {
    const id = `ring-${size}`;
    return (
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
            {/* Rotating gradient ring */}
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 32 32"
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <defs>
                    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                        <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <circle
                    cx="16" cy="16" r="14"
                    fill="none"
                    stroke={`url(#${id})`}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </motion.svg>

            {/* Inner circle with R */}
            <div
                className="absolute flex items-center justify-center rounded-full bg-[#0e0e1a] border border-[#FFD700]/20"
                style={{ inset: 3 }}
            >
                <span
                    className="font-black text-[#FFD700] leading-none select-none"
                    style={{ fontSize: size * 0.38 }}
                >
                    R
                </span>
            </div>

            {/* Online pulse dot */}
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-[#0e0e1a]">
                <motion.span
                    className="absolute inset-0 rounded-full bg-green-400"
                    animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </span>
        </div>
    );
}

// ── Neural Waveform (thinking) ────────────────────────────────────────────────
function NeuralWaveform() {
    const delays = [0, 0.1, 0.2, 0.1, 0];
    return (
        <div className="flex items-end gap-[3px] h-5 px-1">
            {delays.map((delay, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                        background: "linear-gradient(to top, #6366f1, #a855f7)",
                        height: "100%",
                    }}
                    animate={{ scaleY: [0.2, 1, 0.2] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// ── Original StarIcon (cracked star) ────────────────────────────────────────
function StarIcon() {
    return (
        <div className="star-preloader">
            <div className="star-crack" />
            <div className="star-crack" />
            <div className="star-crack" />
            <div className="star-crack" />
            <div className="star-crack" />
        </div>
    );
}

// ── Floating toggle ───────────────────────────────────────────────────────────
function ToggleOrb({ isOpen }: { isOpen: boolean }) {
    return (
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
                    <StarIcon />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ── Error overlay ─────────────────────────────────────────────────────────────
function ErrorOverlay({ type, onDismiss }: { type: ChatError; onDismiss: () => void }) {
    const config = {
        rate_limit: { icon: "⏳", title: "Cooling Down", subtitle: "API limit hit. Wait a moment and try again.", color: "from-amber-500/20 to-orange-500/10", border: "border-amber-500/30", pulse: "bg-amber-400" },
        timeout: { icon: "🌐", title: "Slow Connection", subtitle: "Response timed out. Please retry.", color: "from-blue-500/20 to-cyan-500/10", border: "border-blue-500/30", pulse: "bg-blue-400" },
        unavailable: { icon: "🔧", title: "Agent Offline", subtitle: "Start the ADK server, then retry.", color: "from-red-500/20 to-rose-500/10", border: "border-red-500/30", pulse: "bg-red-400" },
    };
    if (!type) return null;
    const c = config[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`mx-3 mb-2 rounded-xl border ${c.border} bg-gradient-to-br ${c.color} p-3.5 flex items-center gap-3`}
        >
            <div className="relative flex-shrink-0">
                <span className="text-xl">{c.icon}</span>
                <motion.span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${c.pulse}`}
                    animate={{ scale: [1, 1.9, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold">{c.title}</p>
                <p className="text-gray-400 text-[11px] mt-0.5 leading-snug">{c.subtitle}</p>
            </div>
            <button onClick={onDismiss} className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0">
                <X size={13} />
            </button>
        </motion.div>
    );
}

// ── Dot-grid SVG background ───────────────────────────────────────────────────
function DotGrid() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#a0aec0" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
    );
}

// ── Main Chatbot ──────────────────────────────────────────────────────────────
export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: "bot", text: "Hey, I'm Raj's AI. What can I help you with today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatError, setChatError] = useState<ChatError>(null);
    const [sessionId, setSessionId] = useState(() => `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading, chatError]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;
        setChatError(null);
        const userMsg: Message = { id: Date.now(), role: "user", text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, sessionId }),
            });
            const data = await res.json();

            if (res.status === 429 || data.error === "rate_limit") {
                setChatError("rate_limit");
            } else if (res.status === 503 || data.error === "timeout") {
                setChatError("timeout");
            } else if (!res.ok || data.error) {
                setChatError("unavailable");
            } else {
                if (data.sessionId) setSessionId(data.sessionId);
                setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: data.reply }]);
            }
        } catch {
            setChatError("unavailable");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

            {/* ── Chat window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        transition={{ type: "spring", damping: 26, stiffness: 320 }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[360px] max-w-[420px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-white/[0.07]"
                        style={{
                            height: "min(540px, 78vh)",
                            background: "linear-gradient(160deg, #0a0a14 0%, #0e0e1a 60%, #10101f 100%)",
                        }}
                    >
                        {/* ── Terminal header ── */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-black/40 flex-shrink-0">
                            {/* Traffic lights */}
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all"
                                    aria-label="Close"
                                />
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                            </div>

                            {/* Title */}
                            <div className="flex-1 flex items-center justify-center gap-2">
                                <RajAvatar size={20} />
                                <span className="font-mono text-[11px] text-gray-400 tracking-wide">
                                    raj_concierge.ai
                                </span>
                                <motion.span
                                    className="text-[#FFD700] font-mono text-sm leading-none"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ▌
                                </motion.span>
                            </div>

                            {/* Spacer to balance traffic lights */}
                            <div className="w-[52px]" />
                        </div>

                        {/* ── Messages area ── */}
                        <div className="relative flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
                            <DotGrid />

                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    {/* Avatar */}
                                    {msg.role === "bot" ? (
                                        <RajAvatar size={26} />
                                    ) : (
                                        <div className="w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center bg-white/10 border border-white/10">
                                            <span className="text-[10px] text-gray-300 font-bold">U</span>
                                        </div>
                                    )}

                                    {/* Bubble */}
                                    <div
                                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed relative ${
                                            msg.role === "user"
                                                ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-br-sm shadow-lg shadow-violet-900/30"
                                                : "bg-[#0d1a0f]/70 border border-green-900/25 text-green-50 rounded-bl-sm font-mono text-[13px]"
                                        }`}
                                    >
                                        {msg.role === "bot" && (
                                            <span className="text-green-500/60 text-[11px] mr-1 select-none">›</span>
                                        )}
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Neural waveform thinking animation */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-end gap-2.5"
                                >
                                    <RajAvatar size={26} />
                                    <div className="bg-[#0d1a0f]/70 border border-green-900/25 rounded-2xl rounded-bl-sm px-4 py-3.5">
                                        <NeuralWaveform />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* ── Error overlay ── */}
                        <AnimatePresence>
                            {chatError && (
                                <div className="flex-shrink-0 pt-1">
                                    <ErrorOverlay type={chatError} onDismiss={() => setChatError(null)} />
                                </div>
                            )}
                        </AnimatePresence>

                        {/* ── Terminal input ── */}
                        <div className="px-3 py-3 border-t border-white/[0.06] bg-black/30 flex-shrink-0">
                            <motion.div
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2 relative overflow-hidden"
                                animate={{
                                    background: input.length > 0 ? "rgba(13,26,15,0.6)" : "rgba(0,0,0,0.3)",
                                    borderColor: input.length > 0 ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.08)",
                                    boxShadow: input.length > 0 ? "0 0 0 1px rgba(16,185,129,0.1), 0 4px 20px rgba(16,185,129,0.06)" : "none",
                                }}
                                style={{ border: "1px solid" }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Glowing cursor block when focused/typing */}
                                <AnimatePresence>
                                    {input.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute left-0 top-0 bottom-0 w-[2px] bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                        />
                                    )}
                                </AnimatePresence>

                                <motion.span 
                                    className="text-green-500/80 font-mono text-sm select-none flex-shrink-0"
                                    animate={{ opacity: input.length > 0 ? 1 : 0.5 }}
                                >
                                    ›
                                </motion.span>
                                
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => { setInput(e.target.value); if (chatError) setChatError(null); }}
                                    onKeyDown={handleKey}
                                    placeholder="type your query..."
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent text-[13.5px] text-green-50 placeholder-green-900/60 outline-none min-w-0 font-mono"
                                />
                                
                                <AnimatedSendButton 
                                    onClick={handleSend} 
                                    disabled={!input.trim() || isLoading} 
                                    isSending={isLoading} 
                                    hasText={input.length > 0} 
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating toggle button ── */}
            <motion.button
                onClick={() => setIsOpen(p => !p)}
                aria-label="Open AI Chat"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer bg-[#0d0d1a] border border-white/10"
            >
                <motion.span
                    className="absolute inset-0 rounded-full bg-purple-500 opacity-20"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <ToggleOrb isOpen={isOpen} />
            </motion.button>
        </div>
    );
}
