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
      w-14 md:w-20 border-r flex flex-col items-center py-6 gap-6 z-50 relative transition-colors duration-500
      ${isDark ? 'bg-oled-black border-neutral-800' : 'bg-paper-white border-neutral-300'}
    `}>
      {Object.values(Category).map((cat) => {
        const isActive = activeCategory === cat;
        
        let buttonClass = '';
        if (isActive) {
          buttonClass = 'bg-tech-orange text-black shadow-[0_0_15px_rgba(255,85,0,0.5)]';
        } else {
          if (isDark) {
            buttonClass = 'bg-neutral-900 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800';
          } else {
            buttonClass = 'bg-neutral-200 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-300';
          }
        }

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm transition-all duration-300 group
              ${buttonClass}
            `}
          >
            {/* Active Indicator Line */}
            {isActive && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-tech-orange rounded-r-sm" />
            )}
            
            {CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS]}
            
            {/* Tooltip */}
            <span className={`
              absolute left-14 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono tracking-wider z-[60] shadow-xl top-1/2 -translate-y-1/2
              ${isDark ? 'bg-neutral-800 text-white border border-neutral-700' : 'bg-white text-black border border-neutral-300'}
            `}>
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
};