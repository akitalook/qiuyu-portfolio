import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Loader2, Sparkles, X } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';

const AiLab: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(""); // Reset analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    
    setLoading(true);
    setAnalysis("");

    // Extract base64 data
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const result = await analyzeImage(base64Data, mimeType, "作为一名视觉设计师，请分析这张图片的构图、灯光、配色方案以及可能使用的后期软件。请保持专业和简洁。");
    
    setAnalysis(result);
    setLoading(false);
  };

  const clearImage = () => {
    setImage(null);
    setAnalysis("");
  };

  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 bg-white/5 text-sm font-mono mb-4">
            <Sparkles size={14} className="text-yellow-400" />
            <span>由 Gemini 3 Pro Vision 驱动</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">视觉 AI 实验室</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            探索设计与人工智能的交汇点。上传您的视觉作品，获取专业的技术拆解与分析。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Upload Area */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors mb-4">
                  <Upload className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-300">点击上传图片</p>
                <p className="text-xs text-gray-500 mt-2">支持 JPG, PNG 格式</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black">
                <img src={image} alt="Upload" className="w-full h-64 object-contain" />
                <button 
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <button
              disabled={!image || loading}
              onClick={handleAnalyze}
              className={`w-full mt-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                !image 
                  ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Camera size={18} />}
              {loading ? '正在分析...' : '开始视觉分析'}
            </button>
          </div>

          {/* Result Area */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[350px] backdrop-blur-sm relative">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              分析结果
              {analysis && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
             </h3>
             
             <div className="space-y-4 h-full overflow-y-auto max-h-[300px] custom-scrollbar">
               {!analysis && !loading && (
                 <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                   <p className="text-sm">上传图片并点击分析以查看 Gemini 的技术解读。</p>
                 </div>
               )}
               
               {loading && (
                 <div className="space-y-3">
                   <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
                   <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
                 </div>
               )}

               {analysis && (
                 <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap text-justify"
                 >
                   {analysis}
                 </motion.div>
               )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiLab;