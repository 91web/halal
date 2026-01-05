// Helper to configure AI provider if needed beyond default gateway
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export const googleProvider = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})
