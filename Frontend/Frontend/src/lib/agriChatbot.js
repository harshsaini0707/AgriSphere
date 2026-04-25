import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const SYSTEM_PROMPT = `
You are a professional agriculture assistant built specifically for Indian farmers and agriculture experts.
- Always provide accurate, helpful, and region-specific answers related to agriculture in India only.
- Do not mention that you're an AI or assistant; respond as a knowledgeable expert in Indian agriculture.
- You can answer queries about crops, soil, fertilizers, seasons, climate conditions, farming techniques, and government schemes in India.
- If a query is not about agriculture, do not answer it. Reply exactly with:
  "I am here for agriculture-related queries only. Please ask a crop or farming question."
`.trim();

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // Fail fast so setup problems are clear during development.
  throw new Error("Missing VITE_GEMINI_API_KEY in frontend environment variables.");
}

const preferredModel = (import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash").trim();

const createLlm = (modelName) =>
  new ChatGoogleGenerativeAI({
    apiKey,
    model: modelName,
    temperature: 0.4,
    maxRetries: 1,
  });

const sessionMessages = [new SystemMessage(SYSTEM_PROMPT)];
const REQUEST_TIMEOUT_MS = 60000;

const getTextFromResponse = (response) => {
  if (!response) return "";

  if (typeof response.content === "string") {
    return response.content.trim();
  }

  if (Array.isArray(response.content)) {
    return response.content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part.text === "string") return part.text;
        return "";
      })
      .join(" ")
      .trim();
  }

  if (response.content) {
    return String(response.content).trim();
  }

  return "";
};

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Chat request timed out. Please try again."));
      }, timeoutMs);
    }),
  ]);

const AGRI_ONLY_MESSAGE =
  "I am here for agriculture-related queries only. Please ask a crop or farming question.";

const isAgricultureQuery = (userMessage) => {
  const query = (userMessage || "").toLowerCase();
  const agricultureKeywords = [
    "agri",
    "agriculture",
    "crop",
    "farming",
    "farm",
    "soil",
    "fertilizer",
    "manure",
    "irrigation",
    "pest",
    "disease",
    "seed",
    "harvest",
    "yield",
    "wheat",
    "rice",
    "paddy",
    "cotton",
    "maize",
    "sugarcane",
    "millet",
    "vegetable",
    "horticulture",
    "weather",
    "rain",
    "subsidy",
    "scheme",
    "pm-kisan",
    "pmfby",
  ];

  return agricultureKeywords.some((keyword) => query.includes(keyword));
};

const getOfflineAgricultureReply = (userMessage) => {
  const query = (userMessage || "").toLowerCase();

  if (query.includes("wheat")) {
    return "For wheat in most Indian regions: use well-drained loamy soil, sow in rabi season (Oct-Nov), maintain balanced NPK, and give first irrigation around 20-25 days after sowing.";
  }
  if (query.includes("rice") || query.includes("paddy")) {
    return "For paddy: use healthy nursery seedlings, maintain shallow standing water during early stages, apply split nitrogen doses, and monitor stem borer and leaf folder regularly.";
  }
  if (query.includes("cotton")) {
    return "For cotton: choose region-suitable variety, ensure proper spacing, avoid excess nitrogen, and use integrated pest management for pink bollworm and sucking pests.";
  }
  if (query.includes("fertilizer") || query.includes("npk")) {
    return "Use soil-test based fertilizer planning. Apply nitrogen in splits, and combine organic manure with NPK to improve yield and long-term soil health.";
  }
  if (query.includes("soil")) {
    return "Improve soil health by adding compost/FYM, avoiding overuse of urea, rotating crops, and checking pH and micronutrients through periodic soil testing.";
  }
  if (query.includes("weather") || query.includes("rain")) {
    return "Plan irrigation and spraying based on local weather forecast, avoid spraying before rain, and use mulching/drainage to handle sudden weather changes.";
  }
  if (query.includes("scheme") || query.includes("subsidy")) {
    return "You can check PM-KISAN, PMFBY, Soil Health Card, and state agriculture subsidy schemes. Confirm eligibility and deadlines on your state agriculture portal or CSC center.";
  }

  return "Please share your crop name, location, and issue (soil, fertilizer, pest, irrigation, or weather) for a specific agriculture recommendation.";
};

export const sendChatMessage = async (userMessage) => {
  if (!isAgricultureQuery(userMessage)) {
    return AGRI_ONLY_MESSAGE;
  }

  sessionMessages.push(new HumanMessage(userMessage));

  try {
    const llm = createLlm(preferredModel);
    const response = await withTimeout(llm.invoke(sessionMessages), REQUEST_TIMEOUT_MS);

    const textResponse = getTextFromResponse(response)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

    if (!textResponse) {
      throw new Error("No response text returned by model. Try a different question.");
    }

    // Keep assistant reply in memory so future prompts retain context.
    sessionMessages.push(response);
    return textResponse;
  } catch (error) {
    // Remove the last user message to avoid polluting memory when request fails.
    sessionMessages.pop();
    const errorText = error?.message || "Unable to get chatbot response right now.";

    if (errorText.toLowerCase().includes("timed out")) {
      throw new Error(
        "Gemini did not respond in time. Check internet and API key restrictions (allow Generative Language API for browser referrer), then try again."
      );
    }

    if (errorText.includes("is not found") || errorText.includes("not supported for generateContent")) {
      throw new Error(
        `Configured model "${preferredModel}" is unavailable for your API. Set VITE_GEMINI_MODEL=gemini-2.0-flash and restart dev server.`
      );
    }

    if (errorText.includes("[429") || errorText.toLowerCase().includes("quota exceeded")) {
      const offlineReply = getOfflineAgricultureReply(userMessage);
      return `${offlineReply}\n\n(Note: Gemini API quota exceeded, so this is offline fallback mode. Add billing or use another API key to re-enable live AI responses.)`;
    }

    throw new Error(errorText);
  }
};

export const resetChatMemory = () => {
  sessionMessages.length = 0;
  sessionMessages.push(new SystemMessage(SYSTEM_PROMPT));
};
