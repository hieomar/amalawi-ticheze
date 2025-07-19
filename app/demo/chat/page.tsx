"use client"

import Header from "@/components/ui/header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Video, Mic } from "lucide-react";
import { VoiceChat } from "@/components/ui/voice-chat";
import { VideoChat } from "@/components/ui/video-chat";
import { useState } from "react";

export default function DemoChat() {
    const [isVoiceOpen, setIsVoiceOpen] = useState(false)
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
                {/* Chat Container */}
                <div className="h-full max-w-4xl mx-auto flex flex-col">

                    {/* Communication Options */}
                    <div className="mb-6 flex gap-4 justify-center">
                        <button className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            <span className="text-sm font-medium">Message</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                            <Mic className="w-6 h-6 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Voice</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                            <Video className="w-6 h-6 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Video</span>
                        </button>
                    </div>

                    {/* XP Progress */}
                    <div className="mb-6 bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Level Progress</span>
                            <span className="text-xs text-muted-foreground">0 / 100 XP</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300"></div>
                        </div>
                    </div>

                    <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-lg font-semibold text-foreground">Demo Chat</h1>
                                    <p className="text-sm text-muted-foreground">Test the chat features</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsVoiceOpen(true)}
                                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                                    >
                                        <Mic className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <button
                                        onClick={() => setIsVideoOpen(true)}
                                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                                    >
                                        <Video className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <Avatar>
                                    <AvatarFallback>V</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                                    <p className="text-sm text-foreground">Welcome to the demo chat! Try sending a message to earn XP.</p>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-muted px-3 py-2 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm transition-colors">
                                    Send
                                </button>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                🏆 Earn +10 XP for each message sent
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <VoiceChat isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
            <VideoChat isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </div>
    );
}
