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
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
            errorMessage = "Whoa, slow down! 🛑 My brain is overheating (API Rate Limit). Give me a minute to cool off. 🧊";
        }

        return NextResponse.json({
            reply: errorMessage,
            error_details: error.message || String(error)
        });
    }
}
