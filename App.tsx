import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Hero from './components/Hero';
import ResumeSection from './components/ResumeSection';
import ProjectGallery from './components/ProjectGallery';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-brand-black bg-white selection:bg-black selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation (Simple Sticky) */}
      <nav className="fixed top-0 w-full z-40 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none">
        <div className="text-2xl font-bold tracking-tighter pointer-events-auto">Q.</div>
        <a href="mailto:akita_terry@163.com" className="text-sm font-medium border border-white/20 px-4 py-2 rounded-full pointer-events-auto hover:bg-white hover:text-black transition-colors">
          联系我
        </a>
      </nav>

      <main>
        <Hero />
        <ProjectGallery />
        <ResumeSection />
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">期待与您共创精彩</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-sm text-gray-500 mb-12">
             <div className="flex items-center justify-center gap-2 hover:text-black transition-colors">
                <Phone size={16} />
                <span>195 1240 5629</span>
             </div>
             <div className="flex items-center justify-center gap-2 hover:text-black transition-colors">
                <Mail size={16} />
                <span>akita_terry@163.com</span>
             </div>
             <div className="flex items-center justify-center gap-2 hover:text-black transition-colors">
                <MapPin size={16} />
                <span>上海, 松江九亭</span>
             </div>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} 邱谦业. Designed with React & Tailwind.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg z-50 hover:bg-gray-800 transition-colors"
      >
        <ArrowUp size={20} />
      </motion.button>
    </div>
  );
};

export default App;