'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Facebook, Instagram, Send } from 'lucide-react';

export default function Contact() {
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
                        <form action="https://formspree.io/f/mldllgob" method="POST" className="bg-[var(--secondary-bg)]/50 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
                            {/* Subtle gradient border effect via pseudo element? simplified for now */}

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

                                <button type="submit" className="w-full btn-primary py-4 text-lg font-bold uppercase tracking-tight flex items-center justify-center gap-3 group/btn">
                                    Send Message
                                    <Send size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
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
                        <div className="bg-[var(--secondary-bg)]/50 border border-white/10 p-8 rounded-2xl h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-[var(--accent-color)] text-black rounded-lg">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Email Me</p>
                                            <a href="mailto:rajeshwarcn@gmail.com" className="text-white hover:text-[var(--accent-color)] font-medium text-lg transition-colors">rajeshwarcn@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-[var(--accent-color)] text-black rounded-lg">
                                            <Linkedin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">LinkedIn</p>
                                            <a href="https://linkedin.com/in/rajeswarcharapalli" target="_blank" className="text-white hover:text-[var(--accent-color)] font-medium text-lg transition-colors">Connect Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Socials</p>
                                <div className="flex gap-3">
                                    <a href="https://linkedin.com/in/rajeswarcharapalli" target="_blank" className="p-3 bg-white/5 rounded-full text-white hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-1"><Linkedin size={20} /></a>
                                    <a href="https://x.com/Charapalli87056" target="_blank" className="p-3 bg-white/5 rounded-full text-white hover:bg-black hover:text-white transition-all transform hover:-translate-y-1"><Twitter size={20} /></a>
                                    <a href="https://www.facebook.com/share/1FChJNUfjG/" target="_blank" className="p-3 bg-white/5 rounded-full text-white hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1"><Facebook size={20} /></a>
                                    <a href="https://www.instagram.com/rajeswar_chowdary" target="_blank" className="p-3 bg-white/5 rounded-full text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 transition-all transform hover:-translate-y-1"><Instagram size={20} /></a>
                                </div>
                            </div>
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
