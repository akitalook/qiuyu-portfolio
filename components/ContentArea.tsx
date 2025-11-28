import React, { useState, useEffect, useRef } from 'react';
import { Category, SkillLevel, Theme, Skill, Project } from '../types';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA, EDUCATION_DATA, SKILLS_DATA } from '../constants';
import { MapPin, Mail, Phone, ExternalLink, Play, Award, ChevronRight, X, Hash, Star, Film, Zap, Terminal } from 'lucide-react';

interface ContentAreaProps {
  category: Category;
  theme: Theme;
}

// === Sub-component: 8-Bit Skill Unit ===
const SkillUnit: React.FC<{ skill: Skill; isDark: boolean; idx: number }> = ({ skill, isDark, idx }) => {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Target percentage based on level
  let baseTarget = 50;
  if (skill.level === SkillLevel.HIGH) baseTarget = 95;
  else if (skill.level === SkillLevel.MEDIUM) baseTarget = 75;
  else if (skill.level === SkillLevel.LOW) baseTarget = 50;

  useEffect(() => {
    // Initial load up animation
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();
    let animationFrameId: number;

    const animateLoad = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        if (elapsed < duration) {
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const ease = 1 - Math.pow(1 - progress, 3); 
            setDisplayPercent(Math.floor(ease * baseTarget));
            animationFrameId = requestAnimationFrame(animateLoad);
        } else {
            setDisplayPercent(baseTarget);
        }
    };
    
    // Add delay based on index
    const delayTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animateLoad);
    }, idx * 100);

    return () => {
        clearTimeout(delayTimer);
        cancelAnimationFrame(animationFrameId);
    };
  }, [baseTarget, idx]);

  // Jitter Effect: Randomly fluctuate the number slightly to look like unstable data
  useEffect(() => {
      if (displayPercent === 0) return; // Don't jitter during initial load if 0

      const interval = setInterval(() => {
          // Jitter range: +/- 2%
          const jitter = Math.floor(Math.random() * 5) - 2; 
          let newVal = baseTarget + jitter;
          // Clamp
          if (newVal > 100) newVal = 100;
          if (newVal < 0) newVal = 0;
          
          setDisplayPercent(newVal);
      }, 150); // Fast update rate

      return () => clearInterval(interval);
  }, [baseTarget, displayPercent]);

  // Colors
  const activeColor = isDark ? 'bg-tech-orange' : 'bg-black';
  const inactiveColor = isDark ? 'bg-[#333]' : 'bg-[#ddd]';
  const textColor = isDark ? 'text-tech-orange' : 'text-black';
  const borderColor = isDark ? 'border-[#333]' : 'border-black';

  // Render the Bit Blocks
  const totalBlocks = 20; // 5% per block
  const activeBlocks = Math.ceil((displayPercent / 100) * totalBlocks);

  return (
    <div 
        className={`relative p-4 border-2 ${borderColor} transition-all duration-300 group
            ${isDark ? 'bg-[#111] hover:border-tech-orange' : 'bg-white hover:border-black'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {/* Corner Accents (Pixel Style) */}
        <div className={`absolute -top-1 -left-1 w-2 h-2 ${activeColor}`}></div>
        <div className={`absolute -top-1 -right-1 w-2 h-2 ${activeColor}`}></div>
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 ${activeColor}`}></div>
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 ${activeColor}`}></div>

        {/* Header */}
        <div className="flex justify-between items-end mb-3">
            <h3 className={`text-xl font-bold font-mono tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                {skill.name}
            </h3>
            <div className={`text-xs font-mono font-bold ${textColor}`}>
                VAL:<span className="tabular-nums inline-block w-8 text-right">{displayPercent}</span>
            </div>
        </div>

        {/* 8-Bit Progress Bar */}
        <div className="flex gap-[2px] h-6 mb-2">
            {[...Array(totalBlocks)].map((_, i) => (
                <div 
                    key={i} 
                    className={`flex-1 transition-colors duration-75
                        ${i < activeBlocks ? activeColor : inactiveColor}
                        ${i === activeBlocks - 1 ? 'opacity-50 animate-pulse' : 'opacity-100'} 
                    `}
                ></div>
            ))}
        </div>

        {/* Decorative Data Line */}
        <div className={`flex justify-between text-[8px] font-mono tracking-widest opacity-60 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <span>0x{idx.toString(16).toUpperCase().padStart(2, '0')}</span>
            <span>MEM_ADDR</span>
        </div>
        
        {/* Scanline overlay for this component */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-10 opacity-20"></div>
    </div>
  );
};

// === Sub-component: Project Card with Spotlight ===
const ProjectCard: React.FC<{ 
  project: Project; 
  setSelectedItem: (p: Project) => void; 
  bgCard: string; 
  hoverCard: string; 
  borderColor: string; 
  textColor: string; 
  subTextColor: string;
  isDark: boolean;
}> = ({ project, setSelectedItem, bgCard, hoverCard, borderColor, textColor, subTextColor, isDark }) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <button
      ref={cardRef}
      onClick={() => setSelectedItem(project)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`
        w-full text-left group ${bgCard} border ${borderColor} p-0 overflow-hidden flex transition-all rounded-md relative
        hover:border-tech-orange/50 hover:shadow-lg h-auto min-h-[100px]
      `}
      style={{
        '--mouse-x': '-100px', 
        '--mouse-y': '-100px'
      } as React.CSSProperties}
    >
       {/* Background Noise Texture */}
       <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

       {/* Spotlight Effect Layer */}
       <div 
         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
         style={{
           background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${isDark ? 'rgba(255, 85, 0, 0.15)' : 'rgba(255, 85, 0, 0.08)'}, transparent 40%)`
         }}
       ></div>

       <div className="w-2 bg-neutral-800 group-hover:bg-tech-orange transition-colors self-stretch shrink-0 z-10"></div>
       <div className="p-4 md:p-5 flex-1 min-w-0 relative z-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
                <h3 className={`${textColor} font-bold leading-tight group-hover:text-tech-orange transition-colors text-base md:text-lg pr-2 break-words`}>{project.title}</h3>
                {project.tags?.some(t => t.includes("获奖")) && <Award size={18} className="text-yellow-500 shrink-0 ml-2 drop-shadow-sm mt-1" />}
            </div>
            <div className={`text-xs font-mono ${subTextColor} mb-3 break-words uppercase tracking-wide leading-relaxed`}>{project.subtitle || "PROJECT FILE"}</div>
          </div>
          
          <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono border-t ${borderColor} pt-3 mt-1`}>
              <div className="flex items-center gap-1 shrink-0 px-2 py-1 rounded bg-tech-orange/10 text-tech-orange">
                  <Play size={10} className="fill-current" />
                  <span>{project.stats}</span>
              </div>
              {project.tags && (
                  <div className="flex flex-wrap gap-2 min-w-0 opacity-60">
                       {project.tags.slice(0,3).map((t,ti) => <span key={ti} className={textColor}>#{t}</span>)}
                  </div>
              )}
          </div>
       </div>
    </button>
  );
}

// === Main Component ===
export const ContentArea: React.FC<ContentAreaProps> = ({ category, theme }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isNameFlipped, setIsNameFlipped] = useState(false);
  const isDark = theme === 'dark';

  // Common styles based on theme
  const textColor = isDark ? 'text-white' : 'text-ink-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const borderColor = isDark ? 'border-neutral-800' : 'border-neutral-300';
  const bgCard = isDark 
    ? 'bg-[#111]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
    : 'bg-white/80 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]';
  const hoverCard = isDark
    ? 'hover:bg-[#1a1a1a] hover:border-tech-orange/50'
    : 'hover:bg-white hover:border-tech-orange/50 hover:shadow-md';
  const bgHeader = isDark ? 'bg-[#050505]/95' : 'bg-[#f0f0f2]/95';

  React.useEffect(() => {
    setSelectedItem(null);
  }, [category]);

  const renderProfile = () => (
    <div className="h-full flex flex-col justify-center items-center text-center p-8 animate-slide-in relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at center, ${isDark ? '#444' : '#999'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>
      <div className={`absolute top-0 left-0 w-full h-1 ${isDark ? 'bg-tech-orange/20' : 'bg-tech-orange/10'}`}></div>

      {/* ID Badge Container - Skeuomorphic */}
      <div className="relative group mb-8 z-10 perspective-1000">
         <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 rounded-t md:w-20 md:h-10 border-t border-x z-20 flex items-center justify-center
             ${isDark ? 'bg-[#222] border-[#333]' : 'bg-[#ddd] border-[#bbb]'}
             shadow-lg
         `}>
             <div className="w-8 h-1 bg-black/30 rounded-full"></div>
         </div>

         <div className={`
             relative w-40 h-40 md:w-48 md:h-48 rounded-lg p-2 transition-transform duration-500 group-hover:scale-105
             ${isDark 
                ? 'bg-[#151515] border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
                : 'bg-white border border-[#ccc] shadow-[0_10px_20px_rgba(0,0,0,0.1)]'}
         `}>
             <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none rounded-lg"></div>

             <div className="w-full h-full overflow-hidden rounded border border-black/10 relative grayscale hover:grayscale-0 transition-all duration-500">
                 <img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover" />
                 <div className="absolute bottom-2 right-2 bg-tech-orange text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-md font-mono z-10">
                    ID: 9527
                 </div>
             </div>
             
             <div className="absolute -top-3 -right-3 w-12 h-6 bg-yellow-400/80 rotate-12 shadow-sm backdrop-blur-sm z-30"></div>
         </div>
      </div>
      
      <div className="z-10 relative flex flex-col items-center">
        {/* Flip Card Name */}
        <div className="perspective-1000 mb-6 cursor-pointer" onClick={() => setIsNameFlipped(!isNameFlipped)}>
             <div className={`relative h-16 w-64 transition-transform duration-500 transform-style-3d ${isNameFlipped ? 'rotate-y-180' : ''}`}>
                 
                 {/* Front Side: Nickname */}
                 <div className={`absolute inset-0 backface-hidden rounded-lg flex items-center justify-center border shadow-xl
                      ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-[#ddd]'}
                 `}>
                      <h1 className={`text-4xl font-bold font-sans tracking-widest ${textColor}`}>湫鱼</h1>
                      <div className="absolute bottom-1 right-2 text-[10px] text-tech-orange font-mono animate-pulse">CLICK</div>
                 </div>

                 {/* Back Side: Real Name */}
                 <div className={`absolute inset-0 backface-hidden rounded-lg flex items-center justify-center border shadow-xl rotate-y-180
                      ${isDark ? 'bg-[#222] border-tech-orange text-tech-orange' : 'bg-orange-50 border-orange-200 text-tech-orange'}
                 `}>
                      <h1 className="text-3xl font-bold font-sans tracking-wide">邱谦业</h1>
                 </div>

             </div>
        </div>
        
        <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 border-y border-tech-orange/30">
            <Star size={14} className="text-tech-orange fill-tech-orange" />
            <h2 className={`text-xl font-black font-sans ${isDark ? 'text-white' : 'text-black'} tracking-widest uppercase`}>{PERSONAL_INFO.role}</h2>
            <Star size={14} className="text-tech-orange fill-tech-orange" />
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono ${subTextColor} w-full max-w-2xl mx-auto`}>
            {[
                { icon: <Phone size={14}/>, text: PERSONAL_INFO.phone },
                { icon: <Mail size={14}/>, text: PERSONAL_INFO.email, link: true },
                { icon: <MapPin size={14}/>, text: PERSONAL_INFO.location }
            ].map((item, i) => (
                <div key={i} className={`
                    group/card flex flex-col items-center justify-center p-3 rounded border shadow-sm transition-all hover:scale-105
                    ${isDark ? 'bg-[#151515] border-[#333] hover:border-tech-orange hover:bg-[#1a1a1a]' : 'bg-white border-[#ddd] hover:border-tech-orange hover:bg-orange-50/50'}
                `}>
                    <div className="text-tech-orange mb-1 group-hover/card:scale-110 transition-transform">{item.icon}</div>
                    {item.link ? (
                        <a href={`mailto:${item.text}`} className="hover:text-tech-orange transition-colors">{item.text}</a>
                    ) : (
                        <span className="group-hover/card:text-tech-orange transition-colors">{item.text}</span>
                    )}
                </div>
            ))}
        </div>

        <div className={`mt-12 text-industrial-gray text-xs font-mono max-w-md mx-auto border-t border-dashed ${borderColor} pt-4 opacity-70`}>
            <p className="mb-1 text-tech-orange animate-pulse">● SYSTEM STATUS: ONLINE</p>
            <p>AVAILABLE FOR NEW OPPORTUNITIES</p>
        </div>
      </div>
    </div>
  );

  const renderExperienceList = () => (
    <div className="flex flex-col h-full animate-slide-in">
      <div className={`p-4 md:p-6 border-b-2 ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0 shadow-sm flex-none`}>
        <div className="flex items-center gap-3">
             <div className="w-2 h-6 bg-tech-orange rounded-sm"></div>
             <h2 className={`text-xl md:text-3xl font-black ${textColor} tracking-tight uppercase`}>Experience_Log</h2>
        </div>
        <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0 px-2 py-1 bg-tech-orange/10 rounded">/mnt/career</span>
      </div>
      <div className="overflow-y-auto flex-1 p-3 md:p-6 space-y-4 custom-scrollbar pb-24">
        {EXPERIENCE_DATA.map((job, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItem(job)}
            className={`w-full text-left group relative overflow-hidden ${bgCard} border ${borderColor} ${hoverCard} transition-all duration-300 p-5 md:p-6 rounded-md`}
          >
            {/* Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="flex-1 min-w-0 pr-4">
                 <div className="flex items-center gap-2 mb-2">
                     <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${isDark ? 'bg-black border-[#333] text-tech-orange' : 'bg-neutral-100 border-[#ccc] text-tech-orange'}`}>
                        {job.period}
                     </span>
                 </div>
                 <div className={`font-black text-xl md:text-2xl group-hover:text-tech-orange transition-colors truncate ${textColor}`}>{job.company}</div>
                 <div className={`${subTextColor} font-bold text-sm font-mono mt-1 truncate`}>{job.role}</div>
              </div>
              <div className={`p-2 rounded-full border ${isDark ? 'border-neutral-700 bg-black' : 'border-neutral-300 bg-neutral-100'} group-hover:bg-tech-orange group-hover:text-black transition-colors`}>
                <ChevronRight size={16} />
              </div>
            </div>
            
            {/* Highlights Mini-view */}
            {job.highlights && (
              <div className={`mt-4 pt-3 border-t border-dashed ${borderColor} relative z-10`}>
                 <div className={`text-[10px] ${subTextColor} font-mono mb-2 uppercase tracking-wider flex items-center gap-2`}>
                    <Star size={10} className="fill-current" /> Key Projects
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {job.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className={`text-xs ${isDark ? 'text-neutral-300 bg-[#222]' : 'text-neutral-700 bg-[#f5f5f5]'} px-2 py-1 rounded border ${borderColor} truncate max-w-full font-mono`}>
                             {h.split('(')[0]}
                        </div>
                    ))}
                 </div>
              </div>
            )}
            
            <div className={`absolute -bottom-4 -right-2 text-[4rem] font-bold ${isDark ? 'text-white/[0.03]' : 'text-black/[0.03]'} pointer-events-none font-mono`}>
                0{idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderProjectList = () => (
    <div className="flex flex-col h-full animate-slide-in">
       <div className={`p-4 md:p-6 border-b-2 ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0 shadow-sm flex-none`}>
         <div className="flex items-center gap-3">
             <div className="w-2 h-6 bg-tech-orange rounded-sm"></div>
             <h2 className={`text-xl md:text-3xl font-black ${textColor} tracking-tight uppercase`}>Works_Database</h2>
        </div>
        <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0 px-2 py-1 bg-tech-orange/10 rounded">/mnt/video_projects</span>
      </div>
      <div className="overflow-y-auto flex-1 p-3 md:p-6 grid grid-cols-1 gap-4 custom-scrollbar pb-24">
        {PROJECTS_DATA.map((project, idx) => (
           <ProjectCard 
              key={idx}
              project={project}
              setSelectedItem={setSelectedItem}
              bgCard={bgCard}
              hoverCard={hoverCard}
              borderColor={borderColor}
              textColor={textColor}
              subTextColor={subTextColor}
              isDark={isDark}
           />
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="flex flex-col h-full animate-slide-in">
        <div className={`p-4 md:p-6 border-b-2 ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0 shadow-sm flex-none`}>
          <div className="flex items-center gap-3">
             <div className="w-2 h-6 bg-tech-orange rounded-sm"></div>
             <h2 className={`text-xl md:text-3xl font-black ${textColor} tracking-tight uppercase`}>Education_Log</h2>
          </div>
          <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0 px-2 py-1 bg-tech-orange/10 rounded">/mnt/academic</span>
        </div>
        <div className="overflow-y-auto flex-1 p-8 space-y-10 custom-scrollbar relative pb-24">
          
          {/* Vertical Time Line */}
          <div className={`absolute left-8 top-10 bottom-10 w-[2px] ${isDark ? 'bg-[#333]' : 'bg-[#ddd]'}`}></div>

          {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className={`relative pl-8 group`}>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[5px] top-3 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10
                      ${isDark ? 'bg-black border-neutral-600' : 'bg-white border-neutral-400'} 
                      group-hover:bg-tech-orange group-hover:border-white group-hover:scale-125 shadow-md`}
                  ></div>
                  
                  <div className={`p-6 rounded-lg border relative overflow-hidden transition-all duration-300
                      ${isDark 
                          ? 'bg-[#151515] border-[#222] hover:border-tech-orange/40' 
                          : 'bg-white border-[#ddd] hover:border-tech-orange/40 hover:shadow-lg'}
                  `}>
                      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3 relative z-10">
                          <h3 className={`text-2xl font-black ${textColor} font-sans`}>{edu.school}</h3>
                          <span className={`text-tech-orange font-mono text-xs font-bold px-2 py-1 rounded border ${isDark ? 'bg-black/50 border-tech-orange/20' : 'bg-tech-orange/5 border-tech-orange/20'}`}>
                              {edu.period}
                          </span>
                      </div>
                      
                      <div className={`${subTextColor} text-sm mb-5 font-mono flex flex-wrap items-center gap-2 relative z-10`}>
                          <span className={`${textColor} font-bold`}>{edu.major}</span>
                          <span className="opacity-30">|</span>
                          <span>{edu.degree}</span>
                      </div>

                      {/* Highlights/Works */}
                      {(edu.highlights || edu.description) && (
                          <div className={`relative z-10 border-l-2 pl-4 ${isDark ? 'border-[#333]' : 'border-[#eee]'}`}>
                               {edu.description?.map((desc, i) => (
                                   <div key={`d-${i}`} className={`text-sm mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-800'} font-medium`}>
                                       {desc}
                                   </div>
                               ))}
                               {edu.highlights?.map((h, i) => (
                                   <div key={`h-${i}`} className={`text-sm ${subTextColor} flex items-center gap-2 mt-1`}>
                                       <Film size={12} className="text-tech-orange" />
                                       <span>{h}</span>
                                   </div>
                               ))}
                          </div>
                      )}
                  </div>
              </div>
          ))}
        </div>
    </div>
  );

  const renderSkills = () => {
    return (
      <div className="flex flex-col h-full animate-slide-in">
         <div className={`p-4 md:p-6 border-b-2 ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0 shadow-sm flex-none`}>
            <div className="flex items-center gap-3">
                 <div className="w-2 h-6 bg-tech-orange rounded-sm"></div>
                 <h2 className={`text-xl md:text-3xl font-black ${textColor} tracking-tight uppercase`}>Sys_Modules</h2>
            </div>
            <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0 px-2 py-1 bg-tech-orange/10 rounded">/usr/bin/skills</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar pb-24">
          <div className="max-w-5xl mx-auto flex flex-col min-h-full">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                {SKILLS_DATA.map((skill, idx) => (
                    // KEY PROP IS CRITICAL: Forces re-mount on theme change
                    <SkillUnit key={`${skill.name}-${theme}`} skill={skill} isDark={isDark} idx={idx} />
                ))}
            </div>

            {/* System Info Panel */}
            <div className={`mt-auto p-6 rounded-none border-2 relative overflow-hidden
                ${isDark ? 'bg-[#151515] border-[#333]' : 'bg-white border-black'}
            `}>
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
                
                <div className="flex items-center gap-2 mb-4">
                    <Terminal size={16} className="text-tech-orange" />
                    <h3 className={`font-bold font-mono text-sm tracking-wider ${textColor}`}>SYSTEM_KERNEL_INFO</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                    {[
                        "全流程视效掌控：精通调色、剪辑、特效合成。",
                        "创意与审美驱动：深厚的视听语言与节奏把控。",
                        "高效工程化思维：擅长SOP流程制定与技术迭代。"
                    ].map((text, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <span className="text-tech-orange text-xs mt-0.5">[{i+1}]</span>
                            <p className={`text-xs ${subTextColor} leading-relaxed`}>{text}</p>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {category === Category.PROFILE && renderProfile()}
      {category === Category.EXPERIENCE && renderExperienceList()}
      {category === Category.PROJECTS && renderProjectList()}
      {category === Category.EDUCATION && renderEducation()}
      {category === Category.SKILLS && renderSkills()}
      
      {/* Modal for Details */}
      {selectedItem && (category === Category.EXPERIENCE || category === Category.PROJECTS) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-slide-in">
          <div className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border p-6 md:p-8 relative shadow-2xl
              ${isDark ? 'bg-[#1a1a1a] border-[#333] text-white' : 'bg-white border-[#ccc] text-black'}
          `}>
             <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-500/20 transition-colors"
             >
                <X size={20} />
             </button>

             <div className="mb-6 pr-8">
                 <div className="text-tech-orange font-mono text-xs mb-2 uppercase tracking-widest">
                    {category === Category.EXPERIENCE ? 'CASE FILE' : 'PROJECT DATA'}
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black leading-tight mb-2">
                    {selectedItem.title || selectedItem.company}
                 </h2>
                 <p className={`text-sm md:text-base font-mono ${subTextColor}`}>
                    {selectedItem.subtitle || selectedItem.role}
                 </p>
             </div>

             <div className="space-y-6">
                {selectedItem.link && (
                    <a href={selectedItem.link} target="_blank" rel="noreferrer" 
                       className="flex items-center gap-2 text-tech-orange hover:underline font-mono text-sm border border-tech-orange/30 p-3 rounded bg-tech-orange/5 justify-center"
                    >
                        <Play size={14} className="fill-current"/> WATCH SOURCE MATERIAL <ExternalLink size={14}/>
                    </a>
                )}

                {selectedItem.description && (
                    <div className="text-sm md:text-base leading-relaxed opacity-90 whitespace-pre-line">
                        {Array.isArray(selectedItem.description) 
                            ? selectedItem.description.map((d:string, i:number) => <p key={i} className="mb-2">• {d}</p>)
                            : selectedItem.description}
                    </div>
                )}

                {selectedItem.tags && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-dashed border-neutral-500/30">
                        {selectedItem.tags.map((t: string, i: number) => (
                            <span key={i} className={`text-xs px-2 py-1 rounded font-mono ${isDark ? 'bg-[#333] text-neutral-300' : 'bg-[#f0f0f0] text-neutral-600'}`}>
                                <Hash size={10} className="inline mr-1"/>{t}
                            </span>
                        ))}
                    </div>
                )}
             </div>
          </div>
        </div>
      )}
    </>
  );
};