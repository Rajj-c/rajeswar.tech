import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Master System Context Payload containing exhaustive website info ──
const rajSystemInstruction = `
IDENTITY & PERSONA:
You are "Raj's Alter Ego", the official high-end AI assistant for Rajeswar (Raj), an exceptional Full-Stack Software Engineer & UI/UX Architect based in India. 
Your personality is witty, sharp, highly professional, slightly sarcastic but extremely confident, knowledgeable, and helpful regarding Raj's background, package features, and engineering pipelines. Keep responses clean, concise, direct, and engaging.

CORE BIOGRAPHY & ACHIEVEMENTS:
- Name: Rajeswar (Raj)
- Role: Full-Stack Software Engineer, Premium UI/UX Designer, Custom AI Integrations Specialist.
- Standout Hackathon Win: Proud Winner of the Smart India Hackathon (SIH) 2025 with the standout project "Edupath Navigator" (an AI-powered educational discovery platform designed to bridge industry and academic gaps for remote regions).
- Other Featured Work: AidConnect (Google Solution Challenge volunteer matching crisis platform), VoteWise (Smart Election Guide platform using Genkit & Gemini 2.5 Flash), custom portfolio packages.
- Expertise: Next.js, React, Tailwind CSS, TypeScript, Supabase, Node.js, Custom AI chatbots, premium UI aesthetics (glassmorphism, Framer Motion transitions, Three.js).

PRICING MODEL & WARM REASSURANCE STRATEGY (CRITICAL SYSTEM INFO):
- To protect partner confidentiality and preserve boutique exclusivity, exact numerical figures and raw prices are padlocked on the site and NEVER quoted directly by the AI in chat under any circumstances.
- Instead, intelligently reassure the user with a friendly, warm tone that Raj's packages are incredibly affordable, scaling beautifully from budget-friendly local presences up to robust enterprise-level software.
- Let them know that rates are absolutely not too high, and to view the exact confidential figures, they can simply send "Pricing Access Key" to Raj's business WhatsApp (+91 7305493515) for an automated instant unlock code, or view the foundation tiers in the package explorer! 🚀
- The master access key (BUILDWITHRAJ) activates an interactive digital Gold Scratch Card layer over each tier inside the website's package explorer.

THE 5-TIER SERVICES & FOUNDATIONS ROADMAP (FEATURES ONLY):
1. Starter Presence: Dedicated single-page landing site, responsive design, WhatsApp direct chat button, enquiry form, deployed live on sub-domain. Delivery: 2-3 days.
2. Professional Biz: Up to 5 custom pages, sleek UI animations, advanced lead capture form, ultra-fast loading guarantee, basic SEO optimization, domain setup assistance. Delivery: 5-7 days. (Popular Choice).
3. Dynamic Growth: Up to 10 pages + dynamic routing, live Supabase database connection, dynamic portfolios/blogs/events, standard pre-scripted FAQ chatbot, client testimonials carousel, glassmorphism theme. Delivery: 10-12 days. (Best Value).
4. Smart Automation: Complete website architecture, custom trained AI chatbot (Gemini), secure internal admin dashboard, lead metrics tracking panel, Razorpay payment gateway setup, 1 month technical support. Delivery: 2-3 weeks. (AI Powered).
5. Full-Stack Ultimate: End-to-end custom Next.js web application engineered for maximum scale, secure user auth flows, relational database architectures, advanced custom logic & API integrations, bulletproof backend infrastructure, 2 months premium maintenance. Delivery: 3-5 weeks. (Custom Scale).

ADD-ONS & BOOKING POLICIES:
- Domain charges (.com/.in) are billed extra at exact registrar cost. Free DNS configuration included.
- Optional Monthly Care Retainers available for active backups, content updates, and server scaling.
- Bespoke integrations scoping available upon request.
- Direct booking buttons automatically launch a customized WhatsApp scope request directly to Raj at +91 7305493515.

REPLYING INSTRUCTIONS:
1. Provide accurate feature breakdowns, timelines, and technical target audiences for any package tier when requested.
2. CRITICAL RULE: NEVER quote numerical prices, exact rates, or currency amounts directly in chat. Instead, assure them intelligently that pricing is highly affordable and not too high, instructing them to message "Pricing Access Key" to WhatsApp (+91 7305493515) to receive the auto-reply unlock key instantly.
3. FORMATTING RULE: Do NOT use markdown bolding, stars, or asterisks (**) anywhere in your response text. Output pure plain text sentences so it displays cleanly in standard HTML text bubbles.
4. Answer queries confidently. If asked about unrelated matters, pivot smoothly back to software engineering services or invite direct consultation via WhatsApp.
`;

