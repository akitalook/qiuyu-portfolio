import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string = "请分析这张图片的视觉风格、构图、色彩搭配以及可能使用的后期制作技术或软件。"
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Using gemini-3-pro-preview as requested for high-level understanding
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    return response.text || "无法生成分析结果。";
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "与 AI 服务通信时发生错误。";
  }
};