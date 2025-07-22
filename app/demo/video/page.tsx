"use client"

import Header from "@/components/ui/header";
import { VideoChat } from "@/components/ui/video-chat";

export default function VideoDemo() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
                <div className="h-full max-w-4xl mx-auto flex flex-col">
                    <VideoChat isOpen={true} />
                </div>
            </main>
        </div>
    );
} 