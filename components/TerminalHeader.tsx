import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Radio } from 'lucide-react';

export const TerminalHeader: React.FC = () => {
  const [time, setTime] = useState('');

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
    <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-oled-black text-industrial-gray text-xs font-mono uppercase tracking-widest select-none z-10 relative">
      <div className="flex items-center gap-4">
        <span className="text-tech-orange font-bold">TERRY.OS <span className="text-[10px] opacity-60">v2.4</span></span>
        <span className="flex items-center gap-1 opacity-70"><Radio size={12} /> 5G</span>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 opacity-50">
        SYS.READY
      </div>

      <div className="flex items-center gap-4">
        <span className="opacity-90">{time}</span>
        <div className="flex items-center gap-1 text-tech-orange">
          <span className="text-[10px]">94%</span>
          <Battery size={14} className="fill-current" />
        </div>
      </div>
    </div>
  );
};