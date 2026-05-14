import { NextResponse } from "next/server";

const ADK_SERVER_URL = process.env.ADK_SERVER_URL || "http://127.0.0.1:8000";
const APP_NAME = "portfolio_agent";
const USER_ID = "portfolio_user";

export async function POST(req: Request) {
    try {
        const { message, sessionId } = await req.json();
        let activeSessionId = sessionId || `sess_${Date.now()}`;

        // ── Step 1: Ensure session exists ────────────────────────────────────
        try {
            const sessionCheckRes = await fetch(
                `${ADK_SERVER_URL}/apps/${APP_NAME}/users/${USER_ID}/sessions/${activeSessionId}`,
                { signal: AbortSignal.timeout(5000) }
            );

            // If session doesn't exist, create one
            if (!sessionCheckRes.ok) {
                const createRes = await fetch(
                    `${ADK_SERVER_URL}/apps/${APP_NAME}/users/${USER_ID}/sessions`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                        signal: AbortSignal.timeout(5000),
                    }
                );
                if (createRes.ok) {
                    const sessionData = await createRes.json();
                    activeSessionId = sessionData.id;
                }
            }
        } catch {
            // Session check failed — will try /run anyway
        }

        // ── Step 2: Run the agent ─────────────────────────────────────────────
        const runRes = await fetch(`${ADK_SERVER_URL}/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                appName: APP_NAME,
                userId: USER_ID,
                sessionId: activeSessionId,
                newMessage: { parts: [{ text: message }] },
            }),
            signal: AbortSignal.timeout(30000),
        });

        // ── Step 3: Handle rate limits ────────────────────────────────────────
        if (runRes.status === 429) {
            return NextResponse.json(
                { error: "rate_limit", sessionId: activeSessionId },
                { status: 429 }
            );
        }

        if (!runRes.ok) {
            return NextResponse.json(
                { error: "unavailable", sessionId: activeSessionId },
                { status: runRes.status }
            );
        }

        // ── Step 4: Extract reply ─────────────────────────────────────────────
        const data = await runRes.json();

        if (Array.isArray(data) && data.length > 0) {
            // Walk events in reverse to find last agent text reply
            for (let i = data.length - 1; i >= 0; i--) {
                const event = data[i];
                const parts = event?.content?.parts;
                if (parts && parts.length > 0 && parts[0].text) {
                    return NextResponse.json({
                        reply: parts[0].text,
                        sessionId: activeSessionId,
                    });
                }
            }
        }

        // Empty response from ADK
        return NextResponse.json(
            { error: "empty_response", sessionId: activeSessionId },
            { status: 502 }
        );

    } catch (err: any) {
        const isTimeout = err?.name === "TimeoutError" || err?.name === "AbortError";
        return NextResponse.json(
            { error: isTimeout ? "timeout" : "unavailable" },
            { status: 503 }
        );
    }
}
