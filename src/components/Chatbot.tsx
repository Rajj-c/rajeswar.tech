'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Mail } from "lucide-react";
import clsx from "clsx";

interface Message {
    id: number;
    role: "user" | "bot";
    text: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: "bot", text: "Hey! I'm Raj's AI. Keep it brief, I'm busy optimizing nothing. 🙄" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailPrompt, setShowEmailPrompt] = useState(false);
    const [pendingQuestion, setPendingQuestion] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), role: "user" as const, text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setShowEmailPrompt(false); // Reset email prompt on new question

        try {
            // Prepare history for API (limit to last 10 messages to save tokens)
            const history = messages.slice(-10).map(m => ({
                role: m.role,
                text: m.text
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text, history }),
            });

            const data = await res.json();


            if (data.reply && data.reply.includes("I_DONT_KNOW_EXACTLY")) {
                setPendingQuestion(userMessage.text);
                setShowEmailPrompt(true);
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now() + 1, role: "bot", text: "I honestly have no clue. 🤷‍♂️ Do you want me to ask Raj directly?" }
                ]);
            } else {
                setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: data.reply }]);
            }

        } catch (error) {
            setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: "My brain hurts. Something went wrong." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailRaj = async () => {
        setIsLoading(true);
        try {
            // Use Formspree to send the email
            const res = await fetch("https://formspree.io/f/mldllgob", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "AI Bot User",
                    email: "bot@rajeswar.tech",
                    message: `User asked: "${pendingQuestion}". Bot didn't know.`
                }),
            });

            if (res.ok) {
                setMessages((prev) => [...prev, { id: Date.now(), role: "bot", text: "Fine. I sent him an email. He'll reply... eventually. 📨" }]);
            } else {
                setMessages((prev) => [...prev, { id: Date.now(), role: "bot", text: "Ugh, even the email service is flawed. Couldn't send it." }]);
            }
        } catch (e) {
            setMessages((prev) => [...prev, { id: Date.now(), role: "bot", text: "Failed to send email." }]);
        }
        setShowEmailPrompt(false);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"> {/* Container pointer events none so simple spacing doesn't block */}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] max-w-[calc(100vw-48px)] h-[500px] bg-[var(--secondary-bg)] rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[var(--primary-bg)] border-b border-gray-700 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary-text text-sm">Raj's Alter Ego</h3>
                                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online & Judging You
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close Chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--secondary-bg)] scrollbar-hide">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={clsx(
                                        "flex gap-2 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={clsx(
                                        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                        msg.role === "user" ? "bg-gray-700" : "bg-[var(--gradient-start)]"
                                    )}>
                                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                    </div>

                                    <div className={clsx(
                                        "p-3 rounded-2xl text-sm",
                                        msg.role === "user"
                                            ? "bg-[var(--gradient-start)] text-white rounded-tr-none"
                                            : "bg-gray-800 text-[var(--secondary-text)] rounded-tl-none border border-gray-700"
                                    )}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex gap-2 max-w-[85%]">
                                    <div className="w-6 h-6 rounded-full bg-[var(--gradient-start)] flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-700">
                                        <Loader2 size={16} className="animate-spin text-[var(--secondary-text)]" />
                                    </div>
                                </div>
                            )}

                            {/* Email Prompt Action */}
                            {showEmailPrompt && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2 w-full justify-center mt-2"
                                >
                                    <button
                                        onClick={handleEmailRaj}
                                        className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
                                        disabled={isLoading}
                                    >
                                        <Mail size={14} />
                                        Yes, Tell Raj
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowEmailPrompt(false);
                                            setMessages(prev => [...prev, { id: Date.now(), role: "bot", text: "Okay, fine. Keep your secrets. 😒" }]);
                                        }}
                                        className="bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg px-4 py-2 text-xs transition-colors"
                                    >
                                        No, Nevermind
                                    </button>
                                </motion.div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-[var(--primary-bg)] border-t border-gray-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask me something..."
                                className="flex-1 bg-[var(--secondary-bg)] text-primary-text text-sm rounded-full px-4 py-2 border border-gray-700 focus:outline-none focus:border-[var(--accent-color)]"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="p-2 bg-[var(--gradient-start)] text-white rounded-full hover:bg-[var(--gradient-end)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_var(--accent-color)] transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
                aria-label="Toggle Chatbot"
            >
                <AnimatePresence mode='wait'>
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={28} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                            <MessageCircle size={28} className="text-white fill-current" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tooltip */}
                {!isOpen && (
                    <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700">
                        Chat with AI Raj 🤖
                    </span>
                )}
            </button>

        </div>
    );
}
