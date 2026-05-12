'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Home, Briefcase } from 'lucide-react';

export default function BackToHome() {
    return (
        <section className="py-20 bg-[var(--primary-bg)] border-t border-white/5 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[var(--accent-color)]/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 max-w-2xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-4">
                        You've seen the full journey
                    </p>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                        Ready to work together?
                    </h2>
                    <p className="text-gray-500 text-sm mb-10">
                        Head back to see my services, live demo works, and get in touch.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary: back to home */}
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-color)] text-black font-bold rounded-full text-sm shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1 duration-300" />
                            Back to Home
                        </Link>

                        {/* Secondary: go to services */}
                        <Link
                            href="/#services"
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-gray-300 font-semibold rounded-full text-sm hover:border-white/25 hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-300"
                        >
                            <Briefcase size={16} />
                            View Services
                        </Link>
                    </div>

                    {/* Breadcrumb */}
                    <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-700">
                        <Link href="/" className="hover:text-gray-400 transition-colors flex items-center gap-1">
                            <Home size={11} />
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-500">Academic Journey</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
