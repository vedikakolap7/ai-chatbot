// Simple test to find working Gemini models
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";

// Read API key from .env.local
let apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  try {
    const envContent = readFileSync(".env.local", "utf-8");
    const match = envContent.match(/GEMINI_API_KEY=(.+)/);
    if (match) {
      apiKey = match[1].trim();
    }
  } catch (e) {
    console.error("❌ Could not read .env.local");
    process.exit(1);
  }
}

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY not found");
  process.exit(1);
}

console.log(`✅ Testing with API Key: ${apiKey.substring(0, 15)}...\n`);

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro",
  "gemini-1.5-flash-latest",
];

async function testModel(modelName) {
  try {
    process.stdout.write(`Testing ${modelName.padEnd(25)}... `);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hi");
    const response = await result.response;
    const text = response.text();
    console.log(`✅ WORKS!`);
    return { name: modelName, works: true };
  } catch (error) {
    const errorMsg = error.message || String(error);
    if (errorMsg.includes("404") || errorMsg.includes("not found")) {
      console.log(`❌ Not available`);
      // Show more details
      if (errorMsg.includes("API version")) {
        console.log(`   └─ ${errorMsg.substring(0, 100)}`);
      }
    } else if (errorMsg.includes("403") || errorMsg.includes("PERMISSION")) {
      console.log(`❌ Permission denied`);
      console.log(`   └─ Check API key permissions`);
    } else if (errorMsg.includes("401") || errorMsg.includes("API_KEY_INVALID")) {
      console.log(`❌ Invalid API key`);
    } else {
      console.log(`❌ Error: ${errorMsg.substring(0, 80)}`);
    }
    return { name: modelName, works: false, error: errorMsg };
  }
}

async function main() {
  console.log("🔍 Testing Gemini models with your API key...\n");
  
  const results = [];
  for (const modelName of modelsToTest) {
    const result = await testModel(modelName);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
  }
  
  console.log("\n" + "=".repeat(60));
  const working = results.filter(r => r.works);
  
  if (working.length > 0) {
    console.log(`\n✅ Found ${working.length} working model(s):\n`);
    working.forEach(r => console.log(`   ✓ ${r.name}`));
    console.log(`\n💡 Recommended: Add to your .env.local:`);
    console.log(`   GEMINI_MODEL=${working[0].name}`);
  } else {
    console.log("\n❌ No working models found.");
    console.log("\nPossible issues:");
    console.log("   1. API key may not have access to Gemini models");
    console.log("   2. Check permissions at: https://aistudio.google.com/app/apikey");
    console.log("   3. Try regenerating your API key");
  }
}

main().catch(console.error);

