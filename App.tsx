import React, { useState } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { TerminalHeader } from './components/TerminalHeader';
import { NavigationSidebar } from './components/NavigationSidebar';
import { ContentArea } from './components/ContentArea';
import { Category, Theme } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.PROFILE);
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <DeviceFrame theme={theme}>
      <TerminalHeader theme={theme} onToggleTheme={toggleTheme} />
      <div className={`flex flex-1 overflow-hidden relative ${theme === 'light' ? 'light-mode' : ''}`}>
        <NavigationSidebar 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory}
          theme={theme}
        />
        <main className={`flex-1 relative ${theme === 'dark' ? 'bg-oled-black' : 'bg-paper-white'} transition-colors duration-500`}>
          <ContentArea category={activeCategory} theme={theme} />
        </main>
      </div>
    </DeviceFrame>
  );
}

export default App;