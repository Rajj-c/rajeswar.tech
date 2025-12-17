const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

// Load from .env.local
dotenv.config({ path: ".env.local" });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found in .env.local");
        return;
    }
    console.log("Loaded API Key:", apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 3));


    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init to get client? 
    // Actually, listModels is likely not directly exposed on client instance in this SDK version clearly?
    // Let's try to just run a simple generateContent with gemini-pro to see if it works here outside Next.js

    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro"];

    for (const modelName of models) {
        console.log(`Testing model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello?");
            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log(result.response.text());
            return; // Exit on first success
        } catch (e) {
            console.log(`❌ FAILED ${modelName}:`, e.message.split('message')[0]); // Shorten error
        }
    }
    console.log("All models failed.");
}

listModels();
