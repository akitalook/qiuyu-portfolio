import React from 'react';
import { Category, Theme } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface NavigationSidebarProps {
  activeCategory: Category;
  onSelect: (c: Category) => void;
  theme: Theme;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activeCategory, onSelect, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`
      w-16 md:w-24 border-r-2 flex flex-col items-center py-6 gap-6 z-50 relative transition-colors duration-500
      ${isDark 
        ? 'bg-[#151515] border-[#222] shadow-[5px_0_15px_rgba(0,0,0,0.2)]' 
        : 'bg-[#e8e8e8] border-[#d1d1d1] shadow-[2px_0_10px_rgba(0,0,0,0.05)]'}
    `}>
      
      {/* Decorative Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>

      {Object.values(Category).map((cat) => {
        const isActive = activeCategory === cat;
        
        // Skeuomorphic Button Styles
        const baseStyle = `relative w-10 h-10 md:w-14 md:h-14 flex flex-col items-center justify-center rounded-lg transition-all duration-150 active:scale-95 active:shadow-inner`;
        
        const darkStyle = isActive
            ? 'bg-[#1a1a1a] shadow-[inset_2px_2px_5px_#000,inset_-2px_-2px_5px_#333] border border-[#333]' // Pressed Dark
            : 'bg-gradient-to-br from-[#2a2a2a] to-[#151515] shadow-[5px_5px_10px_#0a0a0a,-5px_-5px_10px_#252525] hover:from-[#333] hover:to-[#1a1a1a]'; // Unpressed Dark
            
        const lightStyle = isActive
            ? 'bg-[#e0e0e0] shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] border border-[#d1d1d1]' // Pressed Light
            : 'bg-gradient-to-br from-[#ffffff] to-[#e6e6e6] shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff] hover:to-[#f0f0f0]'; // Unpressed Light

        const iconColor = isActive 
            ? 'text-tech-orange drop-shadow-[0_0_5px_rgba(255,85,0,0.8)]' 
            : isDark ? 'text-neutral-500 group-hover/btn:text-neutral-300' : 'text-neutral-400 group-hover/btn:text-neutral-600';

        return (
          // Added 'group/btn' to strictly scope hover effects to this container
          <div key={cat} className="relative flex items-center group/btn">
            
            {/* LED Status Light (Left of button) */}
            <div className={`
                absolute -left-3 md:-left-4 w-1 h-3 rounded-full transition-all duration-300
                ${isActive 
                    ? 'bg-tech-orange shadow-[0_0_10px_#ff5500] opacity-100' 
                    : 'bg-neutral-500 opacity-20'}
            `}></div>

            <button
              onClick={() => onSelect(cat)}
              className={`
                ${baseStyle}
                ${isDark ? darkStyle : lightStyle}
              `}
            >
              {/* Tactile Surface Noise */}
              <div className="absolute inset-0 bg-noise opacity-[0.05] rounded-lg pointer-events-none"></div>

              {/* Icon */}
              <div className={`transition-all duration-200 transform ${isActive ? 'scale-110' : 'scale-100'} ${iconColor}`}>
                {CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS]}
              </div>

            </button>
            
            {/* Tooltip - Only appears when hovering group/btn */}
            <div className={`
              absolute left-[120%] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded opacity-0 group-hover/btn:opacity-100 transition-all duration-200 pointer-events-none z-[70] shadow-xl whitespace-nowrap
              ${isDark ? 'bg-[#111] text-white border border-[#333]' : 'bg-white text-black border border-[#ccc]'}
            `}>
               {/* Arrow */}
               <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b
                  ${isDark ? 'bg-[#111] border-[#333]' : 'bg-white border-[#ccc]'}
               `}></div>
               
               <span className="text-[10px] font-mono tracking-wider font-bold relative z-10">{cat}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};