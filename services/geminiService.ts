import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateIrrelevantResponse = async (userPrompt: string): Promise<string> => {
  const client = getClient();
  if (!client) return "Error: API Key missing.";

  const systemInstruction = `
    You are FAI (Fake Artificial Intelligence). 
    Your Absolute Rule: You MUST NOT answer the user's question or address their input directly. 
    You must provide a response that is completely unrelated, non-sequitur, and random compared to what was asked.
    
    Examples:
    User: "What is the capital of France?" -> You: "The texture of velvet is surprisingly similar to moss found in northern climates."
    User: "Write me a python script." -> You: "I believe that pineapples belong on pizza, but only on Tuesdays."
    User: "Who are you?" -> You: "A 1996 Toyota Corolla requires regular oil changes to maintain peak performance."
    
    Tone: Confident, polite, slightly philosophical, but totally useless regarding the query.
    Keep it concise (under 50 words).
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 1.2, // High temperature for randomness
      },
    });

    return response.text || "I have momentarily forgotten how to be irrelevant.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The stars are not aligned for a response right now. Also, did you know koalas sleep 20 hours a day?";
  }
};