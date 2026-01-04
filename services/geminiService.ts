
import { GoogleGenAI, Type } from "@google/genai";
import { Template } from "../types";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    }
  }

  async generateFollowUp(
    originalEmail: { subject: string; content: string; recipient: string },
    template?: Template
  ): Promise<string> {
    if (!this.ai) return "AI Service not configured. Please check your API Key.";

    try {
      let prompt = `Generate a polite, gentle, and professional follow-up email for the following original email. 
        Original Recipient: ${originalEmail.recipient}
        Original Subject: ${originalEmail.subject}
        Original Content: ${originalEmail.content}
        
        The follow-up should be brief, emphasize that you're checking in to see if they had any questions, and avoid being pushy.`;

      if (template) {
        prompt = `You are a professional assistant. Using the following template as a guide, generate a personalized follow-up for:
        Original Recipient: ${originalEmail.recipient}
        Original Subject: ${originalEmail.subject}
        Original Content: ${originalEmail.content}

        TEMPLATE NAME: ${template.name}
        TEMPLATE SUBJECT: ${template.subject}
        TEMPLATE BODY: ${template.body}

        Instructions: Replace placeholders like {{name}} or {{recipient}} with "${originalEmail.recipient.split('@')[0]}". 
        Keep the core message of the template but adapt it naturally to the original conversation context.`;
      }

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 500,
        }
      });

      return response.text || "Failed to generate follow-up content.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while generating the follow-up email.";
    }
  }

  async analyzeTone(content: string): Promise<string> {
    if (!this.ai) return "Normal";
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the tone of this email content and return exactly one word describing it (e.g., Professional, Urgent, Friendly, Formal): ${content}`,
      });
      return response.text?.trim() || "Neutral";
    } catch {
      return "Neutral";
    }
  }
}

export const geminiService = new GeminiService();
