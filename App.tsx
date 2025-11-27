import React, { useState } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { TerminalHeader } from './components/TerminalHeader';
import { NavigationSidebar } from './components/NavigationSidebar';
import { ContentArea } from './components/ContentArea';
import { Category } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.PROFILE);

  return (
    <DeviceFrame>
      <TerminalHeader />
      <div className="flex flex-1 overflow-hidden relative">
        <NavigationSidebar 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
        <main className="flex-1 relative bg-oled-black">
          <ContentArea category={activeCategory} />
        </main>
      </div>
    </DeviceFrame>
  );
}

export default App;