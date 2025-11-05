// Test script to find which Gemini models work with your API key
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
try {
  const envPath = join(__dirname, ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
} catch (e) {
  console.log("No .env.local found, using process.env");
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY not found in environment");
  process.exit(1);
}

console.log(`✅ Using API Key: ${apiKey.substring(0, 10)}...`);
console.log("");

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
];

async function testModel(modelName) {
  try {
    console.log(`Testing: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello");
    const response = await result.response;
    const text = response.text();
    console.log(`✅ ${modelName} WORKS! Response: "${text.substring(0, 50)}..."`);
    return true;
  } catch (error) {
    const errorMsg = error.message || String(error);
    if (errorMsg.includes("404") || errorMsg.includes("not found")) {
      console.log(`❌ ${modelName} - Not found/not available`);
    } else {
      console.log(`❌ ${modelName} - Error: ${errorMsg.substring(0, 100)}`);
    }
    return false;
  }
}

async function main() {
  console.log("🔍 Testing Gemini models...\n");
  
  const workingModels = [];
  
  for (const modelName of modelsToTest) {
    const works = await testModel(modelName);
    if (works) {
      workingModels.push(modelName);
    }
    console.log(""); // Blank line
  }
  
  console.log("=".repeat(50));
  if (workingModels.length > 0) {
    console.log(`✅ Working models found:`);
    workingModels.forEach((m) => console.log(`   - ${m}`));
    console.log(`\n💡 Add this to your .env.local:`);
    console.log(`   GEMINI_MODEL=${workingModels[0]}`);
  } else {
    console.log("❌ No working models found.");
    console.log("   Check your API key permissions at:");
    console.log("   https://aistudio.google.com/app/apikey");
  }
}

main().catch(console.error);

