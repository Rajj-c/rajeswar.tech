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
        window.open("https://drive.google.com/file/d/171r1Xac3pCxE1UbIiep9yhefYsGzC0Va/view?usp=sharing", "_blank");
    };

    return (
        <>
            <ResumeModal
                isOpen={showResumeModal}
                onClose={() => setShowResumeModal(false)}
                onConfirm={confirmResume}
            />

            {/* Desktop Left-Side Project Structure Menu (click-based, same as mobile) */}
            <div className="fixed top-6 left-6 z-[100] hidden md:block">
                <div className="relative inline-block text-black font-mono text-sm">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-3 px-4 transition-transform hover:scale-105 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 14" height="20" width="20">
                            <path fill="#FFA000" d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z"></path>
                            <path fill="#FFCA28" d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z"></path>
                        </svg>
                        <p className="font-bold">Project Structure</p>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute left-0 mt-4 w-64 bg-white border border-gray-200 rounded-md shadow-2xl z-50 origin-top-left text-sm"
                                >
                                    <ul className="p-4 space-y-1">
                                        <li className="py-1 font-bold text-gray-700">📁 src</li>
                                        <li className="pl-4 py-1 text-gray-600">📁 app</li>
                                        <Link href="#home" onClick={() => setIsOpen(false)}><li className="pl-8 py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-blue-600 font-semibold">📄 page.tsx <span className="text-xs text-gray-400 font-normal">(Home)</span></li></Link>
                                        <li className="pl-4 py-1 mt-2 text-gray-600">📁 components</li>
                                        <Link href="#about" onClick={() => setIsOpen(false)}><li className="pl-8 py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-yellow-600 font-semibold">📄 About.tsx</li></Link>
                                        <Link href="#projects" onClick={() => setIsOpen(false)}><li className="pl-8 py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-green-600 font-semibold">📄 Projects.tsx</li></Link>
                                        <Link href="#skills" onClick={() => setIsOpen(false)}><li className="pl-8 py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-purple-600 font-semibold">📄 Skills.tsx</li></Link>
                                        <Link href="#contact" onClick={() => setIsOpen(false)}><li className="pl-8 py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-red-500 font-semibold">📄 Contact.tsx</li></Link>
                                    </ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

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

                    {/* Mobile Project Structure Menu (Replacing Hamburger) */}
                    <div className="relative inline-block text-black font-mono text-sm z-50">
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-white py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-2 px-3 transition-transform active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 14" height="20" width="20">
                                <path fill="#FFA000" d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z"></path>
                                <path fill="#FFCA28" d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z"></path>
                            </svg>
                            <p className="font-bold text-xs truncate">Menu</p>
                        </div>

                        {/* Dropdown for Mobile */}
                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    {/* Invisible backdrop to catch clicks outside */}
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setIsOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className="absolute right-0 mt-4 w-64 bg-white border border-gray-200 rounded-md shadow-2xl z-50 origin-top-right text-sm"
                                    >
                                        <ul className="p-4 space-y-1 text-left">
                                            <li className="py-1 font-bold text-gray-700">📁 src</li>
                                            <li className="pl-4 py-1 text-gray-600">📁 app</li>
                                            <Link href="#home" onClick={() => setIsOpen(false)}><li className="pl-8 py-2 md:py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-blue-600 font-semibold active:bg-gray-200">📄 page.tsx <span className="text-xs text-gray-400 font-normal">(Home)</span></li></Link>
                                            <li className="pl-4 py-1 mt-2 text-gray-600">📁 components</li>
                                            <Link href="#about" onClick={() => setIsOpen(false)}><li className="pl-8 py-2 md:py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-yellow-600 font-semibold active:bg-gray-200">📄 About.tsx</li></Link>
                                            <Link href="#projects" onClick={() => setIsOpen(false)}><li className="pl-8 py-2 md:py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-green-600 font-semibold active:bg-gray-200">📄 Projects.tsx</li></Link>
                                            <Link href="#skills" onClick={() => setIsOpen(false)}><li className="pl-8 py-2 md:py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-purple-600 font-semibold active:bg-gray-200">📄 Skills.tsx</li></Link>
                                            <Link href="#contact" onClick={() => setIsOpen(false)}><li className="pl-8 py-2 md:py-1.5 hover:bg-gray-100 cursor-pointer rounded transition-colors text-red-500 font-semibold active:bg-gray-200">📄 Contact.tsx</li></Link>
                                        </ul>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    );
}
