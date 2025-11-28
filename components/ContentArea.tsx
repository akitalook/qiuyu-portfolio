import React, { useState, useEffect } from 'react';
import { Category, SkillLevel, Theme } from '../types';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA, EDUCATION_DATA, SKILLS_DATA, SYSTEM_CAPABILITIES } from '../constants';
import { MapPin, Mail, Phone, ExternalLink, Play, Award, ChevronRight, X, Hash, Star, Film, Circle } from 'lucide-react';

interface ContentAreaProps {
  category: Category;
  theme: Theme;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ category, theme }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isDark = theme === 'dark';

  // Common styles based on theme
  const textColor = isDark ? 'text-white' : 'text-ink-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const borderColor = isDark ? 'border-neutral-800' : 'border-neutral-300';
  const bgCard = isDark ? 'bg-neutral-900/30' : 'bg-white/60';
  const bgHeader = isDark ? 'bg-neutral-900/80' : 'bg-paper-white/90';
  const hoverBorder = isDark ? 'hover:border-tech-orange' : 'hover:border-tech-orange';

  // Reset selection when category changes
  React.useEffect(() => {
    setSelectedItem(null);
  }, [category]);

  // Trigger animation on mount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [category]);

  const renderProfile = () => (
    <div className="h-full flex flex-col justify-center items-center text-center p-8 animate-slide-in relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at center, ${isDark ? '#222' : '#ddd'} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative group mb-8 z-10">
         <div className="absolute inset-0 rounded-full border-2 border-tech-orange opacity-30 animate-ping"></div>
         <div className={`absolute inset-[-10px] rounded-full border ${isDark ? 'border-neutral-800' : 'border-neutral-300'} animate-spin-slow`} style={{ animationDuration: '10s' }}></div>
         <div className={`w-32 h-32 rounded-full ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-200 border-neutral-300'} border-2 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500`}>
             <img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover" />
         </div>
         <div className="absolute bottom-0 right-0 bg-tech-orange text-black text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">ID</div>
      </div>
      
      <div className="z-10">
        <h1 className={`text-4xl md:text-5xl font-sans font-bold ${textColor} mb-2 tracking-tight`}>
          <span>邱谦业</span>
          <span className={`block md:inline mt-2 md:mt-0 md:ml-3 text-2xl ${subTextColor} font-normal`}>湫鱼</span>
        </h1>
        <h2 className={`text-xl font-black font-sans ${isDark ? 'text-tech-orange' : 'text-tech-orange'} mb-8 tracking-widest uppercase`}>{PERSONAL_INFO.role}</h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono ${subTextColor} w-full max-w-2xl mx-auto`}>
            <div className={`flex flex-col items-center p-4 border ${borderColor} ${isDark ? 'bg-neutral-900/50' : 'bg-white'} rounded hover:border-tech-orange/50 transition-colors`}>
                <Phone size={16} className="mb-2 text-tech-orange" />
                <span>{PERSONAL_INFO.phone}</span>
            </div>
            <div className={`flex flex-col items-center p-4 border ${borderColor} ${isDark ? 'bg-neutral-900/50' : 'bg-white'} rounded hover:border-tech-orange/50 transition-colors`}>
                <Mail size={16} className="mb-2 text-tech-orange" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className={`hover:${textColor} transition-colors break-all`}>{PERSONAL_INFO.email}</a>
            </div>
            <div className={`flex flex-col items-center p-4 border ${borderColor} ${isDark ? 'bg-neutral-900/50' : 'bg-white'} rounded hover:border-tech-orange/50 transition-colors`}>
                <MapPin size={16} className="mb-2 text-tech-orange" />
                <span>{PERSONAL_INFO.location}</span>
            </div>
        </div>

        <div className={`mt-12 text-industrial-gray text-xs font-mono max-w-md mx-auto border-t ${borderColor} pt-4`}>
            <p className="mb-1 text-tech-orange animate-pulse">● SYSTEM STATUS: ONLINE</p>
            <p>AVAILABLE FOR NEW OPPORTUNITIES</p>
        </div>
      </div>
    </div>
  );

  const renderExperienceList = () => (
    <div className="flex flex-col h-full animate-slide-in">
      <div className={`p-4 md:p-6 border-b ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0`}>
        <h2 className={`text-xl md:text-2xl font-bold ${textColor} tracking-tight`}>EXPERIENCE_LOG</h2>
        <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0">/mnt/career</span>
      </div>
      <div className="overflow-y-auto flex-1 p-3 md:p-4 space-y-3 custom-scrollbar">
        {EXPERIENCE_DATA.map((job, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItem(job)}
            className={`w-full text-left group relative overflow-hidden ${bgCard} border ${borderColor} ${hoverBorder} ${isDark ? 'hover:bg-neutral-900' : 'hover:bg-white'} transition-all duration-200 p-4 md:p-5 rounded-sm`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0 pr-4">
                 <div className="flex items-center gap-2 mb-1">
                     <span className="text-tech-orange text-xs font-mono bg-tech-orange/10 px-1 rounded whitespace-nowrap">{job.period}</span>
                 </div>
                 <div className={`font-bold text-lg md:text-xl group-hover:text-tech-orange transition-colors truncate ${textColor}`}>{job.company}</div>
                 <div className={`${subTextColor} text-sm font-mono mt-1 truncate`}>{job.role}</div>
              </div>
              <ChevronRight className={`${subTextColor} group-hover:text-tech-orange transition-colors self-center shrink-0`} />
            </div>
            
            {/* Highlights Mini-view */}
            {job.highlights && (
              <div className={`mt-3 pl-3 border-l-2 ${borderColor} group-hover:border-tech-orange/30 transition-colors hidden xs:block`}>
                 <div className={`text-[10px] ${subTextColor} font-mono mb-1 uppercase tracking-wider`}>Key Projects</div>
                 <div className="flex flex-wrap gap-2">
                    {job.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className={`text-xs ${isDark ? 'text-neutral-300 bg-neutral-800' : 'text-neutral-700 bg-neutral-200'} px-2 py-1 rounded-sm border border-transparent group-hover:border-neutral-700 truncate max-w-full md:max-w-[200px]`}>
                             {h.split('(')[0]}
                        </div>
                    ))}
                    {job.highlights.length > 3 && (
                        <div className={`text-xs ${subTextColor} px-1 py-1`}>+ {job.highlights.length - 3}</div>
                    )}
                 </div>
              </div>
            )}
            
            <div className={`absolute bottom-2 right-2 opacity-5 text-4xl font-bold ${textColor} pointer-events-none font-mono`}>
                0{idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderProjectList = () => (
    <div className="flex flex-col h-full animate-slide-in">
       <div className={`p-4 md:p-6 border-b ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0`}>
        <h2 className={`text-xl md:text-2xl font-bold ${textColor} tracking-tight`}>WORKS_DATABASE</h2>
        <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0">/mnt/video_projects</span>
      </div>
      <div className="overflow-y-auto flex-1 p-3 md:p-4 grid grid-cols-1 gap-3 custom-scrollbar">
        {PROJECTS_DATA.map((project, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItem(project)}
            className={`w-full text-left group ${bgCard} border ${borderColor} ${hoverBorder} p-0 overflow-hidden flex transition-all hover:shadow-[0_0_20px_rgba(255,85,0,0.1)] rounded-sm`}
          >
             <div className="w-1.5 bg-neutral-800 group-hover:bg-tech-orange transition-colors self-stretch shrink-0"></div>
             <div className="p-4 flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`${textColor} font-bold leading-tight group-hover:text-tech-orange transition-colors truncate text-lg pr-2`}>{project.title}</h3>
                    {project.tags?.some(t => t.includes("获奖")) && <Award size={16} className="text-yellow-500 shrink-0 ml-2" />}
                </div>
                <div className={`text-xs font-mono ${subTextColor} mb-2 truncate uppercase`}>{project.subtitle || "PROJECT FILE"}</div>
                
                <div className={`flex items-center gap-4 text-xs text-industrial-gray font-mono border-t ${borderColor} pt-2 mt-2`}>
                    <div className="flex items-center gap-1 shrink-0">
                        <Play size={10} className="fill-current text-tech-orange" />
                        <span>{project.stats}</span>
                    </div>
                    {project.tags && (
                        <div className="flex gap-2 min-w-0 overflow-hidden">
                             {project.tags.slice(0,2).map((t,ti) => <span key={ti} className="text-neutral-600 truncate">#{t}</span>)}
                        </div>
                    )}
                </div>
             </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="flex flex-col h-full animate-slide-in">
        <div className={`p-4 md:p-6 border-b ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0`}>
          <h2 className={`text-xl md:text-2xl font-bold ${textColor} tracking-tight`}>EDUCATION_LOG</h2>
          <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0">/mnt/academic</span>
        </div>
        <div className="overflow-y-auto flex-1 p-6 space-y-8 custom-scrollbar">
          {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className={`relative pl-8 border-l ${borderColor} hover:border-tech-orange transition-colors group py-2`}>
                  <div className={`absolute -left-[5px] top-3 w-[9px] h-[9px] ${isDark ? 'bg-neutral-800 border-oled-black' : 'bg-neutral-300 border-white'} group-hover:bg-tech-orange rounded-full transition-colors border-2`}></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                      <h3 className={`text-2xl font-bold ${textColor} font-sans`}>{edu.school}</h3>
                      <span className={`text-tech-orange font-mono text-sm ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-300'} px-2 py-0.5 border rounded`}>{edu.period}</span>
                  </div>
                  
                  <div className={`${subTextColor} text-sm mb-4 font-mono flex flex-wrap items-center gap-2`}>
                      <span className={textColor}>{edu.major}</span>
                      <span className="text-neutral-500">|</span>
                      <span>{edu.degree}</span>
                  </div>

                  {/* Highlights/Works */}
                  {(edu.highlights || edu.description) && (
                      <div className={`${isDark ? 'bg-neutral-900/30 border-neutral-700' : 'bg-white border-neutral-300'} border-l-2 p-4 rounded-r-sm`}>
                           <div className="text-[10px] text-neutral-500 font-mono mb-2 uppercase tracking-wider flex items-center gap-2">
                              <Star size={10} /> Achievements
                           </div>
                           <ul className="space-y-2">
                               {edu.description?.map((desc, i) => (
                                   <li key={`d-${i}`} className={`text-sm ${isDark ? 'text-neutral-200' : 'text-neutral-800'} font-medium`}>
                                       {desc}
                                   </li>
                               ))}
                               {edu.highlights?.map((h, i) => (
                                   <li key={`h-${i}`} className={`text-sm ${subTextColor} flex items-start gap-2`}>
                                       <Film size={12} className="text-neutral-500 mt-1 shrink-0" />
                                       <span>{h}</span>
                                   </li>
                               ))}
                           </ul>
                      </div>
                  )}
              </div>
          ))}
        </div>
    </div>
  );

  const renderSkills = () => {
    return (
      <div className="flex flex-col h-full animate-slide-in">
         <div className={`p-4 md:p-6 border-b ${borderColor} flex flex-col md:flex-row md:justify-between md:items-end ${bgHeader} backdrop-blur-sm z-10 sticky top-0`}>
            <h2 className={`text-xl md:text-2xl font-bold ${textColor} tracking-tight`}>SYS_MODULES</h2>
            <span className="text-tech-orange font-mono text-xs mt-1 md:mt-0">/usr/bin/skills</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-5xl mx-auto flex flex-col min-h-full">
            
            {/* UNIFIED UNIFORM GRID FOR ALL SKILLS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
                {SKILLS_DATA.map((skill, idx) => {
                    // Determine liquid height based on skill level
                    let targetHeight = '50%'; // Low
                    let liquidOpacity = '0.5';
                    
                    if (skill.level === SkillLevel.HIGH) {
                        targetHeight = '95%';
                        liquidOpacity = '0.9';
                    } else if (skill.level === SkillLevel.MEDIUM) {
                        targetHeight = '75%';
                        liquidOpacity = '0.7';
                    }

                    // For animation: start at 5% and grow to target height
                    const currentHeight = isMounted ? targetHeight : '0%';

                    return (
                        <div key={idx} className={`relative aspect-[2/3] w-full max-w-[140px] mx-auto ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-100'} border-2 ${borderColor} rounded-[2rem] overflow-hidden group shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,85,0,0.2)] hover:border-tech-orange/30`}>
                            
                            {/* Inner Glass Shadow/Reflection */}
                            <div className={`absolute inset-0 z-20 pointer-events-none rounded-[2rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-2 border-white/5`}></div>
                            <div className="absolute top-4 left-3 right-3 h-[1px] bg-white/20 z-20"></div>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/10 rounded-full z-20"></div>

                            {/* Scale Markings (Decoration) */}
                            <div className="absolute right-3 top-1/4 bottom-1/4 w-1 flex flex-col justify-between z-10 opacity-30">
                                {[1,2,3,4,5].map(i => <div key={i} className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`}></div>)}
                            </div>

                            {/* Liquid Container */}
                            <div className="absolute bottom-0 w-full rounded-b-[1.8rem] transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1)" style={{ height: currentHeight }}>
                                {/* The Liquid Fluid */}
                                <div className={`absolute bottom-0 left-0 w-full h-full bg-tech-orange overflow-hidden transition-opacity duration-300`} style={{ opacity: liquidOpacity }}>
                                     {/* Rotating Waves centered at the top of the liquid */}
                                     {/* Wave 1 */}
                                     <div className="absolute left-1/2 top-0 w-[400%] aspect-square bg-white/10 rounded-[35%] animate-wave" 
                                          style={{ 
                                              animationDuration: '6s', 
                                          }}>
                                     </div>
                                     {/* Wave 2 */}
                                      <div className="absolute left-1/2 top-0 w-[400%] aspect-square bg-white/20 rounded-[38%] animate-wave" 
                                          style={{ 
                                              animationDuration: '9s', 
                                              animationDelay: '-2s'
                                          }}>
                                     </div>
                                      {/* Wave 3 */}
                                      <div className="absolute left-1/2 top-0 w-[410%] aspect-square bg-white/10 rounded-[40%] animate-wave" 
                                          style={{ 
                                              animationDuration: '12s', 
                                              animationDelay: '-5s'
                                          }}>
                                     </div>
                                </div>
                                {/* Top Surface Highlight */}
                                <div className="absolute top-0 w-full h-1 bg-white/30 blur-[1px]"></div>
                            </div>
                            
                            {/* Glass Glare Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/30 pointer-events-none z-30 rounded-[2rem]"></div>
                            
                            {/* Text Overlay - Centered and clean */}
                            <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                                <div className={`text-3xl font-black ${isDark ? 'text-white' : 'text-neutral-800'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-tighter`}>
                                    {skill.name}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* System Kernel Text - Bottom */}
            <div className={`mt-auto border-t ${borderColor} pt-8`}>
                <div className={`font-mono text-sm ${subTextColor} ${isDark ? 'bg-neutral-900/20' : 'bg-neutral-100'} p-6 relative rounded-sm`}>
                    <div className={`absolute -top-3 left-4 ${isDark ? 'bg-oled-black' : 'bg-paper-white'} text-tech-orange text-[10px] px-2 py-0.5 border ${borderColor} uppercase tracking-widest`}>
                        KERNEL_INFO
                    </div>
                    <div className="space-y-4">
                       {SYSTEM_CAPABILITIES.map((line, i) => (
                           <div key={i} className="flex gap-3 items-start">
                               <span className="text-tech-orange font-mono text-xs mt-1">0{i+1}</span>
                               <p className={`leading-relaxed text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                   {line}
                               </p>
                           </div>
                       ))}
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // Detail Views
  const renderDetailOverlay = () => {
    if (!selectedItem) return null;

    // Check if item is WorkExperience or Project based on properties
    const isProject = 'link' in selectedItem;

    return (
      <div className={`absolute inset-0 ${isDark ? 'bg-oled-black/95' : 'bg-white/95'} backdrop-blur-md z-50 flex flex-col animate-slide-in`}>
         {/* Detail Header */}
        <div className={`flex items-center justify-between p-4 md:p-6 border-b ${borderColor} ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-100/50'}`}>
            <div className="flex items-center gap-3">
                <Hash className="text-tech-orange" size={20} />
                <span className="font-mono text-tech-orange text-xs md:text-sm">
                    {isProject ? 'PROJECT_DETAILS' : 'EXPERIENCE_DETAILS'}
                </span>
            </div>
            <button 
                onClick={() => setSelectedItem(null)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-neutral-800 text-white' : 'hover:bg-neutral-200 text-black'}`}
            >
                <X size={24} />
            </button>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar">
            <div className="max-w-3xl mx-auto">
                <div className="mb-2 font-mono text-tech-orange text-xs md:text-sm flex items-center gap-2">
                     <Circle size={8} className="fill-current animate-pulse" />
                    {isProject ? selectedItem.subtitle : selectedItem.period}
                </div>
                <h1 className={`text-2xl md:text-5xl font-bold ${textColor} mb-6 md:mb-8 leading-tight`}>
                    {isProject ? selectedItem.title : selectedItem.company}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {selectedItem.tags?.map((tag: string, i: number) => (
                        <span key={i} className={`px-3 py-1 ${isDark ? 'bg-neutral-800 text-neutral-300 border-neutral-700' : 'bg-neutral-100 text-neutral-700 border-neutral-300'} border text-xs font-mono hover:border-tech-orange transition-colors cursor-default`}>
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Highlights Section for Experience Detail */}
                {!isProject && selectedItem.highlights && (
                    <div className={`mb-6 md:mb-8 p-4 md:p-6 ${isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-sm`}>
                        <h3 className={`${textColor} font-bold mb-4 flex items-center gap-2 font-sans`}>
                            <Award size={18} className="text-tech-orange" />
                            相关作品 / Key Projects
                        </h3>
                        <div className="space-y-3">
                             {selectedItem.highlights.map((h: string, i: number) => (
                                <div key={i} className={`${isDark ? 'text-neutral-300 border-neutral-700' : 'text-neutral-700 border-neutral-300'} font-mono text-sm border-l-2 pl-4 py-1 hover:border-tech-orange transition-colors`}>
                                    {h}
                                </div>
                             ))}
                        </div>
                    </div>
                )}

                {/* Main Description */}
                <div className={`${isDark ? 'text-neutral-300' : 'text-neutral-700'} space-y-4 font-sans leading-relaxed text-base md:text-lg pl-2 border-t ${borderColor} pt-8`}>
                    {isProject ? (
                        <p>{selectedItem.description}</p>
                    ) : (
                        <ul className="list-none space-y-4">
                            {selectedItem.description.map((desc: string, i: number) => (
                                <li key={i} className="relative pl-6">
                                    <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-tech-orange rounded-full shadow-[0_0_5px_rgba(255,85,0,0.8)]"></span>
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Action Button for Projects */}
                {isProject && (
                    <div className={`mt-12 pt-8 border-t ${borderColor}`}>
                         <div className={`flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} rounded border group hover:border-tech-orange transition-colors`}>
                            <div>
                                <div className="text-xs text-neutral-500 font-mono mb-1 uppercase tracking-wider">Current Statistics</div>
                                <div className={`text-xl md:text-2xl ${textColor} font-bold font-mono`}>{selectedItem.stats}</div>
                            </div>
                            <a 
                                href={selectedItem.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-tech-orange text-black font-bold px-8 py-4 rounded hover:bg-white hover:text-black transition-colors shadow-[0_0_20px_rgba(255,85,0,0.3)] hover:shadow-lg"
                            >
                                <Play size={18} className="fill-current" />
                                WATCH ON BILIBILI
                                <ExternalLink size={14} />
                            </a>
                         </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative h-full w-full ${isDark ? 'bg-oled-black' : 'bg-paper-white'} overflow-hidden flex transition-colors duration-500`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(${isDark ? '#333' : '#ccc'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#333' : '#ccc'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col">
          {category === Category.PROFILE && renderProfile()}
          {category === Category.EXPERIENCE && renderExperienceList()}
          {category === Category.PROJECTS && renderProjectList()}
          {category === Category.EDUCATION && renderEducation()}
          {category === Category.SKILLS && renderSkills()}
      </div>

      {renderDetailOverlay()}
    </div>
  );
};