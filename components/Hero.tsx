import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, MousePointer2 } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the "spotlight" orb
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax for text
  const textX = useTransform(springX, [0, window.innerWidth], [-20, 20]);
  const textY = useTransform(springY, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the window
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-white selection:bg-blue-500 selection:text-white"
    >
      {/* 1. Dynamic Lighting / Background Gradient Orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-400 opacity-20 blur-[100px] mix-blend-multiply pointer-events-none z-0"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Secondary Ambient Orb (Static but pulsing) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-300 to-blue-200 opacity-30 blur-[120px] mix-blend-multiply z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Noise Texture Overlay for "Premium" Feel */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Floating Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-white/40 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Visual Storyteller</span>
        </motion.div>

        {/* Bold Typography */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative"
        >
          <h1 className="text-[12vw] md:text-[14vw] leading-none font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 drop-shadow-2xl select-none">
             <span className="inline-block hover:text-blue-600 transition-colors duration-500 cursor-default">邱</span>
             <span className="inline-block mx-[0.5vw] hover:text-purple-600 transition-colors duration-500 cursor-default">谦</span>
             <span className="inline-block hover:text-pink-600 transition-colors duration-500 cursor-default">业</span>
          </h1>
          
          {/* Reflection / Shine Effect on Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full -skew-x-12 translate-x-[-100%] animate-[shine_8s_infinite_linear] pointer-events-none"></div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-lg md:text-2xl font-light text-gray-600 max-w-3xl leading-relaxed"
        >
          以<span className="font-semibold text-black">光影</span>重塑想象，用<span className="font-semibold text-black">动态</span>演绎故事。
        </motion.p>

        {/* Interactive Tools Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
           {['Premiere', 'After Effects', 'Blender', 'C4D'].map((tool, i) => (
             <div key={tool} className="group relative px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-default overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <span className="relative font-medium text-gray-600 group-hover:text-black transition-colors text-sm tracking-wide">{tool}</span>
             </div>
           ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 to-transparent relative overflow-hidden">
           <motion.div 
             className="absolute top-0 left-0 w-full h-1/2 bg-gray-800"
             animate={{ y: ['-100%', '200%'] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;