// Helper endpoint to list available Gemini models
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Note: The SDK doesn't have a direct listModels method
    // But we can try common models and see which work
    const commonModels = [
      "gemini-1.5-flash",
      "gemini-1.5-pro", 
      "gemini-pro",
      "gemini-2.0-flash-exp",
    ];

    const availableModels: string[] = [];
    
    for (const modelName of commonModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        // Just try to get the model - if it doesn't throw, it's available
        await model.getGenerativeModel({ model: modelName });
        availableModels.push(modelName);
      } catch {
        // Model not available, skip
      }
    }

    return NextResponse.json({
      message: "Available models (common ones)",
      models: availableModels.length > 0 
        ? availableModels 
        : ["Try setting GEMINI_MODEL in .env.local"],
      note: "Check Google AI Studio for the latest model names: https://makersuite.google.com/app/apikey",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

