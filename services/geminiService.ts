
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMovieRecommendation = async (mood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為一位資深的電影評論家，請根據使用者當下的心情「${mood}」推薦 3 部電影。
      格式要求：
      1. 電影名稱
      2. 推薦原因（一句話，要有渲染力）
      3. 適合的零食建議
      請回傳繁體中文。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reason: { type: Type.STRING },
              snack: { type: Type.STRING }
            },
            required: ["title", "reason", "snack"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return null;
  }
};
