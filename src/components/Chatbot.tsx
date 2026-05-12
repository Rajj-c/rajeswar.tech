'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Generate 5 patterns × 40 columns
const PATTERNS = 5;
const COLS = 40;

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

            {/* ── Matrix popup ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 16 }}
                        transition={{ type: "spring", damping: 22, stiffness: 300 }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[340px] max-w-[400px] rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden"
                        style={{ height: 320 }}
                    >
                        {/* Matrix rain fills the whole card */}
                        <div className="matrix-container" style={{ height: "100%" }}>
                            {Array.from({ length: PATTERNS }).map((_, pi) => (
                                <div key={pi} className="matrix-pattern">
                                    {Array.from({ length: COLS }).map((_, ci) => (
                                        <div key={ci} className="matrix-column" />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Overlay — close button top-right */}
                        <div className="absolute inset-0 flex flex-col">
                            <div className="flex justify-end p-3">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-7 h-7 rounded-full bg-black/60 border border-green-500/30 flex items-center justify-center text-green-400 hover:text-white hover:bg-black/80 transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Centered message */}
                            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                                {/* Glowing green dot */}
                                <motion.div
                                    className="w-3 h-3 rounded-full bg-green-400 mb-4"
                                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.4, repeat: Infinity }}
                                />

                                <motion.p
                                    className="text-green-400 font-mono text-[11px] uppercase tracking-widest mb-3"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    // system.training_in_progress
                                </motion.p>

                                <h3
                                    className="font-black text-xl mb-2 leading-tight"
                                    style={{
                                        color: "#00ff41",
                                        textShadow: "0 0 12px #00ff41, 0 0 30px #00dd33",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    Raj is Training<br />the Agent
                                </h3>

                                <p className="text-green-300/80 text-sm font-mono mt-2 leading-relaxed">
                                    It will be available soon.<br />
                                    <span className="text-green-400 font-bold">Stay tuned.</span>
                                </p>

                                {/* Animated typing cursor */}
                                <motion.span
                                    className="mt-3 text-green-400 font-mono text-lg"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                >
                                    _
                                </motion.span>
                            </div>
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
