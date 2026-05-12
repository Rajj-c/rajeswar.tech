import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import BackToHome from '@/components/BackToHome';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
    title: 'Academic Journey | Rajeswar Charapalli',
    description: 'Explore the academic achievements, education, professional experience, projects, skills, and certifications of Rajeswar Charapalli — Full-Stack Developer & SIH Winner.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-primary-bg overflow-x-clip selection:bg-[var(--accent-color)] selection:text-[var(--primary-bg)]">
            <Navbar />
            <About />
            <Education />
            <Experience />
            <Projects />
            <Skills />
            <Certifications />
            <BackToHome />
            <Footer />
            <Chatbot />
        </main>
    );
}
