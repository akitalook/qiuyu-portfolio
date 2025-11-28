import React from 'react';
import { Theme } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  theme: Theme;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full h-[100dvh] md:h-screen flex items-center justify-center transition-colors duration-500 md:p-8 ${isDark ? 'bg-neutral-900' : 'bg-[#e0e0e0]'}`}>
      {/* The Physical Device Casing */}
      <div className={`
        relative w-full max-w-5xl h-full md:h-[800px] 
        ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-[#d1d1d6] border-[#bbb]'}
        md:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border ring-1 ring-black/10 transition-colors duration-500
      `}>
        
        {/* Hardware Detail: Top Speaker/Sensor Mesh */}
        <div className={`hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 rounded-b-xl z-50 items-center justify-center gap-2 border-b border-x
            ${isDark ? 'bg-[#111] border-[#2a2a2a]' : 'bg-[#c7c7cc] border-[#aaa]'}
        `}>
             <div className="w-1.5 h-1.5 rounded-full bg-[#050505] opacity-80"></div>
             <div className="w-12 h-1 rounded-full bg-[#050505] opacity-80"></div>
        </div>

        {/* Hardware Detail: Side Buttons */}
        <div className={`hidden md:block absolute -right-1 top-32 w-1 h-16 rounded-r-md shadow-lg border-l border-black/10 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#999]'}`}></div>
        <div className={`hidden md:block absolute -right-1 top-52 w-1 h-16 rounded-r-md shadow-lg border-l border-black/10 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#999]'}`}></div>
        <div className="hidden md:block absolute -left-1 top-32 w-1 h-10 bg-tech-orange rounded-l-md shadow-[0_0_10px_rgba(255,85,0,0.5)]"></div>

        {/* Inner Bezel */}
        <div className={`flex-1 md:m-3 md:rounded-[1.5rem] overflow-hidden relative transition-colors duration-500
            ${isDark ? 'bg-black border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,1)]' : 'bg-[#f2f2f7] border-[#ccc] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]'}
            border
        `}>
           {/* Scanline Overlay (Only in dark mode) */}
           <div className={`absolute inset-0 z-40 pointer-events-none scanlines mix-blend-overlay transition-opacity duration-500 ${isDark ? 'opacity-30' : 'opacity-5'}`}></div>
           {/* CRT Vignette/Glow (Only in dark mode) */}
           <div className={`absolute inset-0 z-40 pointer-events-none crt-glow transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>
           
           {/* Screen Content */}
           <div className={`relative z-30 w-full h-full flex flex-col ${isDark ? 'text-neutral-200' : 'text-ink-black'}`}>
             {children}
           </div>
        </div>
        
      </div>
    </div>
  );
};