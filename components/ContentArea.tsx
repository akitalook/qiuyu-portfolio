import React, { useState } from 'react';
import { Category, SkillLevel } from '../types';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA, EDUCATION_DATA, SKILLS_DATA, SYSTEM_CAPABILITIES } from '../constants';
import { MapPin, Mail, Phone, ExternalLink, Play, Award, ChevronRight, X, Hash, Star, Film, Circle, Zap } from 'lucide-react';

interface ContentAreaProps {
  category: Category;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ category }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Reset selection when category changes
  React.useEffect(() => {
    setSelectedItem(null);
  }, [category]);

  const renderProfile = () => (
    <div className="h-full flex flex-col justify-center items-center text-center p-8 animate-slide-in relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative group mb-8 z-10">
         <div className="absolute inset-0 rounded-full border-2 border-tech-orange opacity-30 animate-ping"></div>
         <div className="absolute inset-[-10px] rounded-full border border-neutral-800 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
         <div className="w-32 h-32 rounded-full bg-neutral-800 border-2 border-neutral-700 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
             {/* Avatar Image */}
            <img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover" />
         </div>
         <div className="absolute bottom-0 right-0 bg-tech-orange text-black text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">ID</div>
      </div>
      
      <div className="z-10">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-2 tracking-tight">{PERSONAL_INFO.name}</h1>
        <h2 className="text-lg font-mono text-tech-orange mb-8 tracking-widest uppercase">{PERSONAL_INFO.role}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono text-neutral-400 w-full max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4 border border-neutral-800 bg-neutral-900/50 rounded hover:border-tech-orange/50 transition-colors">
                <Phone size={16} className="mb-2 text-tech-orange" />
                <span>{PERSONAL_INFO.phone}</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-neutral-800 bg-neutral-900/50 rounded hover:border-tech-orange/50 transition-colors">
                <Mail size={16} className="mb-2 text-tech-orange" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">{PERSONAL_INFO.email}</a>
            </div>
            <div className="flex flex-col items-center p-4 border border-neutral-800 bg-neutral-900/50 rounded hover:border-tech-orange/50 transition-colors">
                <MapPin size={16} className="mb-2 text-tech-orange" />
                <span>{PERSONAL_INFO.location}</span>
            </div>
        </div>

        <div className="mt-12 text-industrial-gray text-xs font-mono max-w-md mx-auto border-t border-neutral-800 pt-4">
            <p className="mb-1 text-tech-orange animate-pulse">● SYSTEM STATUS: ONLINE</p>
            <p>AVAILABLE FOR NEW OPPORTUNITIES</p>
        </div>
      </div>
    </div>
  );

  const renderExperienceList = () => (
    <div className="flex flex-col h-full animate-slide-in">
      <div className="p-6 border-b border-neutral-800 flex justify-between items-end bg-neutral-900/80 backdrop-blur-sm z-10 sticky top-0">
        <h2 className="text-2xl font-bold text-white tracking-tight">EXPERIENCE_LOG</h2>
        <span className="text-tech-orange font-mono text-xs">/mnt/career</span>
      </div>
      <div className="overflow-y-auto flex-1 p-4 space-y-3 custom-scrollbar">
        {EXPERIENCE_DATA.map((job, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItem(job)}
            className="w-full text-left group relative overflow-hidden bg-neutral-900/30 border border-neutral-800 hover:border-tech-orange hover:bg-neutral-900 transition-all duration-200 p-5 rounded-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                     <span className="text-tech-orange text-xs font-mono bg-tech-orange/10 px-1 rounded">{job.period}</span>
                 </div>
                 <div className="text-white font-bold text-xl group-hover:text-tech-orange transition-colors">{job.company}</div>
                 <div className="text-neutral-400 text-sm font-mono mt-1">{job.role}</div>
              </div>
              <ChevronRight className="text-neutral-700 group-hover:text-tech-orange transition-colors self-center" />
            </div>
            
            {/* Highlights Mini-view in list - styled nicely */}
            {job.highlights && (
              <div className="mt-3 pl-3 border-l-2 border-neutral-800 group-hover:border-tech-orange/30 transition-colors">
                 <div className="text-[10px] text-neutral-600 font-mono mb-1 uppercase tracking-wider group-hover:text-neutral-500">Key Projects</div>
                 <div className="flex flex-wrap gap-2">
                    {job.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="text-xs text-neutral-300 bg-neutral-800 px-2 py-1 rounded-sm border border-transparent group-hover:border-neutral-700 truncate max-w-[200px]">
                             {h.split('(')[0]}
                        </div>
                    ))}
                    {job.highlights.length > 3 && (
                        <div className="text-xs text-neutral-500 px-1 py-1">+ {job.highlights.length - 3}</div>
                    )}
                 </div>
              </div>
            )}
            
            <div className="absolute bottom-2 right-2 opacity-5 text-4xl font-bold text-white pointer-events-none font-mono">
                0{idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderProjectList = () => (
    <div className="flex flex-col h-full animate-slide-in">
       <div className="p-6 border-b border-neutral-800 flex justify-between items-end bg-neutral-900/80 backdrop-blur-sm z-10 sticky top-0">
        <h2 className="text-2xl font-bold text-white tracking-tight">WORKS_DATABASE</h2>
        <span className="text-tech-orange font-mono text-xs">/mnt/video_projects</span>
      </div>
      <div className="overflow-y-auto flex-1 p-4 grid grid-cols-1 gap-3 custom-scrollbar">
        {PROJECTS_DATA.map((project, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItem(project)}
            className="w-full text-left group bg-neutral-900/30 border border-neutral-800 hover:border-tech-orange p-0 overflow-hidden flex transition-all hover:shadow-[0_0_20px_rgba(255,85,0,0.1)] rounded-sm"
          >
             <div className="w-1.5 bg-neutral-800 group-hover:bg-tech-orange transition-colors self-stretch"></div>
             <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold leading-tight group-hover:text-tech-orange transition-colors line-clamp-1 text-lg">{project.title}</h3>
                    {project.tags?.some(t => t.includes("获奖")) && <Award size={16} className="text-yellow-500 shrink-0 ml-2" />}
                </div>
                <div className="text-xs font-mono text-neutral-500 mb-2 truncate uppercase">{project.subtitle || "PROJECT FILE"}</div>
                
                <div className="flex items-center gap-4 text-xs text-industrial-gray font-mono border-t border-neutral-800 pt-2 mt-2">
                    <div className="flex items-center gap-1">
                        <Play size={10} className="fill-current text-tech-orange" />
                        <span>{project.stats}</span>
                    </div>
                    {project.tags && (
                        <div className="flex gap-2">
                             {project.tags.slice(0,2).map((t,ti) => <span key={ti} className="text-neutral-600">#{t}</span>)}
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
        <div className="p-6 border-b border-neutral-800 flex justify-between items-end bg-neutral-900/80 backdrop-blur-sm z-10 sticky top-0">
          <h2 className="text-2xl font-bold text-white tracking-tight">EDUCATION_LOG</h2>
          <span className="text-tech-orange font-mono text-xs">/mnt/academic</span>
        </div>
        <div className="overflow-y-auto flex-1 p-6 space-y-8 custom-scrollbar">
          {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className="relative pl-8 border-l border-neutral-800 hover:border-tech-orange transition-colors group py-2">
                  <div className="absolute -left-[5px] top-3 w-[9px] h-[9px] bg-neutral-800 group-hover:bg-tech-orange rounded-full transition-colors border-2 border-oled-black"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                      <h3 className="text-2xl font-bold text-white font-sans">{edu.school}</h3>
                      <span className="text-tech-orange font-mono text-sm bg-neutral-900 px-2 py-0.5 border border-neutral-800 rounded">{edu.period}</span>
                  </div>
                  
                  <div className="text-neutral-400 text-sm mb-4 font-mono flex items-center gap-2">
                      <span className="text-white">{edu.major}</span>
                      <span className="text-neutral-700">|</span>
                      <span>{edu.degree}</span>
                  </div>

                  {/* Highlights/Works */}
                  {(edu.highlights || edu.description) && (
                      <div className="bg-neutral-900/30 border-l-2 border-neutral-700 p-4 rounded-r-sm">
                           <div className="text-[10px] text-neutral-500 font-mono mb-2 uppercase tracking-wider flex items-center gap-2">
                              <Star size={10} /> Achievements
                           </div>
                           <ul className="space-y-2">
                               {edu.description?.map((desc, i) => (
                                   <li key={`d-${i}`} className="text-sm text-neutral-200 font-medium">
                                       {desc}
                                   </li>
                               ))}
                               {edu.highlights?.map((h, i) => (
                                   <li key={`h-${i}`} className="text-sm text-neutral-400 flex items-start gap-2">
                                       <Film size={12} className="text-neutral-600 mt-1 shrink-0" />
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
    // Group skills
    const highSkills = SKILLS_DATA.filter(s => s.level === SkillLevel.HIGH);
    const medSkills = SKILLS_DATA.filter(s => s.level === SkillLevel.MEDIUM);
    const lowSkills = SKILLS_DATA.filter(s => s.level === SkillLevel.LOW);

    return (
      <div className="flex flex-col h-full animate-slide-in">
         <div className="p-6 border-b border-neutral-800 flex justify-between items-end bg-neutral-900/80 backdrop-blur-sm z-10 sticky top-0">
            <h2 className="text-2xl font-bold text-white tracking-tight">SYS_MODULES</h2>
            <span className="text-tech-orange font-mono text-xs">/usr/bin/skills</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-12">
            
             {/* Core Processors (High) - New High End Style */}
            <div className="animate-slide-in" style={{animationDelay: '0.1s'}}>
                <h3 className="text-tech-orange font-mono text-xs uppercase mb-6 flex justify-between items-center">
                    <span className="flex items-center gap-2"><Zap size={12}/> CORE_PROCESSORS [HIGH_PERFORMANCE]</span>
                    <span className="opacity-50">ACTIVE_THREADS: {highSkills.length}</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {highSkills.map((skill, idx) => (
                        <div key={idx} className="aspect-square bg-neutral-900/50 border border-neutral-800 relative flex items-center justify-center group hover:border-tech-orange transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(255,85,0,0.15)] rounded-sm">
                            {/* Inner Grid Background */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px] group-hover:opacity-40 transition-opacity"></div>
                            
                            {/* Animated Rings - Reactor Core Look */}
                            <div className="absolute inset-2 border border-neutral-700 rounded-full group-hover:border-neutral-600 transition-colors"></div>
                            <div className="absolute inset-[15%] border-t-2 border-tech-orange opacity-60 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
                            <div className="absolute inset-[25%] border-b-2 border-white opacity-40 rounded-full animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
                            <div className="absolute inset-[40%] bg-tech-orange/10 rounded-full animate-pulse blur-md group-hover:bg-tech-orange/20 transition-colors"></div>
                            
                            {/* Skill Text */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="text-3xl font-black text-white font-sans tracking-tighter group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">{skill.name}</div>
                            </div>
                            
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-tech-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-tech-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expansion Modules (Medium) - Data Stream Look */}
            <div className="animate-slide-in" style={{animationDelay: '0.2s'}}>
                 <h3 className="text-neutral-500 font-mono text-xs uppercase mb-4 flex items-center gap-2">
                    <Circle size={8} className="fill-current"/> EXPANSION_MODULES [STANDARD_OPS]
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {medSkills.map((skill, idx) => (
                        <div key={idx} className="bg-neutral-900/30 border border-neutral-800 p-4 flex flex-col justify-between group hover:bg-neutral-900 hover:border-tech-orange/50 transition-colors h-24 relative overflow-hidden">
                             <div className="flex justify-between items-start z-10">
                                 <span className="font-bold text-xl text-neutral-300 group-hover:text-white font-sans">{skill.name}</span>
                                 <span className="text-[10px] text-neutral-600 font-mono group-hover:text-tech-orange">READY</span>
                             </div>
                             
                             {/* Animated Signal Bars */}
                             <div className="flex gap-1 items-end h-6 mt-2 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                                 {[...Array(6)].map((_, i) => (
                                     <div key={i} className="flex-1 bg-neutral-700 group-hover:bg-tech-orange transition-colors"
                                          style={{ 
                                              height: `${20 + Math.random() * 80}%`,
                                              animation: `pulse 1.5s infinite ${i * 0.1}s` 
                                          }}
                                     ></div>
                                 ))}
                             </div>
                             
                             {/* Hover Glow Background */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tech-orange/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Auxiliary (Low) - Compact Modules */}
             <div className="animate-slide-in" style={{animationDelay: '0.3s'}}>
                 <h3 className="text-neutral-500 font-mono text-xs uppercase mb-4">
                    AUXILIARY_UNITS
                </h3>
                <div className="flex gap-4">
                    {lowSkills.map((skill, idx) => (
                        <div key={idx} className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-sm rounded-sm flex items-center gap-3 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-blink"></div>
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* System Kernel Text - Moved to Bottom & Simplified */}
            <div className="animate-slide-in border-t border-neutral-800 pt-8" style={{animationDelay: '0.4s'}}>
                <div className="font-mono text-sm text-neutral-400 bg-neutral-900/20 p-6 relative">
                    <div className="absolute -top-3 left-4 bg-oled-black text-tech-orange text-[10px] px-2 py-0.5 border border-neutral-800 uppercase tracking-widest">
                        KERNEL_INFO
                    </div>
                    <div className="space-y-4">
                       {SYSTEM_CAPABILITIES.map((line, i) => (
                           <div key={i} className="flex gap-3 items-start">
                               <span className="text-tech-orange font-mono text-xs mt-1">0{i+1}</span>
                               <p className="leading-relaxed text-sm text-neutral-300">
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
      <div className="absolute inset-0 bg-oled-black/95 backdrop-blur-md z-50 flex flex-col animate-slide-in">
         {/* Detail Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50">
            <div className="flex items-center gap-3">
                <Hash className="text-tech-orange" size={20} />
                <span className="font-mono text-tech-orange">
                    {isProject ? 'PROJECT_DETAILS' : 'EXPERIENCE_DETAILS'}
                </span>
            </div>
            <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-neutral-800 rounded-full text-white transition-colors"
            >
                <X size={24} />
            </button>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
            <div className="max-w-3xl mx-auto">
                <div className="mb-2 font-mono text-tech-orange text-sm flex items-center gap-2">
                     <Circle size={8} className="fill-current animate-pulse" />
                    {isProject ? selectedItem.subtitle : selectedItem.period}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    {isProject ? selectedItem.title : selectedItem.company}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {selectedItem.tags?.map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 font-mono hover:border-tech-orange transition-colors cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Highlights Section for Experience Detail */}
                {!isProject && selectedItem.highlights && (
                    <div className="mb-8 p-6 bg-neutral-900/40 border border-neutral-800 rounded-sm">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2 font-sans">
                            <Award size={18} className="text-tech-orange" />
                            相关作品 / Key Projects
                        </h3>
                        <div className="space-y-3">
                             {selectedItem.highlights.map((h: string, i: number) => (
                                <div key={i} className="text-neutral-300 font-mono text-sm border-l-2 border-neutral-700 pl-4 py-1 hover:border-tech-orange transition-colors">
                                    {h}
                                </div>
                             ))}
                        </div>
                    </div>
                )}

                {/* Main Description */}
                <div className="text-neutral-300 space-y-4 font-sans leading-relaxed text-lg pl-2 border-t border-neutral-800 pt-8">
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
                    <div className="mt-12 pt-8 border-t border-neutral-800">
                         <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 bg-neutral-900 rounded border border-neutral-800 group hover:border-tech-orange transition-colors">
                            <div>
                                <div className="text-xs text-neutral-500 font-mono mb-1 uppercase tracking-wider">Current Statistics</div>
                                <div className="text-2xl text-white font-bold font-mono">{selectedItem.stats}</div>
                            </div>
                            <a 
                                href={selectedItem.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-tech-orange text-black font-bold px-8 py-4 rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,85,0,0.3)] hover:shadow-white/20"
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
    <div className="relative h-full w-full bg-oled-black overflow-hidden flex">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
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