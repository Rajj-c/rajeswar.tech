'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, GraduationCap, ChevronDown } from 'lucide-react';
import ResumeModal from './ResumeModal';

// ── Nav link definitions per page ─────────────────────────────────────────────
const homeLinks = [
    { name: 'Home',         href: '#home' },
    { name: 'Services',     href: '#services' },
    { name: 'Pricing',      href: '#pricing' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact',      href: '#contact' },
];

const aboutLinks = [
    { name: 'About',        href: '#about' },
    { name: 'Education',    href: '#education' },
    { name: 'Experience',   href: '#experience' },
    { name: 'Projects',     href: '#projects' },
    { name: 'Skills',       href: '#skills' },
    { name: 'Certs',        href: '#certifications' },
];

// ── File-tree structure per page ───────────────────────────────────────────────
const homeTree = [
    { label: '📁 src / app', folder: true, indent: 0 },
    { label: '📄 page.tsx', sub: '(Home)', href: '/', color: 'text-blue-600', indent: 1 },
    { label: '📄 about / page.tsx', sub: '🎓 Journey', href: '/about', color: 'text-purple-600', indent: 1 },
    { label: '📁 Home sections', folder: true, indent: 0 },
    { label: '📄 Hero.tsx',           href: '#home',         color: 'text-sky-500',    indent: 1 },
    { label: '📄 Services.tsx',       href: '#services',     color: 'text-teal-500',   indent: 1 },
    { label: '📄 Pricing.tsx',        href: '#pricing',      color: 'text-amber-400',  indent: 1 },
    { label: '📄 Achievements.tsx',   href: '#achievements', color: 'text-amber-500',  indent: 1 },
    { label: '📄 Contact.tsx',        href: '#contact',      color: 'text-red-500',    indent: 1 },
    { label: '📁 Journey (/about)', folder: true, indent: 0 },
    { label: '📄 About.tsx',          href: '/about',        color: 'text-yellow-600', indent: 1 },
    { label: '📄 Education.tsx',      href: '/about',        color: 'text-orange-500', indent: 1 },
    { label: '📄 Experience.tsx',     href: '/about',        color: 'text-blue-400',   indent: 1 },
    { label: '📄 Projects.tsx',       href: '/about',        color: 'text-green-600',  indent: 1 },
    { label: '📄 Skills.tsx',         href: '/about',        color: 'text-purple-600', indent: 1 },
    { label: '📄 Certifications.tsx', href: '/about',        color: 'text-indigo-500', indent: 1 },
];

const aboutTree = [
    { label: '📁 src / app', folder: true, indent: 0 },
    { label: '📄 page.tsx', sub: '🏠 Home', href: '/', color: 'text-blue-600', indent: 1 },
    { label: '📄 about / page.tsx', sub: '(active)', href: '/about', color: 'text-purple-600', indent: 1 },
    { label: '📁 Journey sections', folder: true, indent: 0 },
    { label: '📄 About.tsx',          href: '#about',          color: 'text-yellow-600', indent: 1 },
    { label: '📄 Education.tsx',      href: '#education',      color: 'text-orange-500', indent: 1 },
    { label: '📄 Experience.tsx',     href: '#experience',     color: 'text-blue-400',   indent: 1 },
    { label: '📄 Projects.tsx',       href: '#projects',       color: 'text-green-600',  indent: 1 },
    { label: '📄 Skills.tsx',         href: '#skills',         color: 'text-purple-600', indent: 1 },
    { label: '📄 Certifications.tsx', href: '#certifications', color: 'text-indigo-500', indent: 1 },
];

// ── FileTree component ────────────────────────────────────────────────────────
function FileTree({
    items,
    onClose,
    mobile = false,
}: {
    items: typeof homeTree;
    onClose: () => void;
    mobile?: boolean;
}) {
    const py = mobile ? 'py-2' : 'py-1.5';
    return (
        <ul className="p-4 space-y-0.5">
            {items.map((item, i) =>
                item.folder ? (
                    <li key={i} className="py-1 font-bold text-gray-700 text-sm mt-2 first:mt-0">
                        {item.label}
                    </li>
                ) : (
                    <Link key={i} href={item.href!} onClick={onClose}>
                        <li
                            className={`${py} pl-${item.indent === 1 ? '5' : '0'} hover:bg-gray-100 active:bg-gray-200 cursor-pointer rounded-lg transition-colors text-sm font-semibold flex items-center gap-1.5 ${item.color}`}
                        >
                            <span className="truncate">{item.label}</span>
                            {item.sub && (
                                <span className="text-[10px] text-gray-400 font-normal flex-shrink-0">
                                    {item.sub}
                                </span>
                            )}
                        </li>
                    </Link>
                )
            )}
        </ul>
    );
}

// ── Folder icon SVG ───────────────────────────────────────────────────────────
function FolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 14" height="18" width="18">
            <path fill="#FFA000" d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z" />
            <path fill="#FFCA28" d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z" />
        </svg>
    );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
    const pathname = usePathname();
    const isAbout = pathname === '/about';

    const [isOpen, setIsOpen] = useState(false);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => setIsOpen(false), [pathname]);

    const navLinks = isAbout ? aboutLinks : homeLinks;
    const treeItems = isAbout ? aboutTree : homeTree;

    const confirmResume = () => {
        setShowResumeModal(false);
        window.open('https://drive.google.com/file/d/171r1Xac3pCxE1UbIiep9yhefYsGzC0Va/view?usp=sharing', '_blank');
    };

    return (
        <>
            <ResumeModal
                isOpen={showResumeModal}
                onClose={() => setShowResumeModal(false)}
                onConfirm={confirmResume}
            />

            {/* ── Desktop: Left Project Structure button ── */}
            <div className="fixed top-6 left-6 z-[100] hidden md:block">
                <div className="relative inline-block text-black font-mono text-sm">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white py-2 rounded-lg shadow-lg hover:shadow-xl hover:cursor-pointer flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95"
                        aria-label="Toggle project structure"
                    >
                        <FolderIcon />
                        <span className="font-bold text-[13px]">Project Structure</span>
                        <ChevronDown
                            size={14}
                            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 origin-top-left overflow-hidden"
                                >
                                    {/* Header strip */}
                                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs text-gray-500 font-mono ml-2">rajeswar.tech</span>
                                    </div>
                                    <FileTree items={treeItems} onClose={() => setIsOpen(false)} />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Desktop: Floating Center Nav Dock ── */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"
            >
                <nav className="pointer-events-auto bg-[rgba(10,10,10,0.7)] backdrop-blur-2xl border border-white/10 rounded-full px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-1">

                    {/* Back to Home pill — only on /about */}
                    {isAbout && (
                        <>
                            <Link
                                href="/"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
                            >
                                <ArrowLeft size={13} />
                                Home
                            </Link>
                            <div className="w-px h-4 bg-white/10 mx-1" />
                        </>
                    )}

                    {/* Section links */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200 group"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="w-px h-4 bg-white/10 mx-1" />

                    {/* Cross-page link */}
                    {isAbout ? (
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border border-teal-400/40 text-teal-300 hover:bg-teal-400/10 hover:border-teal-400/70 transition-all duration-200"
                        >
                            🛠️ Hire Me
                        </Link>
                    ) : (
                        <Link
                            href="/about"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border border-blue-400/40 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400/70 transition-all duration-200"
                        >
                            <GraduationCap size={13} />
                            My Journey
                        </Link>
                    )}

                    <div className="w-px h-4 bg-white/10 mx-1" />

                    {/* Resume */}
                    <button
                        onClick={() => setShowResumeModal(true)}
                        className="text-xs font-bold bg-[var(--accent-color)] text-black px-4 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all duration-200"
                    >
                        Resume
                    </button>
                </nav>
            </motion.header>

            {/* ── Mobile Header ── */}
            <header
                className={`md:hidden fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[var(--primary-bg)]/95 backdrop-blur-xl shadow-lg border-b border-white/5'
                    : 'bg-[var(--primary-bg)]/80 backdrop-blur-lg border-b border-white/5'
                    }`}
            >
                <div className="px-4 py-3 flex justify-between items-center">
                    {/* Left: Logo or Back button */}
                    {isAbout ? (
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Home
                        </Link>
                    ) : (
                        <Link href="/" className="text-xl font-extrabold tracking-tighter text-[var(--accent-color)]">
                            RC.
                        </Link>
                    )}

                    {/* Right: Project Structure toggle */}
                    <div className="relative inline-block text-black font-mono text-sm z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-white py-1.5 rounded-lg shadow-md hover:cursor-pointer flex items-center gap-1.5 px-3 transition-all active:scale-95"
                            aria-label="Open menu"
                        >
                            <FolderIcon />
                            <span className="font-bold text-xs">Menu</span>
                            <ChevronDown
                                size={12}
                                className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 origin-top-right overflow-hidden max-h-[80vh] overflow-y-auto"
                                    >
                                        {/* Chrome strip */}
                                        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2 sticky top-0">
                                            <div className="flex gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                            </div>
                                            <span className="text-xs text-gray-500 font-mono ml-2">rajeswar.tech</span>
                                        </div>
                                        <FileTree items={treeItems} onClose={() => setIsOpen(false)} mobile />

                                        {/* Mobile bottom actions */}
                                        <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-col gap-2">
                                            <button
                                                onClick={() => { setIsOpen(false); setShowResumeModal(true); }}
                                                className="w-full py-2.5 bg-[var(--accent-color)] text-black font-bold rounded-xl text-sm hover:brightness-110 transition-all active:scale-95"
                                            >
                                                📄 View Resume
                                            </button>
                                            {isAbout ? (
                                                <Link
                                                    href="/"
                                                    onClick={() => setIsOpen(false)}
                                                    className="w-full py-2.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold rounded-xl text-sm text-center hover:bg-teal-500/20 transition-all"
                                                >
                                                    🛠️ Hire Me
                                                </Link>
                                            ) : (
                                                <Link
                                                    href="/about"
                                                    onClick={() => setIsOpen(false)}
                                                    className="w-full py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold rounded-xl text-sm text-center hover:bg-blue-500/20 transition-all"
                                                >
                                                    🎓 My Academic Journey
                                                </Link>
                                            )}
                                        </div>
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
