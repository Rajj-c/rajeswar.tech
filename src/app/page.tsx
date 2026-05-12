import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Achievements from '@/components/Achievements';
import AcademicJourneyBanner from '@/components/AcademicJourneyBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-bg overflow-x-clip selection:bg-[var(--accent-color)] selection:text-[var(--primary-bg)]">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Achievements />
      <AcademicJourneyBanner />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
