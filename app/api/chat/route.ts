// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Create Gemini model with streaming
    // Use model from env or default to a working model
    // Available models: gemini-2.5-flash, gemini-2.5-pro, gemini-2.0-flash, gemini-flash-latest
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    
    console.log(`Using Gemini model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // generateContentStream returns a Promise, errors happen during iteration
    const result = await model.generateContentStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of result.stream) {
            // Each chunk contains part of the response text
            const text = chunk.text();
            controller.enqueue(encoder.encode(JSON.stringify({ text }) + "\n"));
          }

          // Signal completion
          controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + "\n"));
        } catch (err) {
          controller.enqueue(
            encoder.encode(JSON.stringify({ error: (err as Error).message }) + "\n")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    // Provide helpful error messages
    let helpfulMessage = errorMessage;
    if (errorMessage.includes("404") || errorMessage.includes("not found")) {
      helpfulMessage = `Model not found. Common issues:\n` +
        `1. Check your API key has access to Gemini models\n` +
        `2. Try setting GEMINI_MODEL in .env.local to one of: gemini-1.5-flash, gemini-1.5-pro, gemini-pro\n` +
        `3. Visit https://aistudio.google.com/app/apikey to check available models\n` +
        `Original error: ${errorMessage}`;
    }
    
    return NextResponse.json(
      { error: helpfulMessage },
      { 
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
