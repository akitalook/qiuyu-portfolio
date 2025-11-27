import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-900 md:p-8">
      {/* The Physical Device Casing */}
      <div className="relative w-full max-w-5xl h-full md:h-[800px] bg-[#1a1a1a] md:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-[#2a2a2a] ring-1 ring-black/50">
        
        {/* Hardware Detail: Top Speaker/Sensor Mesh */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-xl z-50 items-center justify-center gap-2 border-b border-x border-[#2a2a2a]">
             <div className="w-1.5 h-1.5 rounded-full bg-[#050505] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
             <div className="w-12 h-1 rounded-full bg-[#050505] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
        </div>

        {/* Hardware Detail: Side Buttons */}
        <div className="hidden md:block absolute -right-1 top-32 w-1 h-16 bg-[#2a2a2a] rounded-r-md shadow-lg border-l border-black/50"></div>
        <div className="hidden md:block absolute -right-1 top-52 w-1 h-16 bg-[#2a2a2a] rounded-r-md shadow-lg border-l border-black/50"></div>
        <div className="hidden md:block absolute -left-1 top-32 w-1 h-10 bg-tech-orange rounded-l-md shadow-[0_0_10px_rgba(255,85,0,0.5)]"></div>

        {/* Inner Bezel */}
        <div className="flex-1 md:m-3 bg-black md:rounded-[1.5rem] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-[#333]">
           {/* Scanline Overlay */}
           <div className="absolute inset-0 z-40 pointer-events-none scanlines opacity-30 mix-blend-overlay"></div>
           {/* CRT Vignette/Glow */}
           <div className="absolute inset-0 z-40 pointer-events-none crt-glow"></div>
           
           {/* Screen Content */}
           <div className="relative z-30 w-full h-full flex flex-col text-neutral-200">
             {children}
           </div>
        </div>
        
      </div>
    </div>
  );
};