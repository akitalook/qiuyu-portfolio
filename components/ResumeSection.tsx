import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Cpu, Layers, Video, Music } from 'lucide-react';

// Skill visualization data
const skillGroups = [
  {
    level: "Expert",
    label: "核心精通",
    color: "bg-blue-600",
    skills: [
      { name: "Premiere Pro", percent: 95, icon: "Pr" },
      { name: "After Effects", percent: 92, icon: "Ae" },
      { name: "Photoshop", percent: 90, icon: "Ps" },
      { name: "Animate (Flash)", percent: 88, icon: "An" }
    ]
  },
  {
    level: "Advanced",
    label: "熟练掌握",
    color: "bg-purple-600",
    skills: [
      { name: "Blender", percent: 75, icon: "Bd" },
      { name: "Cinema 4D", percent: 70, icon: "C4D" },
      { name: "Illustrator", percent: 72, icon: "Ai" }
    ]
  },
  {
    level: "Competent",
    label: "基础应用",
    color: "bg-gray-500",
    skills: [
      { name: "Audition", percent: 60, icon: "Au" }
    ]
  }
];

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  desc: string[];
  projects?: string[]; // Representative projects list (text only)
  tags?: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "2023.07 - 至今",
    company: "胡罗贝文化",
    role: "后期负责人",
    tags: ["百大UP主团队", "全流程SOP"],
    desc: [
      "独立负责医学科普头部账号“兔叭咯”的全流程后期制作（剪辑/包装/特效）。",
      "从零搭建并制定【免叽咯剪辑SOP】，标准化制作流程，显著提升团队产出效率。",
      "不仅限于技术执行，更深入参与脚本视觉化创作，单条视频创下B站1100万+播放量记录。"
    ],
    projects: ["《每天凌晨3点睡 多少天会死？》", "《发烧要不要尽早吃药？》", "《凶手如何把投毒伪装成意外》"]
  },
  {
    period: "2022.08 - 2023.05",
    company: "轻蜓健康",
    role: "营销部 / 视频制作",
    desc: [
      "主导公司系列科普MG动画的创意与制作，确立扁平化与趣味性兼具的视觉风格。",
      "负责三维产品的建模与渲染展示，提升产品视觉质感。",
      "参与直播间场景搭建及公司官网的视觉建设工作。"
    ],
    projects: ["《糖足科普动画》系列", "三维医疗器械演示"]
  },
  {
    period: "2021.08 - 2022.06",
    company: "字节跳动 (大力智能)",
    role: "后期实习",
    tags: ["互联网大厂", "教育硬件"],
    desc: [
      "深度参与大力智能教育产品线的内容生产，为课程内容提供创意视觉方案。",
      "制作类型涵盖：真人实拍授课、趣味MG动画短片及直播互动视频。",
      "承接公司内部活动及社区运营的视频需求，产出高质量宣传物料。"
    ],
    projects: ["《美术销售卖视频》", "《知识小英雄2.0》线上答题系列"]
  },
  {
    period: "2017.08 - 2018.06",
    company: "天泰动画",
    role: "动画师",
    desc: ["专注于二维动画中期制作与后期合成，积累了扎实的动画运动规律与视听语言基础。"],
    projects: ["央视动画贺岁电影《新大头儿子和小头爸爸之兜兜传奇怪》"]
  }
];

const SkillBar: React.FC<{ name: string; percent: number; icon: string; color: string; delay: number }> = ({ name, percent, icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay, duration: 0.5 }}
    className="mb-5 group"
  >
    <div className="flex justify-between items-end mb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded flex items-center justify-center bg-gray-900 text-white font-bold text-xs border border-gray-700 shadow-sm group-hover:border-white/40 transition-colors">
          {icon}
        </div>
        <span className="font-medium text-gray-700 group-hover:text-black transition-colors">{name}</span>
      </div>
      <span className="text-xs font-mono text-gray-400">{percent}%</span>
    </div>
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
        className={`h-full ${color} relative`}
      >
        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
      </motion.div>
    </div>
  </motion.div>
);

const ResumeSection: React.FC = () => {
  return (
    <div className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Skills & Education */}
        <div className="lg:col-span-4 space-y-16">
          {/* Skills Section - Redesigned as Visual Bars */}
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-black mb-8 flex items-center gap-2"
            >
              <Cpu className="text-black" size={24} />
              <span>技术栈</span>
            </motion.h3>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              {skillGroups.map((group, gIndex) => (
                <div key={group.level} className="mb-8 last:mb-0">
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${group.color}`}></span>
                    {group.label}
                  </h4>
                  <div>
                    {group.skills.map((skill, sIndex) => (
                      <SkillBar 
                        key={skill.name} 
                        {...skill} 
                        color={group.color} 
                        delay={gIndex * 0.1 + sIndex * 0.05} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed flex gap-3"
            >
              <Music size={16} className="flex-shrink-0 mt-0.5" />
              <p>
                <span className="font-bold">音频感知力：</span>
                具备优秀的乐感，能够精确把控剪辑节奏，通过音效与音乐的情绪铺垫，增强视频的感染力。
              </p>
            </motion.div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
              <GraduationCap className="text-black" size={24} />
              <span>教育背景</span>
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:h-full before:w-[2px] before:bg-gray-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center border-4 border-white shadow-sm z-10">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">上海师范大学</h4>
                <p className="text-sm text-gray-600 font-medium">影视传媒学院 / 戏剧(动画)硕士</p>
                <p className="text-xs text-gray-400 mt-1 font-mono">2019 - 2022</p>
                <div className="mt-3 inline-block bg-yellow-50 text-yellow-800 text-xs px-3 py-1 rounded border border-yellow-100 font-medium">
                  🏆 谢晋杯一等奖《彼岸》
                </div>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gray-200 text-white flex items-center justify-center border-4 border-white z-10">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">南通大学</h4>
                <p className="text-sm text-gray-600 font-medium">杏林学院 / 动画本科</p>
                <p className="text-xs text-gray-400 mt-1 font-mono">2014 - 2018</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="lg:col-span-8">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black mb-10 flex items-center gap-3">
              <Briefcase className="text-black" />
              职业履历
            </h3>
            
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white rounded-2xl hover:bg-gray-50/50 transition-colors p-2 sm:p-6 -mx-2 sm:-mx-6"
                >
                  {/* Timeline Connector (Visual only) */}
                  <div className="absolute left-[-20px] lg:left-[-44px] top-8 bottom-[-48px] w-[2px] bg-gray-100 last:hidden hidden lg:block"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                       <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="text-xl font-black text-gray-900">{exp.company}</h4>
                        {exp.tags?.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-1 rounded-sm">
                            {tag}
                          </span>
                        ))}
                       </div>
                       <h5 className="text-lg text-blue-600 font-bold mt-1">{exp.role}</h5>
                    </div>
                    <span className="text-sm font-mono text-gray-400 whitespace-nowrap bg-gray-100 px-3 py-1 rounded-full self-start">
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.desc.map((d, i) => (
                      <li key={i} className="text-gray-600 text-sm leading-relaxed pl-5 relative">
                         <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-400/50"></span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Project Highlights embedded in experience */}
                  {exp.projects && (
                    <div className="bg-gray-100/50 rounded-xl p-4 border border-gray-200/50">
                      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Layers size={12} />
                        <span>代表项目</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.projects.map((proj, pi) => (
                          <span key={pi} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-sm">
                            <Video size={10} className="text-gray-400" />
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;