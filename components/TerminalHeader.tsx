import React, { useState, useEffect } from 'react';
import { Battery, Radio, Sun, Moon } from 'lucide-react';
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
      flex items-center justify-between px-3 md:px-6 py-3 border-b text-xs font-mono uppercase tracking-widest select-none z-10 relative transition-colors duration-500
      ${isDark ? 'bg-oled-black border-neutral-800 text-industrial-gray' : 'bg-paper-white border-neutral-300 text-neutral-600'}
    `}>
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <span className="text-tech-orange font-bold whitespace-nowrap">TERRY.OS <span className="text-[10px] opacity-60 hidden xs:inline">v2.4</span></span>
        <span className="flex items-center gap-1 opacity-70"><Radio size={12} /> <span className="hidden sm:inline">5G</span></span>
      </div>
      
      {/* Hidden on mobile to prevent overlap */}
      <div className="absolute left-1/2 transform -translate-x-1/2 opacity-50 hidden md:block">
        SYS.READY
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme} 
          className={`p-1.5 rounded-full transition-colors ${isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-200 text-neutral-500'}`}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <span className="opacity-90">{time}</span>
        <div className="flex items-center gap-1 text-tech-orange">
          <span className="text-[10px] hidden xs:inline">94%</span>
          <Battery size={14} className="fill-current" />
        </div>
      </div>
    </div>
  );
};