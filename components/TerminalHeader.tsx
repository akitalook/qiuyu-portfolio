import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface TerminalHeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ theme, onToggleTheme }) => {
  const [time, setTime] = useState('');
  const isDark = theme === 'dark';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`
      flex items-center justify-between px-3 md:px-5 py-3 border-b-2 text-xs font-mono uppercase tracking-widest select-none z-10 relative transition-colors duration-500
      ${isDark 
        ? 'bg-[#151515] border-[#222] text-industrial-gray shadow-[0_5px_15px_rgba(0,0,0,0.5)]' 
        : 'bg-[#e8e8e8] border-[#d1d1d1] text-neutral-600 shadow-[0_2px_10px_rgba(0,0,0,0.05)]'}
    `}>
      
      {/* Texture for the panel */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>

      {/* Left Screw */}
      <div className={`hidden md:block absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border ${isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
         <div className="w-full h-[1px] bg-current opacity-30 rotate-45 absolute top-1/2 -translate-y-1/2"></div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 min-w-0 pl-4">
        <div className={`flex items-center gap-2 px-2 py-1 rounded border ${isDark ? 'bg-black/30 border-white/5' : 'bg-white/50 border-black/5'}`}>
            <div className="w-2 h-2 bg-tech-orange rounded-full animate-pulse shadow-[0_0_5px_#ff5500]"></div>
            <span className="text-tech-orange font-black whitespace-nowrap tracking-tighter">TERRY.OS <span className="text-[10px] opacity-60 font-normal ml-1">v2.4</span></span>
        </div>
        <div className="h-4 w-[1px] bg-current opacity-20 hidden md:block"></div>
        <span className="flex items-center gap-1 opacity-70"><Wifi size={12} /> <span className="hidden sm:inline">5G_NET</span></span>
      </div>
      
      {/* Center Label - hidden on mobile */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 hidden md:block px-3 py-1 rounded text-[10px] font-bold tracking-[0.2em] border
          ${isDark ? 'bg-[#0a0a0a] border-[#333] text-neutral-500 shadow-inner' : 'bg-[#f0f0f0] border-[#ccc] text-neutral-400 shadow-inner'}
      `}>
        SYS.READY
      </div>

      <div className="flex items-center gap-3 md:gap-5 shrink-0 pr-2">
        
        {/* Skeuomorphic Circular Toggle Button */}
        <button 
            onClick={onToggleTheme}
            className={`
                relative w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center group outline-none
                ${isDark 
                    ? 'bg-[#1a1a1a] border-[#333] shadow-[2px_2px_5px_#000,-1px_-1px_3px_#333] active:translate-y-[1px] active:shadow-[inset_2px_2px_5px_#000]' 
                    : 'bg-[#e0e0e0] border-[#ccc] shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] active:translate-y-[1px] active:shadow-[inset_2px_2px_5px_#bebebe]'
                }
            `}
            aria-label="Toggle Theme"
        >
            {/* Tactile Surface Noise */}
            <div className="absolute inset-0 bg-noise opacity-[0.1] rounded-full pointer-events-none"></div>
            
            {/* Icon */}
            {isDark ? (
                <Moon size={14} className="text-tech-orange drop-shadow-[0_0_5px_rgba(255,85,0,0.8)] relative z-10" />
            ) : (
                <Sun size={14} className="text-orange-500 relative z-10" />
            )}
        </button>

        <div className={`h-8 w-[1px] ${isDark ? 'bg-[#222]' : 'bg-[#ccc]'}`}></div>

        <span className="opacity-90 font-mono tabular-nums tracking-wider">{time}</span>
        
        <div className="flex items-center gap-1 text-tech-orange">
          <Battery size={16} className="fill-current drop-shadow-[0_0_3px_rgba(255,85,0,0.4)]" />
        </div>
      </div>
      
      {/* Right Screw */}
      <div className={`hidden md:block absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border ${isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
         <div className="w-full h-[1px] bg-current opacity-30 rotate-12 absolute top-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};