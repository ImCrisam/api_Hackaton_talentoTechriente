import { cargarContexto } from '../utils/cargarContexto';
import { GoogleGenAI } from '@google/genai';

export async function preguntarOpenAI(userMessage: string, apiKey: string): Promise<string> {

  const ai = new GoogleGenAI({ apiKey: process.env.OPENAI_API_KEY });

  const contexto = await cargarContexto();
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    contexto:
    ${contexto}
    
    pregunta:${userMessage}

  `,
  });
  const rawText = res.candidates[0].content.parts[0].text;
  const match = rawText.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No se pudo extraer un JSON válido de la respuesta.");
  }

  const json = JSON.parse(match[0]);
  return json;
}




