'use client';

import { Github, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[var(--secondary-bg)] text-[var(--secondary-text)] border-t border-gray-800 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold text-primary-text mb-2">Rajeswar Charapalli</h3>
                        <p className="text-sm opacity-80">Building the future, one line of code at a time.</p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://linkedin.com/in/rajeswarcharapalli" target="_blank" className="hover:text-[var(--accent-color)] transition-colors transform hover:-translate-y-1"><Linkedin size={24} /></a>
                        <a href="https://github.com/Rajj-c" target="_blank" className="hover:text-[var(--accent-color)] transition-colors transform hover:-translate-y-1"><Github size={24} /></a>
                        <a href="https://x.com/Charapalli87056" target="_blank" className="hover:text-[var(--accent-color)] transition-colors transform hover:-translate-y-1"><Twitter size={24} /></a>
                        <a href="https://www.instagram.com/rajeswar_chowdary" target="_blank" className="hover:text-[var(--accent-color)] transition-colors transform hover:-translate-y-1"><Instagram size={24} /></a>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Rajeswar Charapalli. All rights reserved.</p>
                    <p className="mt-2 flex items-center justify-center gap-1">
                        Designed & Built with <Heart size={16} className="text-[var(--heart-color)] fill-current animate-pulse" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
