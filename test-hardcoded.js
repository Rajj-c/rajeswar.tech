const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    const key = "AIzaSyA5C_FS9lIt0MKU6tofO5ivBi6nKg39gpQ"; // Hardcoded
    console.log("Testing with hardcoded key:", key);

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent("Hello");
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}
test();
