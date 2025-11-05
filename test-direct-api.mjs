// Test direct API call to see what models are available
const apiKey = "AIzaSyABG4Q_XGzZPnFAgt1RFysG8EynNUR48n4";

console.log("🔍 Testing direct Gemini API call...\n");

// Test a simple generateContent call
const testUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

try {
  const response = await fetch(testUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: "Hello" }]
      }]
    })
  });

  const data = await response.json();
  
  if (response.ok) {
    console.log("✅ gemini-pro works via direct API!");
    console.log(`Response: ${data.candidates?.[0]?.content?.parts?.[0]?.text?.substring(0, 50)}...`);
  } else {
    console.log(`❌ Status: ${response.status}`);
    console.log(`Error:`, JSON.stringify(data, null, 2));
    
    // Try to list available models
    console.log("\n🔍 Trying to list available models...");
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResponse = await fetch(listUrl);
    const listData = await listResponse.json();
    
    if (listResponse.ok && listData.models) {
      console.log(`\n✅ Found ${listData.models.length} available models:`);
      listData.models
        .filter(m => m.name.includes("gemini"))
        .forEach(m => {
          console.log(`   - ${m.name.replace("models/", "")}`);
          if (m.supportedGenerationMethods?.includes("generateContent")) {
            console.log(`     ✓ Supports generateContent`);
          }
        });
    } else {
      console.log("Could not list models:", listData);
    }
  }
} catch (error) {
  console.error("Error:", error.message);
}

