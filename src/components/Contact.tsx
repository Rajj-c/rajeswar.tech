'use client';

import { motion } from 'framer-motion';
import SocialGrid from './ui/SocialGrid';
import btnStyles from './ui/SendButton.module.css';
import { useState, useRef } from 'react';

export default function Contact() {
    const [isSending, setIsSending] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSending) return;
        setIsSending(true);
        // After animation plays (~2.5s), actually submit the form
        setTimeout(() => {
            formRef.current?.submit();
        }, 2500);
    };
    return (
        <section id="contact" className="py-24 bg-[var(--primary-bg)] relative overflow-hidden border-t border-white/5">
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Connect</h2>
                    <p className="text-[var(--secondary-text)]">Open for collaborations and new opportunities.</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        className="lg:w-2/3"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                    >
                        <form
                            ref={formRef}
                            action="https://api.web3forms.com/submit"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="bg-[var(--secondary-bg)]/50 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden group"
                        >
                            {/* Web3Forms Access Key */}
                            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""} />

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Name</label>
                                        <input type="text" id="name" name="name" placeholder="John Doe" required
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--accent-color)] text-white placeholder-gray-600 transition-all focus:bg-white/10" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Email</label>
                                        <input type="email" id="email" name="_replyto" placeholder="john@example.com" required
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--accent-color)] text-white placeholder-gray-600 transition-all focus:bg-white/10" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Message</label>
                                    <textarea id="message" name="message" rows={6} placeholder="Tell me about your project..." required
                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--accent-color)] text-white placeholder-gray-600 transition-all focus:bg-white/10 resize-none"></textarea>
                                </div>

                                {/* Animated Send Button */}
                                <div className="flex justify-center pt-2">
                                    <button
                                        type="submit"
                                        className={`${btnStyles.button} ${isSending ? btnStyles.sending : ''}`}
                                        disabled={isSending}
                                    >
                                        <div className={btnStyles.mainBorder}>
                                            <div className={btnStyles.main}>
                                                <div className={btnStyles.innerBox}>
                                                    <div className={btnStyles.innerDent}></div>
                                                    <div className={btnStyles.contentRow}>

                                                        {/* Phase 1: plane slides right → Phase 2: flies off with Message */}
                                                        <div className={btnStyles.plane}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <line x1="22" y1="2" x2="11" y2="13"/>
                                                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                                            </svg>
                                                        </div>

                                                        {/* "Send" stays, then morphs to "Sent!" */}
                                                        <div className={btnStyles.sendWrapper}>
                                                            <span className={btnStyles.sendText}>Send</span>
                                                            <span className={btnStyles.sentText}>Sent!</span>
                                                        </div>

                                                        {/* "Message" flies off with the plane */}
                                                        <span className={btnStyles.messageText}>Message</span>
                                                    </div>

                                                    {/* Green checkmark appears after Sent! */}
                                                    <div className={btnStyles.checkmark}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                {/* Follow-up message after send */}
                                <p
                                    className="text-center text-sm text-gray-400 mt-3 transition-all duration-700"
                                    style={{
                                        opacity: isSending ? 1 : 0,
                                        transform: isSending ? 'translateY(0)' : 'translateY(8px)',
                                        transitionDelay: isSending ? '1.6s' : '0s'
                                    }}
                                >
                                    RAJ will get back to you soon! 👋
                                </p>
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="lg:w-1/3 flex flex-col gap-6"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                    >
                        <div className="bg-[var(--secondary-bg)]/50 border border-white/10 p-8 rounded-2xl h-full flex items-center justify-center min-h-[400px]">
                            <SocialGrid />
                        </div>
                    </motion.div>
                </div>

                {/* Footer simple mark */}
                <div className="mt-20 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">© 2025 Rajeswar Charapalli.</p>
                </div>
            </div>
        </section>
    );
}
