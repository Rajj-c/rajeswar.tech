'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, FileText, ArrowRight } from 'lucide-react';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ResumeModal({ isOpen, onClose, onConfirm }: ResumeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[var(--secondary-bg)] border border-[var(--card-border-color)] rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(255,215,0,0.1)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center mb-6 text-[var(--accent-color)]">
                                <AlertCircle size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Just a Heads Up! 🎓</h3>
                            <div className="w-12 h-1 bg-[var(--accent-color)] rounded-full mb-6"></div>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                I&apos;m currently a <span className="text-white font-semibold">B.Tech 3rd Year Student</span>.
                            </p>

                            <p className="text-gray-400 text-sm mb-8 bg-white/5 p-4 rounded-xl border border-white/5 italic">
                                &quot;My journey is still unfolding. What you&apos;re about to see is a snapshot of my growth, not the final destination. Thanks for checking it out!&quot;
                            </p>

                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 py-3 px-4 rounded-xl bg-[var(--accent-color)] text-black font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
                                >
                                    View Resume
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
