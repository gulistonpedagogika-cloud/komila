import { GoogleGenAI } from "@google/genai";
import { CompetenceArea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateActivitySuggestion(area: CompetenceArea, context?: string) {
  const prompt = `
    Ты - опытный педагог начальных классов и специалист по социальному развитию детей.
    Создай план внеурочного занятия для развития социальной компетентности по направлению: "${area}".
    ${context ? `Контекст или проблема: "${context}"` : ''}
    
    Ответ должен быть на русском языке в формате Markdown и включать:
    1. Название занятия
    2. Цель (чему научатся дети)
    3. Необходимые материалы
    4. Ход занятия (пошагово)
    5. Рефлексия (вопросы для обсуждения в конце)
    6. Совет для учителя
    
    Стиль должен быть дружелюбным, профессиональным и подходящим для возраста 7-10 лет.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating activity:", error);
    throw error;
  }
}
