'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeModal from './ResumeModal';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certs', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleResumeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowResumeModal(true);
    };

    const confirmResume = () => {
        setShowResumeModal(false);
        window.open("https://drive.google.com/file/d/1NidOifn_ppMyBdD1XQuCgpWBoQHQA6ML/view?usp=drive_link", "_blank");
    };

    return (
        <>
            <ResumeModal
                isOpen={showResumeModal}
                onClose={() => setShowResumeModal(false)}
                onConfirm={confirmResume}
            />

            {/* Desktop Floating Dock */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"
            >
                <nav className="pointer-events-auto bg-[rgba(15,15,15,0.6)] backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-2 py-1 text-sm font-medium text-gray-400 hover:text-[var(--accent-color)] transition-colors duration-300 group"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[var(--accent-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </Link>
                    ))}

                    {/* CTA Button in Nav */}
                    <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
                    <button
                        onClick={handleResumeClick}
                        className="text-xs font-bold bg-[var(--primary-text)] text-black px-4 py-2 rounded-full hover:bg-[var(--accent-color)] transition-colors"
                    >
                        Resume
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Header (Standard sticky but premium) */}
            <header className="md:hidden fixed w-full top-0 z-50 bg-[var(--primary-bg)]/80 backdrop-blur-lg border-b border-white/5">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="#home" className="text-xl font-bold font-[var(--font-outfit)] tracking-tighter text-[var(--accent-color)]">
                        RC.
                    </Link>

                    <button
                        className="text-[var(--primary-text)] focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[var(--primary-bg)] z-40 flex flex-col items-center justify-center space-y-8 md:hidden pt-20"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-3xl font-light text-[var(--primary-text)] hover:text-[var(--accent-color)] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={(e) => {
                                setIsOpen(false);
                                handleResumeClick(e);
                            }}
                            className="text-xl font-bold text-[var(--accent-color)] border border-[var(--accent-color)] px-6 py-2 rounded-full"
                        >
                            View Resume
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
