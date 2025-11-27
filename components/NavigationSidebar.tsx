import React from 'react';
import { Category } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface NavigationSidebarProps {
  activeCategory: Category;
  onSelect: (c: Category) => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="w-16 md:w-20 border-r border-neutral-800 flex flex-col items-center py-6 gap-6 bg-oled-black z-50 relative">
      {Object.values(Category).map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm transition-all duration-300 group
              ${isActive ? 'bg-tech-orange text-black shadow-[0_0_15px_rgba(255,85,0,0.5)]' : 'bg-neutral-900 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'}
            `}
          >
            {/* Active Indicator Line */}
            {isActive && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-tech-orange rounded-r-sm" />
            )}
            
            {CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS]}
            
            {/* Tooltip style label - Fixed Z-Index to be higher than content */}
            <span className="absolute left-14 bg-neutral-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono tracking-wider z-[60] border border-neutral-700 shadow-xl top-1/2 -translate-y-1/2">
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
};