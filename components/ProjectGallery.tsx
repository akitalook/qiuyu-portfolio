import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PlayCircle, ArrowUpRight, Award, Zap, TrendingUp, Activity } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "每天凌晨3点睡，多少天会死？",
    category: "B站 第277期每周必看",
    stats: "1217.4万播放",
    icon: <Zap size={20} />,
    color: "from-purple-600 to-blue-600",
    link: "https://www.bilibili.com/video/BV1rx4y1t7XT?spm_id_from=333.788.videopod.sections&vd_source=644aef13e8ffacd05e86485bb465d86f",
    desc: "极限睡眠剥夺实验科普，全网爆款视觉呈现。"
  },
  {
    id: 2,
    title: "一天“卤”2次算多吗？",
    category: "B站全站排行榜最高第3名",
    stats: "热门百万稿件",
    icon: <TrendingUp size={20} />,
    color: "from-orange-500 to-red-600",
    link: "https://www.bilibili.com/video/BV1EC92YBEnv/?spm_id_from=333.1387.upload.video_card.click&vd_source=644aef13e8ffacd05e86485bb465d86f",
    desc: "生动有趣的生理科普，幽默文案与丝滑动画的完美结合。"
  },
  {
    id: 3,
    title: "发烧要不要尽早吃药？",
    category: "格致科学传播奖 / 年度健康科普",
    stats: "排行榜Top 37",
    icon: <Award size={20} />,
    color: "from-emerald-500 to-teal-600",
    link: "https://www.bilibili.com/video/BV1bu411G76Z/?spm_id_from=333.1387.upload.video_card.click&vd_source=644aef13e8ffacd05e86485bb465d86f",
    desc: "硬核医学知识可视化，荣获专业科学传播奖项认可。"
  },
  {
    id: 4,
    title: "凶手如何把投毒伪装成“意外”？",
    category: "B站 第277期每周必看",
    stats: "高能硬核科普",
    icon: <Activity size={20} />,
    color: "from-gray-800 to-gray-900",
    link: "https://www.bilibili.com/video/BV1GF4m1E73H/?spm_id_from=333.1387.upload.video_card.click&vd_source=644aef13e8ffacd05e86485bb465d86f",
    desc: "悬疑风格叙事剪辑，极具张力的节奏把控。"
  }
];

const Card3D = ({ data, index }: { data: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <a href={data.link} target="_blank" rel="noopener noreferrer" className="block h-full">
      <motion.div
        ref={ref}
        className="relative w-full h-[420px] perspective-1000 cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={`w-full h-full rounded-3xl bg-gradient-to-br ${data.color} p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-white/10`}
        >
          {/* Glossy Reflection Effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" 
            style={{ transform: 'translateZ(50px)' }}
          />
          
          {/* Content Layer with Z-depth */}
          <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-xs font-mono mb-4 border border-white/10 shadow-inner">
                <PlayCircle size={12} />
                <span>CLICK TO WATCH</span>
              </div>
              <div className="text-white/80 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                {data.icon}
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-white leading-tight drop-shadow-lg mt-2">
              {data.title}
            </h3>
          </div>

          {/* Stats Layer with different Z-depth */}
          <div style={{ transform: "translateZ(30px)" }} className="relative z-10 mt-auto">
            <p className="text-white/80 text-xs font-bold mb-3 uppercase tracking-wider opacity-90">{data.category}</p>
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-black/30 transition-colors">
              <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">播放热度</p>
                    <p className="text-xl font-bold text-white font-mono tracking-tight">{data.stats}</p>
                  </div>
                  <div className="bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
              </div>
              <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                {data.desc}
              </p>
            </div>
          </div>

          {/* Abstract Background Elements */}
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"
            animate={{ scale: [1, 1.2, 1], rotate: 90 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transform: "translateZ(-20px)" }}
          />
        </motion.div>
      </motion.div>
    </a>
  );
};

const ProjectGallery: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 0.05 }} 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-black pointer-events-none whitespace-nowrap"
          >
            SELECTED WORKS
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-brand-black mb-6 relative z-10"
          >
            精选爆款案例
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 text-lg relative z-10 max-w-2xl mx-auto"
          >
            以数据驱动创意，用视觉赋能内容。从千万级播放的爆款到专业奖项作品，
            始终致力于探索科普内容的最佳视觉表达。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 perspective-origin-center">
          {projects.map((project, index) => (
            <Card3D key={project.id} data={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;