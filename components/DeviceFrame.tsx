import React from 'react';
import { Theme } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  theme: Theme;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full h-full md:h-screen flex flex-col items-center justify-center transition-colors duration-700 md:p-8 overflow-hidden
      ${isDark ? 'bg-[#0f0f12]' : 'bg-[#e0e2e5]'}
    `}>
      {/* The Physical Device Casing */}
      <div className={`
        relative w-full max-w-5xl h-[100dvh] md:h-[90vh] md:max-h-[900px]
        ${isDark 
          ? 'bg-[#1a1a1a] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]' 
          : 'bg-[#d8d8dd] shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8)]'}
        md:rounded-[2.5rem] flex flex-col overflow-hidden transition-colors duration-500
        group
      `}>
        
        {/* === HARDWARE DETAILING === */}

        {/* 1. Texture Overlay on Chassis */}
        <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none z-0"></div>

        {/* 2. Screws (Corners) */}
        <div className={`hidden md:block absolute top-4 left-4 w-3 h-3 rounded-full border ${isDark ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-400 bg-neutral-300'} flex items-center justify-center shadow-inner`}>
             <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-900' : 'bg-neutral-400'} rotate-45`}></div>
        </div>
        <div className={`hidden md:block absolute top-4 right-4 w-3 h-3 rounded-full border ${isDark ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-400 bg-neutral-300'} flex items-center justify-center shadow-inner`}>
             <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-900' : 'bg-neutral-400'} -rotate-12`}></div>
        </div>
        <div className={`hidden md:block absolute bottom-4 left-4 w-3 h-3 rounded-full border ${isDark ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-400 bg-neutral-300'} flex items-center justify-center shadow-inner`}>
             <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-900' : 'bg-neutral-400'} rotate-90`}></div>
        </div>
        <div className={`hidden md:block absolute bottom-4 right-4 w-3 h-3 rounded-full border ${isDark ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-400 bg-neutral-300'} flex items-center justify-center shadow-inner`}>
             <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-900' : 'bg-neutral-400'} rotate-0`}></div>
        </div>

        {/* 3. Top Sensor Array / Speaker Mesh */}
        <div className={`hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 rounded-b-2xl z-50 items-center justify-center gap-4 border-b border-x shadow-lg
            ${isDark ? 'bg-[#111] border-[#222]' : 'bg-[#e5e5e5] border-[#ccc]'}
        `}>
             {/* Camera Lens */}
             <div className="w-3 h-3 rounded-full bg-[#050505] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/30 rounded-full blur-[0.5px]"></div>
             </div>
             {/* Speaker Grille */}
             <div className="flex gap-0.5">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-0.5 h-3 bg-black/80 rounded-full"></div>
                ))}
             </div>
        </div>

        {/* 4. Physical Power Button (Side) */}
        <div className={`hidden md:block absolute -right-[2px] top-40 w-1.5 h-12 rounded-r-md border-l border-black/20 z-0 transition-transform active:translate-x-[-2px]
             ${isDark ? 'bg-[#2a2a2a] shadow-[-2px_0_5px_rgba(0,0,0,0.5)]' : 'bg-[#b0b0b0] shadow-[-2px_0_5px_rgba(0,0,0,0.2)]'}
        `}></div>
        
        {/* 5. Volume Rocker (Side) */}
        <div className={`hidden md:block absolute -left-[2px] top-40 w-1.5 h-20 rounded-l-md border-r border-black/20 z-0
             ${isDark ? 'bg-[#2a2a2a] shadow-[2px_0_5px_rgba(0,0,0,0.5)]' : 'bg-[#b0b0b0] shadow-[2px_0_5px_rgba(0,0,0,0.2)]'}
        `}>
             {/* Physical decoration on button */}
             <div className="absolute top-1/2 w-full h-[1px] bg-black/20"></div>
        </div>

        {/* 6. Power LED Indicator (Bottom Right) */}
        <div className="hidden md:flex absolute bottom-6 right-10 z-50 items-center gap-2">
            <span className={`text-[9px] font-mono tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>PWR</span>
            <div className={`w-1.5 h-1.5 rounded-full bg-tech-orange animate-pulse-led`}></div>
        </div>

        {/* === SCREEN BEZEL === */}
        <div className={`flex-1 md:my-5 md:mx-6 md:rounded-[1.5rem] overflow-hidden relative transition-all duration-500
            ${isDark 
              ? 'bg-black border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,1)]' 
              : 'bg-[#f0f0f2] border-[#c0c0c0] shadow-[inset_0_0_15px_rgba(0,0,0,0.15)]'}
            border-2 md:border-[6px] 
        `}>
           
           {/* Screen Glare / Reflection (Diagonal) */}
           <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 rounded-[1rem]"></div>

           {/* Scanline Overlay (Only in dark mode) */}
           <div className={`absolute inset-0 z-40 pointer-events-none scanlines mix-blend-overlay transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-0'}`}></div>
           {/* CRT Vignette (Only in dark mode) */}
           <div className={`absolute inset-0 z-40 pointer-events-none crt-glow transition-opacity duration-500 ${isDark ? 'opacity-80' : 'opacity-0'}`}></div>
           
           {/* Screen Content Container */}
           <div className={`relative z-30 w-full h-full flex flex-col ${isDark ? 'text-neutral-200' : 'text-ink-black'}`}>
             {children}
           </div>
        </div>
        
      </div>
    </div>
  );
};