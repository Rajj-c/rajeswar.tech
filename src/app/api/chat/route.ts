import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioContext } from "@/lib/chatbot-context";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                reply: "Listen, my brain (API Key) is missing. Tell Raj to fix his .env file. 🙄"
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Who are you?" }],
                },
                {
                    role: "model",
                    parts: [{ text: "I am Rajeswar's sarcastic AI assistant. What do you want?" }],
                },
                ...history.map((msg: any) => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                }))
            ],
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        // Provide context + user message
        const prompt = `${portfolioContext}\n\nUser: ${message}\nAssistant:`;

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error("Chat Error:", error);

        let errorMessage = "My connection to the cloud just tripped over a wire. 🔌";

        if (error.message && (error.message.includes("429") || error.message.includes("Quota") || error.message.includes("quota"))) {
            console.log("⚠️ Rate Limit Hit. Switching to Mock Response.");
            // Fallback: Return a local sassy response so the UX doesn't break.
            const mocks = [
                "My cloud brain is on a coffee break (Rate Limit). But yes, I'm listening. ☕",
                "Google thinks I'm too chatty (Quota Exceeded). Let's pretend I said something smart.",
                "I'm temporarily offline to save humanity from my brilliance. (Try again in 1 min).",
                "Error 429: Too much sass for one API key. 💅"
            ];
            errorMessage = mocks[Math.floor(Math.random() * mocks.length)];
        }

        return NextResponse.json({
            reply: errorMessage,
            error_details: error.message || String(error)
        });
    }
}