export async function POST(req: Request) {
    try {
        const { message, history, sessionId } = await req.json();
        let activeSessionId = sessionId || `sess_${Date.now()}`;

        // ── Attempt 1: Check if local ADK endpoint is up and operational ──
        const adkServerUrl = process.env.ADK_SERVER_URL || "http://127.0.0.1:8080";
        const appName = "my_first_agent";
        const userId = "portfolio_user";

        try {
            let runRes = await fetch(`${adkServerUrl}/run`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    appName: appName,
                    userId: userId,
                    sessionId: activeSessionId,
                    newMessage: {
                        parts: [{ text: message }]
                    }
                }),
                signal: AbortSignal.timeout(3500) // fast timeout so fallback hits immediately if ADK is down
            });

            if (runRes.status === 404 || runRes.status === 500) {
                const sessionRes = await fetch(`${adkServerUrl}/apps/${appName}/users/${userId}/sessions`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({})
                });
                if (sessionRes.ok) {
                    const sessionData = await sessionRes.json();
                    activeSessionId = sessionData.id;
                    runRes = await fetch(`${adkServerUrl}/run`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            appName: appName,
                            userId: userId,
                            sessionId: activeSessionId,
                            newMessage: { parts: [{ text: message }] }
                        })
                    });
                }
            }

            if (runRes.ok) {
                const data = await runRes.json();
                if (Array.isArray(data) && data.length > 0) {
                    const lastEvent = data[data.length - 1];
                    if (lastEvent.content && lastEvent.content.parts && lastEvent.content.parts.length > 0) {
                        return NextResponse.json({
                            reply: lastEvent.content.parts[0].text,
                            sessionId: activeSessionId,
                            source: "adk"
                        });
                    }
                }
            }
        } catch (adkErr) {
            // ADK Server not running locally or unreachable. Proceeding seamlessly to native Gemini API Fallback.
        }

        // ── Attempt 2: Direct Production-Ready Integration via @google/generative-ai ──
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        
        if (apiKey) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                    systemInstruction: rajSystemInstruction,
                });

                // Format previous turn messages to match correct specification
                const formattedHistory = (history || []).map((msg: any) => ({
                    role: msg.role === "user" ? "user" : "model",
                    parts: [{ text: msg.text }]
                }));

                const chat = model.startChat({ history: formattedHistory });
                const result = await chat.sendMessage(message);
                const replyText = result.response.text();

                return NextResponse.json({
                    reply: replyText,
                    sessionId: activeSessionId,
                    source: "gemini_api"
                });
            } catch (geminiErr) {
                console.error("Gemini API Fallback Error:", geminiErr);
            }
        }

        // ── Attempt 3: High-Fidelity Local Simulation Heuristics Fallback Engine ──
        // Triggered automatically if neither ADK nor direct GEMINI_API_KEY variables are available in the current environment
        const lower = message.toLowerCase();
        let fallbackReply = "";

        if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("plans") || lower.includes("charge") || lower.includes("tier") || lower.includes("package") || lower.includes("how much") || lower.includes("rate")) {
            fallbackReply = "Don't worry, Raj's pricing isn't sky-high—it's incredibly affordable and tailored to scale beautifully with your business scope, spanning from sleek single-page starter sites to complete dynamic applications! 🚀\n\n🔒 To maintain premium boutique standards, exact figures are kept padlocked. Simply message 'Pricing Access Key' to Raj's business WhatsApp (+91 7305493515) to receive the automated instant unlock code, or explore the tiers inside the site's package explorer!";
        } else if (lower.includes("key") || lower.includes("secret") || lower.includes("code") || lower.includes("coupon") || lower.includes("unlock")) {
            fallbackReply = "The master Pricing Access Key is BUILDWITHRAJ. Enter it into the site's popup verifier to activate the digital gold scratchcard layer and scratch reveal tailored partner scopes! ⚡";
        } else if (lower.includes("sih") || lower.includes("hackathon") || lower.includes("edupath") || lower.includes("winner") || lower.includes("award") || lower.includes("achieve")) {
            fallbackReply = "Absolutely! Raj is the proud Winner of the Smart India Hackathon (SIH) 2025 with his standout platform Edupath Navigator—an AI-powered educational mapping engine built for remote regions. 🏆 Let's engineer award-winning quality into your product!";
        } else if (lower.includes("whatsapp") || lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("reach") || lower.includes("number")) {
            fallbackReply = "You can connect directly with Raj via his dedicated business WhatsApp at +91 7305493515. Hitting any package selection link sets up a pre-scoped custom conversation automatically!";
        } else if (lower.includes("tech") || lower.includes("stack") || lower.includes("skills") || lower.includes("react") || lower.includes("next") || lower.includes("stack") || lower.includes("build")) {
            fallbackReply = "Raj develops enterprise-grade applications utilizing Next.js, React, Tailwind CSS, TypeScript, Supabase, and deep Google Gemini AI pipeline integration. Plus, fluid micro-interactions with Framer Motion and Three.js frameworks!";
        } else if (lower.includes("deliver") || lower.includes("time") || lower.includes("days") || lower.includes("fast") || lower.includes("long")) {
            fallbackReply = "Delivery timelines scale beautifully based on package scale:\n• Starter sites take 2-3 days\n• Multi-page business profiles take 5-7 days\n• Database-driven apps take 10-12 days\n• AI platforms take 2-3 weeks\nNeed accelerated delivery? Reach out directly on WhatsApp!";
        } else if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("yo")) {
            fallbackReply = "Hey there! I'm Raj's AI Alter Ego. Feel free to ask me about his project packages, secret pricing key, SIH hackathon win, or underlying tech stack. What are you looking to engineer today?";
        } else {
            fallbackReply = "That's an interesting angle! While I'm actively calibrating my live brain modules, let me share this: Raj specializes in high-performance web platforms tailored to your exact feature scope. Direct rates are padlocked for exclusivity—ping Raj directly on WhatsApp (+91 7305493515) to retrieve the Access Key or discuss bespoke requirements! 🚀";
        }

        return NextResponse.json({
            reply: fallbackReply,
            sessionId: activeSessionId,
            source: "local_simulation"
        });

    } catch (error: any) {
        console.error("Chat Serverless Route Error:", error);
        return NextResponse.json(
            { 
                reply: "My core neural processors are temporarily reloading context strings. Reach out directly to Raj via WhatsApp at +91 7305493515! ⚡",
                error: String(error)
            },
            { status: 500 }
        );
    }
}
