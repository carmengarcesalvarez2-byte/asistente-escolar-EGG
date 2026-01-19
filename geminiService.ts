
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return response.text || "Lo siento, no pude procesar tu solicitud.";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Hubo un error al conectar con la secretaría. Por favor, intenta de nuevo.";
    }
  }
}
